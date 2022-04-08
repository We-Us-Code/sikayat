import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";
import LoginState from "./context/login/LoginState";
import PostState from "./context/post/PostState"
import PostDetailsState from "./context/postDetails/PostDetailsState";
import CommentState from "./context/comment/CommentState";

ReactDOM.render(
  <React.StrictMode>
    <CommentState>
    <PostState>
    <PostDetailsState>
    <LoginState>
      <App />
    </LoginState>
    </PostDetailsState>
    </PostState>
    </CommentState>
  </React.StrictMode>,
  document.getElementById("root")
);
