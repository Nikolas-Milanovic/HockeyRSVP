import ListPlayers from "./components/ListPlayers.js";

const Admin = () => {
    return(
        <div className="row d-flex justify-content-center flex-nowrap">
            <div className="text-center playerlistcontainer">
                <h1>Home Page</h1>
                <ListPlayers />
            </div>
        </div>
    )
}
export default Admin;
