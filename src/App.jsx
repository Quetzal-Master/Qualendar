import './App.css';
import React from "react";
import Index from "./routes/index";
import Calendrier from "./routes/Calendrier";
import Cuisine from "./routes/cuisine";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import styles from "./styles/Global.css";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/Cuisine" element={<Cuisine />}/>
          <Route path="/Calendrier" element={<Calendrier />}/>
          <Route path="/" element={<Index />}/>
        </Routes>
    </Router>
  );
}

export default App;
