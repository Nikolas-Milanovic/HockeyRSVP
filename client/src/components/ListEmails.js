import { useEffect, useState } from "react";
import { PlayersContext } from "../PlayersContext.js";
import SendEmails from "./SendEmails.js";

const ListEmails = (players) => {
  //const [payment,setPayment] = useState('No');

  //const [message, setMessage] = useState('');

  const handlePaymentChange = async (paid, email) => {
    // access textarea value
    //setPayment(labelText);

   //console.log(paid);
    try {
      const body = {paid}
      const response = await fetch(
        `http://localhost:8080/players/payment/${email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteEmail = async (id) => {
      //console.log(id);
    try {
      const deleteTodo = await fetch(`http://localhost:8080/players/${id}`, {
        method: "DELETE",
      });

      window.location = `/admin`;
    } catch (err) {
      console.error(err.message);
    }
  };

  const changePosition = async (email, position) => {
    console.log("positin change")
    position = (position === "Player 🏒")? "Goalie 🥅 " : "Player 🏒"
    try {
      const body = {position}
      const response = await fetch(
        `http://localhost:8080/players/position/${email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
      window.location = `/admin`;
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
        {players.props.map((player) => (
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
