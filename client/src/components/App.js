import "../styles/App.css";
import React from "react";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Home";

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <h2>This is the root component</h2>
        <Routes>
          <Route path="/" element={<Home/>}/>
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
