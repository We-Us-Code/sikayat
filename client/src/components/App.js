import "../styles/App.css";
import React, {useContext } from "react";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Post from "./Post";
import Login from "./Login";
import BottomBar from "./BottomBar";
import AboutUs from "./AboutUs";
import PostDetails from "./PostDetails";
import loginContext from "./../context/login/loginContext";
import Spinner from "./Spinner";

const App = () => {
  const contextLogin = useContext(loginContext);
  const { isLoggedIn } = contextLogin;

  return (
    <Router>
      <div>
        <NavBar />
        <div style={{ minHeight: "80vh" }}>
          <Routes>
            <Route
              path="/"
              element={isLoggedIn === "loggedin" ? <Post /> : (isLoggedIn==='loggedout'? <Login/> : <Spinner/>)}
            />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/postdetails" element={<PostDetails />} />
          </Routes>
        </div>
        <BottomBar />
      </div>
    </Router>
  );
};

export default App;
