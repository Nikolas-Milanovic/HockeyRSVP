import logo from "./logo.svg";
import "./App.css";
import Home from "./Home.js";
import Admin from "./Admin.js";
import Invite from "./Invite.js";
import {render} from "react-dom";
import background from "./img/iceland.jpeg";
import React, {useEffect, createContext, useState, useMemo} from "react";
import {PlayersContext} from "./PlayersContext.js";
import HockeyAPI from "./apis/HockeyAPI.js";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {

  var fetch = require('node-fetch');
  var fetchAbsolute = require('fetch-absolute');
  global.fetchApi = fetchAbsolute(fetch)('http://localhost:8080');

  const getPlayers = async () => {
    try{
        const response = await fetch("/api/players");
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
    <div id="backgroundStyle" /*style={ { backgroundImage: `url(${background})`} } */>
      
    <BrowserRouter>
      <Routes>
      
          <Route path="/" element={<Home/>} />
          <Route path="/admin" element={<PlayersContext.Provider value={providerValue}> <Admin/> </PlayersContext.Provider>} />
          <Route path="/invite" element= {  <PlayersContext.Provider value={providerValue}> <Invite/> </PlayersContext.Provider> } />
          
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
