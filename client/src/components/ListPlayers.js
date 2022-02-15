import { useEffect, useState } from "react";
import Attendance from "./Attendance";

const ListPlayers = () => {

    const [players,setPlayers] = useState([]);
    //const [attendance,setAttendance] = useState([0,0,0,0]); //[Attending,Tentative,Not Attending, Pending Response]

    //var createAttendance=[1,0,0,0];
    //var players=[];

    const getPlayers = async () => {
        try{
            const response = await fetch("http://localhost:5000/players");
            const jsonData = await response.json();

            setPlayers(jsonData);
            console.log(jsonData);
        }
        catch (err) {
            console.log(err.message);
        }
    }

    // const getAttendance = () =>{
    //     var createAttendance=[0,0,0,0]; //[Attending,Tentative,Not Attending, Pending Response]
    //     console.log(players.length);
    //     for(var i=0; i<players.length; i++){
    //         if(players[i].status==="Attending"){
    //             createAttendance[0]++;
    //         }
    //         else if(players[i].status==="Tentative"){
    //             createAttendance[1]++;
    //         }
    //         else if(players[i].status==="Not Attending"){
    //             createAttendance[2]++;
    //         }
    //         else{
    //             createAttendance[3]++;
    //         }
    //     }
    //     console.log(createAttendance);
    //     setAttendance(createAttendance);
    // }


    useEffect(()=>{
        getPlayers();
    }, []);

    useEffect(()=>{

    }, [players]);

    
    // useEffect(() =>{
    //     getAttendance();
    // }, [players]);

    // useEffect(() =>{
        
    // }, [attendance]);

    //getAttendance();
    

    return(
        <div className="">
        {/* <h5 className="text-center mt-4 mb-3">Attending: {attendance[0]} | Tentative: {attendance[1]} | Not Attending: {attendance[2]} | Pending Response: {attendance[3]} </h5> */}
        <Attendance props={players}/>
        <table className="table table-striped text-center">
            <thead>
                <tr>
                <th>Player</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {players.map(player => (
                 <tr key={player.player_id}
                    className={`table-${player.status === "Attending" ? "success" : `${player.status === "Not Attending"? "danger":"secondary"}`}`}>
                    <td>{player.email}</td>
                    <td>{player.status}</td>
                </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
};

export default ListPlayers;