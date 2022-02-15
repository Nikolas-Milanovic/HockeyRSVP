import { useEffect, useState } from "react";
import SendEmails from "./SendEmails.js";

const ListEmails = (players) => {

  const deleteEmail = async (id) => {
      console.log(id);
    try {
      const deleteTodo = await fetch(`http://localhost:5000/players/${id}`, {
        method: "DELETE",
      });

      window.location = `/admin`;
    } catch (err) {
      console.error(err.message);
    }
  };


  return (
    <>
    <table className="table mt-5 text-center">
      <thead>
        <tr>
          <th>Player</th>
          <th>Status</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {players.props.map((player) => (
          <tr key={player.player_id} className={`table-${player.status === "Attending" ? "success" : `${player.status === "Not Attending"? "danger":"secondary"}`}`}>
            <td>{player.email}</td>
            <td>{player.status}</td>
            <td>
              <button
                className="btn btn-danger"
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
