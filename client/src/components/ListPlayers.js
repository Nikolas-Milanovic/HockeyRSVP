const ListPlayers = () => {

    //test
    const players = [
        {
            id:1,
            player: "player1",
            status: "Yes"
        },
        {
            id:2,
            player: "player2",
            status: "Yes"
        }
    ]


    return(
        <table class="table mt-5 text-center">
            <thead>
                <tr>
                <th>Player</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {players.map(players => (
                 <tr key={players.id}>
                    <td>{players.player}</td>
                    <td>{players.status}</td>
                </tr>
                ))}
                 
            </tbody>
        </table>
    )
};

export default ListPlayers;