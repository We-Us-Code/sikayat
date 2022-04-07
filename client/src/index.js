import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";
import LoginState from "./context/login/LoginState";

ReactDOM.render(
  <React.StrictMode>
    <LoginState>
      <App />
    </LoginState>
  </React.StrictMode>,
  document.getElementById("root")
);
