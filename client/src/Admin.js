import { useState } from "react";

const Admin = () => {

    const [email, setEmail] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();

        try{
            const body={email};
            console.log(email);
            //fetch call
          
        }catch (err){
            console.log(err.message);
        }
    }


    return(
        <>
        <h1 className="text-center mt-5">Admin page</h1>
        <div className="d-flex justify-content-center">
        <form className="d-flex mt-5" onSubmit={onSubmitForm}> 
            <input type="text"
            value={email}
            className="form-control"
            onChange={e=>setEmail(e.target.value)}></input>
            <button className="btn btn-success">Add</button>
        </form>
        </div>
        </>


    )
}

export default Admin;
