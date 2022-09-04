import { useEffect, useState, useContext } from "react";
import {PlayersContext} from "../PlayersContext.js";
import History from "./History";


const Attendance = () => {
    const [attendance,setAttendance] = useState([0,0,0,0]);
    var createAttendance=[0,0,0,0];
    const {players, setPlayers} = useContext(PlayersContext); 

    const getAttendance = () =>{
        for(var i=0; i<players.length; i++){
            if(players[i].status==="Attending"){
                createAttendance[0]++;
            }
            else if(players[i].status==="Tentative"){
                createAttendance[1]++;
            }
            else if(players[i].status==="Not Attending"){
                createAttendance[2]++;
            }
            else{
                createAttendance[3]++;
            }
            console.log("i: ", i ,players[i].guests);
            createAttendance[0]+= parseInt(players[i].guests);
        }
    }

    useEffect(()=>{
        if(players!=null){
            getAttendance();
            setAttendance(createAttendance);
        }
    }, [players]);



    return(
        <div className="attendanceStyling">
            <History/>
        <h5 className="text-center mb-0">
            Attending: {attendance[0]} | Tentative: {attendance[1]} | Not Attending: {attendance[2]} | Pending Response: {attendance[3]} 
        </h5>
        </div>
    )
};

export default Attendance;