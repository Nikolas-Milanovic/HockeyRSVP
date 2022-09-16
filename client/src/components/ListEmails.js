import { useEffect, useState, useContext } from "react";
import { PlayersContext } from "../PlayersContext.js";
import SendEmails from "./SendEmails.js";

const ListEmails = () => {

  const {players, setPlayers} = useContext(PlayersContext);
  const baseURL = 
    process.env.NODE_ENV ==='production'
    ? "https://mississaugaoldtimers.com/api/players"  
    : "http://localhost:8080/api/players";

  const updatePlayersPaid = (paid,email) => {
    setPlayers(players => {
      let data = [...players];
      let indexOfCurrentPlayer = data.findIndex(player => player.email === email);

      data[indexOfCurrentPlayer] = {
        ...data[indexOfCurrentPlayer], 
        paid: paid
      };
      return data;
    });
  };

  const handlePaymentChange = async (paid, email) => {
    try {
      const body = {paid}
      const response = await fetch(
        baseURL+`/payment/${email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
      updatePlayersPaid(paid,email);
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateDeletePlayer = (id) => {
    setPlayers(players =>
      players.filter(player => {
        return player.player_id !== id;
      }),
    );
  };

  const deleteEmail = async (id) => {
      //console.log(id);
    try {
      const deleteTodo = await fetch(baseURL+`/${id}`, {
        method: "DELETE",
      });

      updateDeletePlayer(id);
    } catch (err) {
      console.error(err.message);
    }
  };

  const updatePlayersPosition = (email, position) => {
    console.log("players before",players);
    setPlayers(players => {
      let data = [...players];
      let indexOfCurrentPlayer = data.findIndex(player => player.email === email);

      data[indexOfCurrentPlayer] = {
        ...data[indexOfCurrentPlayer], 
        position: position
      };
      console.log("this special",data);
      return data;
    });
  };

  const changePosition = async (email, position) => {
    console.log("positin change")
    console.log("current positon",position);
    position = (position === "Goalie 🥅")? "Player 🏒": "Goalie 🥅"
    console.log("current positon",position);
    try {
      const body = {position}
      console.log(body);
      const response = await fetch(
        baseURL+`/position/${email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
      updatePlayersPosition(email,position);
    } catch (err) {
      console.error(err.message);
    }
    
};

  const yes = "Y";
  const no = "N";

  return (
    <>
    <table className="table mt-5 text-center">
      <thead>
        <tr>
          <th>Position</th>
          <th>Player</th>
          <th>Status</th>
          <th>Paid</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => (
          <tr key={player.player_id} className={`table-${player.status === "Attending" ? "success" : `${player.status === "Not Attending"? "danger":"secondary"}`}`}>
        
            <td>
              <button
                className="btn btn-outline-info active"
                onClick={() => changePosition(player.email,player.position)}
              >
                {player.position}
              </button>
            </td>


            <td className="playerContainer">{player.email}
              { (player.guests>0)  && <span className="badge badge-info"> + {player.guests} Guests
              </span>}
            </td>
            {/* <td>{player.guests > 0 ? player.guests : ""}</td> */}
            <td>{player.status}</td>
            <td>
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label onClick={() => handlePaymentChange(yes,player.email)}className={`btn btn-outline-success ${player.paid === "Y" ? "active" : ""}`}>
                  <input type="radio" name="options" id="option1"/> {yes}
                </label>
                <label onClick={() => handlePaymentChange(no,player.email)} className={`btn btn-outline-danger ${player.paid === "N" ? "active" : ""}`}>
                  <input type="radio" name="options" id="option2"/> {no}
                </label>
              </div>
            </td>

            

            <td>
              <button
                className="btn btn-outline-info"
                onClick={() => deleteEmail(player.player_id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <SendEmails props={players}/>
    </>
  );
};

export default ListEmails;
