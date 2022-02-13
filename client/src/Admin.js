import { useState } from "react";
import ListEmails from "./components/ListEmails.js";
import SendEmail from "./components/SendEmails.js";

const Admin = () => {
  const [email, setEmail] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const status = "Pending Response";
      //onst status = "Attending";
      const default_status = { status };
      const body = { email, status };

      const response = await fetch("http://localhost:5000/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(JSON.stringify(default_status));
      console.log(JSON.stringify(body));
      //fetch call
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="row d-flex justify-content-center flex-nowrap">
      <div className="w-50">
        <h1 className="text-center mt-5">Admin page</h1>

        <form className="d-flex mt-5" onSubmit={onSubmitForm}>
          <input
            type="text"
            value={email}
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <button className="btn btn-success">Add</button>
        </form>

        <ListEmails />
        <SendEmail />
      </div>
    </div>
  );
};

export default Admin;
