import { useEffect, useState, useContext } from "react";
import Attendance from "./Attendance";
import {PlayersContext} from "../PlayersContext.js";

const ListPlayers = (guests) => {

    const {players, setPlayers} = useContext(PlayersContext);  

    return(
        <div className="">
        <Attendance/>
        <table className="table table-striped text-center playerTable" style={{boderRadius:10}}>
            <thead>
                <tr>
                <th></th>
                <th>Player</th>
                <th className="spacingContainer"></th>
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
                        </span>} <div>&nbsp;</div>
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