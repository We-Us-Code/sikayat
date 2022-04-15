import React, { useContext, useState } from "react";
import "../styles/postItem.css";
import "../styles/Card.css";
import timeDifferenceForDate from "../utils/timeDifferenceForDate";
import postContext from "../context/post/postContext";
import { HOST } from "../constants";
import axios from "axios";
import alertContext from "../context/alert/alertContext";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const PostItem = (props) => {

  const contextPost = useContext(postContext);
  const { deletePost, changeStatus } = contextPost;

  const contextAlert = useContext(alertContext);
  const { showAlert } = contextAlert;

  const [upvoted, setUpvoted] = useState(
    props.post.upvoters.includes(localStorage.getItem("loggedInUserId"))
  );
  const [downvoted, setDownvoted] = useState(
    props.post.downvoters.includes(localStorage.getItem("loggedInUserId"))
  );
  const [upvoteCount, setUpvoteCount] = useState(props.post.upvoteCount);
  const [downvoteCount, setDownvoteCount] = useState(props.post.downvoteCount);
  const [disableVoting, setDisableVoting] = useState(false);
  const [status, setStatus] = useState(props.post.status);
  const [requestedChange, setRequestedChange] = useState(false);

  //State computations:
  const badgeText = () => {
    if(status===0)
      return "Fresh"
    else if(status===1)
      return "Addressed"
    else
      return "Resolved"
  }

  const badgeColor = () => {
    if(status===0)
      return "danger"
    else if(status===1)
      return "warning"
    else
      return "success"
  }

  const handleUpvote = async (e) => {
    e.preventDefault();
    if(disableVoting===true) {
      return;
    }
    setDisableVoting(true);
    const ENDPOINT = `/api/v1/posts/${props.post._id}/upvote`;
    const UPVOTE_POST_ENDPOINT = `${HOST}${ENDPOINT}`;
    try {
      const response = await axios.patch(
        UPVOTE_POST_ENDPOINT,
        {},
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      if (response.status === 201) {
        if (response.data.message === "addedUpvote") {
          setUpvoted(true);
          setUpvoteCount(upvoteCount + 1);
          if (downvoted) {
            setDownvoted(false);
            setDownvoteCount(downvoteCount - 1);
          }
        } else {
          setUpvoted(false);
          setUpvoteCount(upvoteCount - 1);
        }
      } else {
        console.log("failed to upvote post, post might be deleted?");
        showAlert("danger", "Failed to upvote, post might be deleted!");
      }
    } catch (error) {
      console.error(error);
      showAlert("danger", "Something went wrong");
    }
    setDisableVoting(false);
  };

  const handleDownvote = async (e) => {
    e.preventDefault();
    if(disableVoting===true) {
      return;
    }
    setDisableVoting(true);
    const ENDPOINT = `/api/v1/posts/${props.post._id}/downvote`;
    const DOWNVOTE_POST_ENDPOINT = `${HOST}${ENDPOINT}`;
    try {
      const response = await axios.patch(
        DOWNVOTE_POST_ENDPOINT,
        {},
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      if (response.status === 201) {
        if (response.data.message === "addedDownvote") {
          setDownvoted(true);
          setDownvoteCount(downvoteCount + 1);
          if (upvoted) {
            setUpvoted(false);
            setUpvoteCount(upvoteCount - 1);
          }
        } else {
          setDownvoted(false);
          setDownvoteCount(downvoteCount - 1);
        }
      } else {
        console.log("failed to downvote post, post might be deleted?");
        showAlert("danger", "Failed to downvote, post might be deleted!");
      }
    } catch (error) {
      console.error(error);
      showAlert("danger", "Something went wrong");
    }
    setDisableVoting(false);
  };

  const handleDeletePost = (e) => {
    e.preventDefault();
    deletePost(props.post._id);
  };

  const handleStatusChange = (e) =>{
    e.preventDefault();
    const USER_ROLE = localStorage.getItem("role");
    const USER_ID = localStorage.getItem("loggedInUserId");
    if(requestedChange===true)
      return;
    if(USER_ROLE==="user" && props.post.user._id!==USER_ID)
      return;
    if(USER_ROLE==="user" && status===2)
      return;
    if(USER_ROLE==="admin" && status!==0)
      return;
    if(USER_ROLE==="admin")
      setStatus(1); //For feedback, that status will be changed to this
    if(USER_ROLE==="user")
      setStatus(2);
    setRequestedChange(true);
    return;
  }

  const handleCancelStatusChange = (e) => {
    e.preventDefault();
    setStatus(props.post.status);
    setRequestedChange(false);
  }

  const handleSubmitStatusChange = async(e) => {
    e.preventDefault();
    
    const result = await changeStatus(props.post._id);
    if(result===false)
      setStatus(props.post.state);
    setRequestedChange(false);
  }

  return (
    <div className="col">
      <div className="card h-100 card-1">
        <div className="card-header  position-relative">
          {requestedChange && <div>
            <span className="position-absolute top-0 start-0 translate-start badge  bg-info" style={{zIndex: "1", cursor: "pointer"}} onClick={handleCancelStatusChange} >cancel</span>
            <span className="position-absolute top-0 end-0 translate-end badge  bg-info" style={{zIndex: "2", cursor: "pointer"}} onClick={handleSubmitStatusChange} >confirm</span>
            <br/>
          </div>}
        <span className={`position-absolute bottom-0 end-0 translate-end badge bg-${badgeColor()}`}  onClick={handleStatusChange} style={{cursor: "pointer"}}> {badgeText()} </span>
          <div className="row">
            <div className="col-2">
              <img
                src={props.post.user.photo}
                alt="UserLogo"
                className="circle_img"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="col-10">
              <h6 className="d-inline">{props.post.user.name}</h6>
              <br />
              <small>
                {new Date(props.post.createdAt).toLocaleString("ear-MA", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </small>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Carousel>
              {props.post.images.map((imgUrl) => (
                <div className="carousel-item active" key={imgUrl}>
                  <img
                    src={imgUrl}
                    className="card-img-top"
                    alt="postLogo"
                    style={{ maxHeight: "350px" }}
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <i
                className="bi bi-arrow-up-circle-fill"
                style={{ color: upvoted ? "green" : "grey" }}
                onClick={handleUpvote}
              ></i>{" "}
              {upvoteCount}
              <i
                className="bi bi-arrow-down-circle-fill"
                style={{
                  color: downvoted ? "red" : "grey",
                  marginLeft: "10px",
                }}
                onClick={handleDownvote}
              ></i>{" "}
              {downvoteCount}
            </div>
            {localStorage.getItem("loggedInUserId") === props.post.user._id && (
              <i
                className="bi bi-trash"
                style={{ color: "#a30505" }}
                onClick={handleDeletePost}
              ></i>
            )}
          </div>
          <h5 className="card-title my-2">{props.post.heading}</h5>
          <div className="card-text">{props.post.body}</div>
          {props.post.tags.map((tag, index) => {
            return (
              <span
                key={`${props.post._id}${index}`}
                className="badge bg-secondary mx-1 my-2"
              >
                {tag}
              </span>
            );
          })}
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
