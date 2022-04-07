import React from "react";
import "../styles/postItem.css"
import "../styles/Card.css"
import timeDifferenceForDate from "../utils/timeDifferenceForDate";

const PostItem = (props) => {
  return (
    <div className="col">
      <div className="card h-100 card-1">
        <img
          src="./logohome.webp"
          className="card-img-top"
          alt="postLogo"
          style={{ maxHeight: "350px" }}
        />
        <div className="card-body">
          <i className="bi bi-caret-up-fill" style={{color:"green"}}></i> {props.post.upvoteCount}
          <i className="bi bi-caret-down-fill" style={{color:"grey", marginLeft:"10px"}}></i> {props.post.downvoteCount}
          <h5 className="card-title my-2">{props.post.heading}</h5>
          <div className="card-text">{props.post.body}</div>
          {
            props.post.tags.map((tag, index)=>{
              return <span key={`${props.post._id}${index}`} className="badge bg-secondary mx-1 my-2">{tag}</span>
            })
          }
          <p className="card-text ">
            <small className="text-muted">
              {timeDifferenceForDate(props.post.createdAt)} by Sushant Kumar
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
