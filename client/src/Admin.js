import { useState, useEffect, useContext } from "react";
import ListEmails from "./components/ListEmails.js";
import Attendance from "./components/Attendance";
import {PlayersContext} from "./PlayersContext.js";

const Admin = () => {
  const [email, setEmail] = useState("");
  const {players, setPlayers} = useContext(PlayersContext); 
  const [enteredPassword,setEnteredPassword] = useState("");
  const [authentication,setAuthentication]=useState(false);
  const [player_idCounter,setPlayer_idCounter]=useState(1000);

  //NODE_ENV 'developemnt' --> same URL 
  //NODE_ENV 'production' ---> /api/players


  const baseURL = 
    process.env.NODE_ENV ==='production'
    ? "https://mississaugaoldtimers.com/api/players"  
    : "http://localhost:8080/api/players";

  console.log("NODE_ENV",process.env.NODE_ENV);


  const updatePlayersList = () => {
    const newPlayer = {
    "player_id": player_idCounter,
    "email": email,
    "status":"Pending Response",
    "guests":"0",
    "paid":"N",
    "position":"Player 🏒"};
    setPlayers([...players,newPlayer]);
    setPlayer_idCounter(player_idCounter => player_idCounter+1);
  };

  const getAuthentication = async () => {
    try {
      const body = { enteredPassword };
      console.log(body);
        const response = await fetch(baseURL+`/authenticate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const jsonData = await response.json();
      return (jsonData==="Valid Credentials");

    } catch (err) {
      console.log(err.message);
    }
  }

  const getPlayers = async () => {
    try {
      const response = await fetch(baseURL);
      const jsonData = await response.json();

      //console.log(jsonData);
      setPlayers(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    const userPermission = await getAuthentication();
    if(userPermission){
      setAuthentication(true);
    }
  }

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

      const response = await fetch(baseURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

    //window.location = "/admin";
      updatePlayersList();
      setEmail("");
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
          {authentication && <><form className="d-flex mt-5" onSubmit={onSubmitForm}>
            <input
              type="text"
              value={email}
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <button className="btn btn-success ml-5 w-25">Add Player (email)</button>
          </form>
          <Attendance/>
          <ListEmails/></>}
          {!authentication && 
          <>
          <form className="d-flex" onSubmit={onSubmitLogin}>
            <input
              type="text"
              value={enteredPassword}
              className="form-control"
              onChange={(e) => setEnteredPassword(e.target.value)}
              placeholder="Enter Password"
            ></input>
            <button className="btn btn-success ml-5 w-25">Login</button>
          </form>
          </>
          }
        </div>
      </div>
    </div>
  );
};

export default Admin;
