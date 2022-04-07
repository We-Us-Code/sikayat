import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";
import LoginState from "./context/login/LoginState";
import PostState from "./context/post/PostState"

ReactDOM.render(
  <React.StrictMode>
    <PostState>
    <LoginState>
      <App />
    </LoginState>
    </PostState>
  </React.StrictMode>,
  document.getElementById("root")
);
