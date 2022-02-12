import logo from "./logo.svg";
import "./App.css";
import Home from "./Home.js";
import Admin from "./Admin.js";
import {render} from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
