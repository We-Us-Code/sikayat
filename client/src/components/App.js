import "../styles/App.css";
import React, {useState} from "react";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Post from "./Post";
import Login from "./Login"
import BottomBar from "./BottomBar";
import AboutUs from "./AboutUs";

const App = () => {

  const [loggedIn, setloggedIn] = useState(false);

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>

          <Route path="/" element={loggedIn ? <Post/>: <Login />} />
          <Route path="/aboutus" element = {<AboutUs />} />
        </Routes>
        <BottomBar />
      </div>
    </Router>
  );
};

export default App;
