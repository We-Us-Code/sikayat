import { useState, useContext } from "react";
import LoginContext from "./loginContext";
import { HOST } from "./../../constants";
import axios from "axios";
import alertContext from "../alert/alertContext";

const LoginState = (props) => {
  const contextAlert = useContext(alertContext);
  const { showAlert } = contextAlert;

  const [isLoggedIn, setIsLoggedIn] = useState("unknown");
  //The value of isLogged In: 'unknown, loggedin, loggedout'

  //Log the user out:
  const logOut = async() => {
    const ENDPOINT = `/api/v1/users/logout`;
    const GET_LOGOUT_ENDPOINT = `${HOST}${ENDPOINT}`;
    try {
      const response = await axios.get(GET_LOGOUT_ENDPOINT, {
        withCredentials: true,
        credentials: "include",
      });
      if(response.status===200){
        setIsLoggedIn("loggedout");
        showAlert("success", "Logout successfull");
      }else{
        showAlert("danger", "Logout Failure");
      }
    } catch (error) {
      showAlert("danger", "Logout Failure");
      console.error(error);
    }
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, logOut }}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginState;
