import React from "react";
import "../styles/postItem.css"
import "../styles/Card.css"
import timeDifferenceForDate from "../utils/timeDifferenceForDate";

const PostItem = (props) => {

  const handleUpvote = (e) => {
    e.preventDefault();
    console.log('upvote');
  };

  return (
    <div className="col">
      <div className="card h-100 card-1">
        <div className="card-header ">
          <div className="row">
            <div className="col-1">
              <img src={props.post.user.photo} alt="UserLogo" className="circle_img" />
            </div>
            <div className="col-10 mx-3">
              <h6 className="d-inline">{props.post.user.name}</h6>
              <br />
              <small>{(new Date(props.post.createdAt)).toLocaleString("ear-MA", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</small>
            </div>
          </div>
        </div>
        <img
          src="https://raw.githubusercontent.com/harshsingh-24/cmp/main/client/public/logohome.webp?token=GHSAT0AAAAAABSOMNX7TZXTDBFTCGW6HSL4YSQPTPQ"
          className="card-img-top"
          alt="postLogo"
          style={{ maxHeight: "350px" }}
        />
        <div className="card-body">
          <i className="bi bi-caret-up-fill" style={{ color: "green" }} onClick={handleUpvote}></i> {props.post.upvoteCount}
          <i className="bi bi-caret-down-fill" style={{ color: "grey", marginLeft: "10px" }}></i> {props.post.downvoteCount}
          <h5 className="card-title my-2">{props.post.heading}</h5>
          <div className="card-text">{props.post.body}</div>
          {
            props.post.tags.map((tag, index) => {
              return <span key={`${props.post._id}${index}`} className="badge bg-secondary mx-1 my-2">{tag}</span>
            })
          }
          <p className="card-text ">
            <small className="text-muted">
              {timeDifferenceForDate(props.post.createdAt)}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
