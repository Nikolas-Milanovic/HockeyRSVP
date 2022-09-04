import { useEffect, useState } from "react";
import Moment from 'moment';

const History = (displayEdit) => {
    const [displayHistory, setdisplayHistory] = useState(false);
    const [initalData,setInitialRender] = useState(false);
    const [history, setHistory] = useState(0);
    const [record,setRecored] = useState([0,0,0,0,0,0]);
    const [nextGame,setNextGame] = useState("No");
    const [white, setWhite] = useState("?");
    const [black, setBlack] = useState("?");
    //const curDate = '09-08 (10am)';
    const curDate = Moment().format('MM-DD (HHam)');
    console.log("curDate",curDate); 

    // var PrevScore = ["null","null"]; // [white score, black score]

    const [whiteWin, setWhiteWin] = useState(true);
    const [tie, setTie] = useState(false);
    
    
    
    const getHistory = async () => {
        
        var historyRes;
        //Get History Requests from API
        try {
          const response = await fetch("http://localhost:8080/api/history");
          const jsonData = await response.json();
    
          //console.log("HISTorY>>>>",jsonData);
          setHistory(jsonData);
          historyRes=jsonData;
          
        } catch (err) {
          console.log(err.message);
        }
        console.log("history",historyRes);

        //Extract game dates
        var allGameDates =[];
        for(var i=0;i<historyRes.length;i++){
            allGameDates[i]=historyRes[i].date; 
        }
        console.log("allGameDates",allGameDates);

        //Extract Next Game and Pevious Score; 
        console.log("historyRes[historyRes.length-1].date < curDate",historyRes[historyRes.length-1].date < curDate);

        if(curDate <= historyRes[0].date){
            setNextGame(historyRes[0].date);
            setWhite("No Previous Game");
            setBlack("No Previous Game");
        }
        else if( historyRes[historyRes.length-1].date < curDate){
            setNextGame('No'); // Next Game
            setWhite(historyRes[historyRes.length-1].white);
            setBlack(historyRes[historyRes.length-1].black);
        }
        else{
            for(var i=0;i<(historyRes.length-1);i++){
                if( historyRes[i].date < curDate && curDate <= historyRes[i+1].date){
                    setNextGame(historyRes[i+1].date); 
                    setWhite(historyRes[i].white);
                    setBlack(historyRes[i].black);
                    break;
                }
            }
        }

        console.log("nextGame,",nextGame);

        var whiteWins = 0;
        var whiteLoses = 0;
        var ties = 0;

        //Extract Win-Lose-Tie Record
        for(var i=0; i<historyRes.length; i++){
            if(!isNaN(historyRes[i].white) && !isNaN(historyRes[i].black)){
                whiteWins += historyRes[i].white > historyRes[i].black ? 1: 0 ;
                whiteLoses += historyRes[i].white < historyRes[i].black ? 1: 0 ;
                ties += historyRes[i].white === historyRes[i].black ? 1: 0 ;
            }
        }

        setRecored([whiteWins,whiteLoses,ties,whiteLoses,whiteWins,ties]);

    };


    useEffect(()=>{
        getHistory();
    }, []);


//TODO: add # guests to attneding count
    const editPrevGame = async (id) => {
        const white = prompt('Update WHITE Score to: ');
        const black = prompt('Update BLACK Score to: ');
        if(white ==="" || black ==="" || isNaN(white) || isNaN(black) || white <0 || black <0){
            alert("Bad Input")
            return
        }
        try {
            
            const body = {white, black}
            console.log("body",body)
            const response = await fetch(
              `http://localhost:8080/api/history/${id}`,
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
              }
              
            );
            console.log(response);
            window.location = window.location.href;
          } catch (err) {
            console.error(err.message);
          }
    }
    
    

    return(
        /* { !(nextGame===gameDates[0])  && */
        <div className="attendanceStyling">
        <div className="historyOverview">
             <h5 style={{marginRight:50}}> 
                Prev Game:  
                { !tie && whiteWin && <b> (White) {white}</b>}
                { !whiteWin && `(White) ` + white} -  
                { !tie && !whiteWin && <b> (black) {black} </b>}
                { whiteWin && black + ` (Black)`} 
            </h5>
            <button
                type="button"
                className={`btn btn-outline-info ${displayHistory === true ? "active" : ""}`}
                onClick = { (e)=>(  setdisplayHistory(!displayHistory))}
                >
                View Game Log 
            </button>
        </div>
       
        {displayHistory && <table className="table table-sm">
            <thead>
            <tr>
                <th scope="col">Record</th>
                <th scope="col">White ({record[0]}-{record[1]}-{record[2]})</th>
                <th scope="col">Black ({record[3]}-{record[4]}-{record[5]})</th>
                {displayEdit && <th>Edit</th>}
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{nextGame}</td>
                    <td>Upcoming Game</td>
                </tr>
                {[...history].reverse().map(history => (
                    <tr key={history.game_id}>
                        { (history.date < curDate) && <td>{history.date}</td> }
                        { (history.date < curDate) && <td>{history.white}</td> }
                        { (history.date < curDate) && <td>{history.black}</td> }
                        { ((history.date < curDate) && displayEdit) && <td>
                            <button
                                className="btn btn-outline-info"
                                onClick={() => editPrevGame(history.game_id)}
                            >
                                Edit
                            </button>
                        </td>}
                    </tr>
                ))}
            </tbody>
        </table> }
        </div>
    )
}

export default History;