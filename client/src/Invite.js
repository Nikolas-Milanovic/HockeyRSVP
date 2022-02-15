import { useState, useEffect, setState} from "react";
import ListPlayers from "./components/ListPlayers.js";

const Invite = () => {
  
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [skipCount, setSkipCount] = useState(0);



  const getURLParams = () => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const URLemail = queryParams.get("email");
      setEmail(URLemail);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getPlayer = async () => {
    try {
      const response = await fetch(`http://localhost:5000/players/${email}`);
      const jsonData = await response.json();
      setStatus(jsonData.status);
      return(
        jsonData.status
      )
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateStatus = async () => {
    try {
      const body = {status}
    //   console.log(status);
    //   console.log(body);
      const response = await fetch(
        `http://localhost:5000/players/${email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
      window.location = `/invite/?email=${email}`;
    } catch (err) {
      console.error(err.message);
    }
  };



  useEffect(() => {
    getURLParams();
  }, []);

  useEffect(() => {
    getPlayer();
  }, [email]);

  useEffect(() => {
    if (skipCount <= 2) setSkipCount(skipCount+1);
    if (skipCount > 2){
        updateStatus();
    };
}, [status])

  return (
    <div className="row d-flex justify-content-center flex-nowrap">
      <div className="w-50">
        <h1 className="text-center mb-5 mt-5">Invite for: <i>{email}</i></h1>
        <div className="text-center">
          <button
            type="button"
            className={`btn btn-outline-success m-1 ${status === "Attending" ? "active" : ""}`}
            onClick = {e =>(
                setStatus("Attending")
            )
            }
          >
            Attending
          </button>
          <button
            type="button"
            className={`btn btn-outline-secondary m-1 ${status === "Tentative" ? "active" : ""}`}
            onClick={e => {
                setStatus("Tentative");
            }}
          >
            Tentative
          </button>
          <button
            type="button"
            className={`btn btn-outline-danger m-1 ${status === "Not Attending" ? "active" : ""}`}
            onClick={e => {
                setStatus("Not Attending");
            }}
          >
            Not Attending
          </button>
        </div>
        <ListPlayers />
      </div>    
    </div>
  );
};

export default Invite;
