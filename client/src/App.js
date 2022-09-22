import "./App.css";
import Home from "./Home.js";
import Admin from "./Admin.js";
import Invite from "./Invite.js";
import React, {useEffect, createContext, useState, useMemo} from "react";
import {PlayersContext} from "./PlayersContext.js";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {

  const baseURL = 
    process.env.NODE_ENV ==='production'
    ? "https://mississaugaoldtimers.com/api/players"  
    : "http://localhost:8080/api/players";

  const getPlayers = async () => {
    try{
        const response = await fetch(baseURL);
        const jsonData = await response.json();
        console.log(jsonData);
        return jsonData;
    }
    catch (err) {
        console.log(err.message);
    }
  } 

  const [players, setPlayers] = useState(null);

  const providerValue = useMemo(() => ({players, setPlayers}), [players, setPlayers]);


  const playersRequest = getPlayers();
  //setPlayers(playersRequest);

  useEffect( async ()=>{
    const data = await getPlayers();
    setPlayers(data);
  },[]);

  return (
    
      
    <BrowserRouter>
      <Routes>
      
          <Route path="/" element={<PlayersContext.Provider value={providerValue}> <Home/> </PlayersContext.Provider>} />
          <Route path="/admin" element={<PlayersContext.Provider value={providerValue}> <Admin/> </PlayersContext.Provider>} />
          <Route path="/invite" element= {  <PlayersContext.Provider value={providerValue}> <Invite/> </PlayersContext.Provider> } />
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;
