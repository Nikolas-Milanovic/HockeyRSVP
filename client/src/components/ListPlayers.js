import { useEffect, useState, useContext } from "react";
import Attendance from "./Attendance";
import {PlayersContext} from "../PlayersContext.js";

const ListPlayers = (guests) => {

    //const [players,setPlayers] = useState([]);
    const {players, setPlayers} = useContext(PlayersContext); 
    //const [attendance,setAttendance] = useState([0,0,0,0]); //[Attending,Tentative,Not Attending, Pending Response]

    //var createAttendance=[1,0,0,0];
    //var players=[];

    // const getPlayers = async () => {
    //     try{
    //         const response = await fetch("http://localhost:8080/players");
    //         const jsonData = await response.json();
            
    //         setPlayers(jsonData);
    //         //console.log(jsonData);
    //     }
    //     catch (err) {
    //         console.log(err.message);
    //     }
    // }

    // useEffect(()=>{
    //     getPlayers();
    // }, []);

    // useEffect(() => {
    //     if(players!=null){
          
    //     }
    // }, [players]);

    // useEffect(()=>{
    //    //console.log("Guests Update Recieved>>>", guests)
    //     getPlayers();
    // }, [guests]);


    // useEffect(() =>{

    // },[])

    return(
        <div className="">
        <Attendance/>
        <table className="table table-striped text-center " style={{boderRadius:10}}>
            <thead>
                <tr>
                <th></th>
                <th>Player</th>
                <th></th>
                <th>Status</th>
                </tr>
            </thead>
            { (players != null) &&<tbody>
                {players.map(player => (
                 <tr key={player.player_id}
                    className={`table-${player.status === "Attending" ? "success" : `${player.status === "Not Attending"? "danger":"secondary"}`}`}>
                    <th>{player.position}</th>
                    <td className="playerContainer">{player.email}
                        { (player.guests>0)  && <span className="badge badge-info"> + {player.guests} Guests
                        </span>}
                    </td>
                    <td className="spacingContainer"></td>
                    <td>{player.status}</td>
                </tr>
                ))}
            </tbody> } 
        </table>
        </div>
    )
};

export default ListPlayers;