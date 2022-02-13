import { useEffect, useState } from "react";

const ListPlayers = () => {

    //test
    // const players = [
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
    const [players,setPlayers] = useState([]);

    const getPlayers = async () => {
        try{
            const response = await fetch("http://localhost:5000/players");
            const jsonData = await response.json();

            console.log(jsonData);
            setPlayers(jsonData);
        }
        catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getPlayers();
    }, []);


    return(
        <div className="row d-flex justify-content-center flex-nowrap">
        <table className="table table-striped mt-5 text-center w-50">
            <thead>
                <tr>
                <th>Player</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {players.map(player => (
                 <tr key={player.player_id}>
                    <td>{player.email}</td>
                    <td>{player.status}</td>
                </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
};

export default ListPlayers;