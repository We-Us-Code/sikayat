import React, {useContext} from "react";
import "../styles/postItem.css"
import "../styles/Card.css"
import timeDifferenceForDate from "../utils/timeDifferenceForDate";
import postContext from "../context/post/postContext";

const PostItem = (props) => {

  const contextPost = useContext(postContext);
  const { deletePost } = contextPost;

  const handleUpvote = (e) => {
    e.preventDefault();
    console.log('upvote');
  };

  const handleDeletePost = (e) => {
    e.preventDefault();
    deletePost(props.post._id);
  }

  return (
    <div className="col">
      <div className="card h-100 card-1">
        <div className="card-header ">
          <div className="row">
            <div className="col-2">
              <img src={props.post.user.photo} alt="UserLogo" className="circle_img" referrerPolicy="no-referrer" />
            </div>
            <div className="col-10">
              <h6 className="d-inline">{props.post.user.name}</h6>
              <br />
              <small>{(new Date(props.post.createdAt)).toLocaleString("ear-MA", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</small>
            </div>
          </div>
        </div>
        <img
          src="./logohome.webp"
          className="card-img-top"
          alt="postLogo"
          style={{ maxHeight: "350px" }}
        />
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div>
              <i className="bi bi-caret-up-fill" style={{ color: "green" }} onClick={handleUpvote}></i> {props.post.upvoteCount}
              <i className="bi bi-caret-down-fill" style={{ color: "grey", marginLeft: "10px" }}></i> {props.post.downvoteCount}
            </div>
            {localStorage.getItem("loggedInUserId") === props.post.user._id &&
              <i className="bi bi-trash" style={{ color: "#a30505" }} onClick={handleDeletePost}></i>}
          </div>
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
