import { useEffect, useState } from "react";

const ListEmails = () => {

    //test
    // const emails = [
    //     {
    //         id:1,
    //         player: "player1",
    //         status: "Yes"
    //     },
    //     {
    //         id:2,
    //         player: "player2",
    //         status: "Yes"
    //     }
    // ]

    const [emails,setEmails] = useState([]);

    const getEmails = async () => {
        try{
            const response = await fetch("http://localhost:5000/players");
            const jsonData = await response.json();

            console.log(jsonData);
            setEmails(jsonData);
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const deleteEmail = async id => {
        try {
            console.log("called");
            const deleteTodo = await fetch(`http://localhost:5000/players/${id}`, {
                method: "DELETE"
              });
    
          setEmails(emails.filter(email => email.player_id !== id));
        } catch (err) {
          console.error(err.message);
        }
      };


    useEffect(() => {
        getEmails();
      }, []);


    return(
        <table className="table mt-5 text-center">
            <thead>
                <tr>
                <th>Player</th>
                <th>Status</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {emails.map(emails => (
                 <tr key={emails.player_id}>
                    <td>{emails.email}</td>
                    <td>{emails.status}</td>
                    <td>
                    <button
                        className="btn btn-danger"
                        onClick={() => deleteEmail(emails.player_id)}
                    >Delete</ button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    )
};

export default ListEmails;