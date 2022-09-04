import { useState, useEffect } from "react";
import ListEmails from "./components/ListEmails.js";
import Attendance from "./components/Attendance";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [players, setPlayers] = useState([]);

  const getPlayers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/players");
      const jsonData = await response.json();

      //console.log(jsonData);
      setPlayers(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if(!validation()){
        return;
    }

    try {
      const status = "Pending Response";
      //onst status = "Attending";
      const default_status = { status };
      const body = { email, status };

      const response = await fetch("http://localhost:8080/api/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      //console.log(JSON.stringify(default_status));
      //console.log(JSON.stringify(body));
      window.location = "/admin";
      //fetch call
    } catch (err) {
      console.log(err.message);
    }
  };

  const validation = () => {
      for(var i=0;i<players.length;i++){
          if(players[i].email === email){
              alert("\nINVALID ENTRY! \n \nYou entered an email that already exists")
              return(
                  false
              )
          }
      }
      return(true)
  }


  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <div classname="">
      <div className="row d-flex justify-content-center flex-nowrap">
        <div className="playerlistcontainer">
          <h1 className="text-center mt-5">Admin Page</h1>
          <form className="d-flex mt-5" onSubmit={onSubmitForm}>
            <input
              type="text"
              value={email}
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <button className="btn btn-success ml-5 w-25">Add Player (email)</button>
          </form>
          <Attendance/>
          <ListEmails props={players}/>
        </div>
      </div>
    </div>
  );
};

export default Admin;
