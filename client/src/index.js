import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";
import LoginState from "./context/login/LoginState";
import PostState from "./context/post/PostState"
import PostDetailsState from "./context/postDetails/PostDetailsState";

ReactDOM.render(
  <React.StrictMode>
    <PostState>
    <PostDetailsState>
    <LoginState>
      <App />
    </LoginState>
    </PostDetailsState>
    </PostState>
  </React.StrictMode>,
  document.getElementById("root")
);
