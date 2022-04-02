import "../styles/App.css";
import React, {useState} from "react";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Post from "./Post";
import Login from "./Login"

const App = () => {

  const [loggedIn, setloggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>

          <Route path="/" element={loggedIn ? <Post/>: <Login />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
