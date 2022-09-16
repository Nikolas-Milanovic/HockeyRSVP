import { useState, useEffect, setState, useContext} from "react";
import ListPlayers from "./components/ListPlayers.js";
import {PlayersContext} from "./PlayersContext.js";

const Invite = () => {
  
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [skipCount, setSkipCount] = useState(0);
  const [guests,setGuests] = useState(0);
  const {players, setPlayers} = useContext(PlayersContext); 
  const queryParams = new URLSearchParams(window.location.search);
  const URLemail = queryParams.get("email");

  console.log("URLemail",URLemail);

  const baseURL = 
    process.env.NODE_ENV ==='production'
    ? "https://mississaugaoldtimers.com/api/players"  
    : "http://localhost:8080/api/players";


  const updateGuests = (value) => {
    console.log("updateGuests>>>", guests+value);
    let num =  parseInt(guests)+ parseInt(value);
    setGuests(guests => (0 <= (num) && (num) <= 4) ? (num) : 0)
  }

  const updateInviteEmail = () => {
    players.map(player => {
      if (player.email === URLemail) {
        setEmail(player.email);
        setStatus(player.status);
        setGuests(player.guests);
      }
    });
  };

  const updatePlayersStateStatus = (newStatus) => {
    setPlayers(players => {
      let data = [...players];
      let indexOfCurrentPlayer = data.findIndex(player => player.email === URLemail);

      data[indexOfCurrentPlayer] = {
        ...data[indexOfCurrentPlayer], 
        status: newStatus
      };
      return data;
    });
  };

  const updatePlayersStateGuests = () => {
    setPlayers(players => {
      let data = [...players];
      let indexOfCurrentPlayer = data.findIndex(player => player.email === URLemail);

      data[indexOfCurrentPlayer] = {
        ...data[indexOfCurrentPlayer], 
        guests: guests
      };
      return data;
    });
  };


  const updateGuestsInDatabase = async () => {
    if(guests==null){
      return
    }
    console.log("update guests to>>>",guests);
    try {
      const body = {guests}
      const response = await fetch(
        baseURL+`/guests/${email}`,
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

  const updateStatus = async () => {
    console.log("updating stauts in database to>>", status);
    try {
      const body = {status}
      const response = await fetch(
        baseURL+`/${email}`,
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

  useEffect(() => {
    if(players!=null){
      updateInviteEmail();
    }
  }, [players]);

  useEffect(() => {
    if(players!=null){
      updateStatus();
    }
  }, [status])

  useEffect(() => {
    if(players!=null){
      updatePlayersStateGuests();
      updateGuestsInDatabase();
    }
  }, [guests])


  return (
    <div className="row d-flex justify-content-center flex-nowrap">
      <div className="playerlistcontainer">
        <h1 className="text-center mb-5 mt-5">Invite for: <i>{email}</i></h1>
        <div className="text-center containerRow">
          <div className="statusOptions">
            <button
              type="button"
              className={`btn btn-outline-success m-1 ${status === "Attending" ? "active" : ""}`}
              onClick = {e =>{
                updatePlayersStateStatus("Attending")
              }
              }
            >
              Attending
            </button>
            <button
              type="button"
              className={`btn btn-outline-secondary m-1 ${status === "Tentative" ? "active" : ""}`}
              onClick={e => {
                updatePlayersStateStatus("Tentative")
              }}
            >
              Tentative
            </button>
            <button
              type="button"
              className={`btn btn-outline-danger m-1 ${status === "Not Attending" ? "active" : ""}`}
              onClick={e => {
                updatePlayersStateStatus("Not Attending");
              }}
            >
              Not Attending
            </button>
          </div>
          
          {false && <div className="vl mx-2 "></div>}
          {false && <div className="vl mr-3"></div>}
          <div className="buttonGroup">
            <button className="btn btn-outline-success plusButton "
            onClick = {e =>(
              updateGuests(1)
            )}>+</button>
            <button className="btn btn-outline-secondary rounded-0 disabled guestsButton">Guests {guests}</button>
            <button className="btn btn-outline-danger minusButton"
            onClick = {e =>(
              updateGuests(-1)
            )}>-</button>
          </div>
        </div>
        
        <ListPlayers props={guests}/>
      </div>    
    </div>
  );
};

export default Invite;
