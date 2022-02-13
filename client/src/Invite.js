import { useState, useEffect, setState} from "react";

const Invite = () => {
  
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");


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
      console.log("button click");

      const body = { status };
      console.log(body);
      const response = await fetch(
        `http://localhost:5000/players/${email}`,
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
    getURLParams();
  }, []);

  useEffect(() => {
    getPlayer();
  }, [email]);
  

  useEffect(()=>{
    updateStatus();
  }, [status]);

  return (
    <div className="row d-flex justify-content-center flex-nowrap">
      <div className="flex-column">
        <h1 className="text-center mb-5 mt-5">Invite For, {email}</h1>
        <div className="">
          <button
            type="button"
            className={`btn btn-outline-success m-1 ${status === "Attending" ? "active" : ""}`}
            onClick={e => {
                setStatus("Attending");
            }}
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
      </div>
    </div>
  );
};

export default Invite;
