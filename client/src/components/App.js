import "../styles/App.css";
import React, {useState} from "react";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Post from "./Post";
import Login from "./Login"
import BottomBar from "./BottomBar";
import AboutUs from "./AboutUs";
import PostDetails from "./PostDetails";

const App = () => {

  const [loggedIn, setloggedIn] = useState(true);

  return (
    <Router>
      <div>
        <NavBar />
        <div style={{minHeight: "80vh"}}>
          <Routes>
            <Route path="/" element={loggedIn ? <Post/>: <Login />} />
            <Route path="/aboutus" element = {<AboutUs />} />
            <Route path="/postdetails" element = {<PostDetails/>} />
          </Routes>
        </div>
        <BottomBar />
      </div>
    </Router>
  );
};

export default App;
