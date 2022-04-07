import { useState } from "react";
import LoginContext from "./loginContext";

const LoginState = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState("unknown");
  //The value of isLogged In: 'unknown, loggedin, loggedout'

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginState;
