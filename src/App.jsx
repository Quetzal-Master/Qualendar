import './App.css';
import React from "react";
import Qualendar from "./routes/Qualendar";
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
            <Route path="/" element={<Qualendar />}/>
          </Routes>
      </Router>
  );
}

export default App;
