import React, { useState } from "react";
import "../styles/Card.css";
import axios from "axios";
import { HOST } from "../constants";
import { useNavigate } from "react-router-dom";

const AddNewPost = () => {
  const navigate = useNavigate();

  const DEFAULT_STATE = {
    heading: "",
    body: "",
  };

  const [currPost, setCurrPost] = useState(DEFAULT_STATE);


  //Doing it here because it is almost isolated function:
  const addNewPost = (e) => {
    e.preventDefault();
    const ENDPOINT = `/api/v1/posts`
    const ADD_NEW_POST_ENDPOINT = `${HOST}${ENDPOINT}`
    
    axios.post(ADD_NEW_POST_ENDPOINT, currPost, {
      withCredentials: true,
      credentials: "include",
    }).then((post) => {
      setCurrPost(DEFAULT_STATE);
      navigate("/");
    }).catch((err) => {
      console.log(err);
    })

  };

  const handleChange = (e) => {
    setCurrPost({
      ...currPost,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="row justify-content-center">
      <div className="card card-shadow" style={{ maxWidth: "36rem" }}>
        <div className="card-header">Add a complaint:</div>
        <div className="card-body">
          <h6 className="card-title">Please specify the details:</h6>

          <form className="my-2">
            <div className="form-group my-3">
              <h6 className="mx-1">
                <label htmlFor="headingInput">Heading:</label>
              </h6>
              <input
                type="text"
                className="form-control"
                id="headingInput"
                aria-describedby="headingHelp"
                placeholder="Enter title"
                value={currPost.heading}
                name="heading"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <h6 className="mx-1">
                <label htmlFor="descriptionInput" className="form-label">
                  Description:
                </label>
              </h6>
              <textarea
                className="form-control"
                id="descriptionInput"
                rows="4"
                value={currPost.body}
                name="body"
                onChange={handleChange}
              ></textarea>
            </div>
            <button className="btn btn-success my-2" onClick={addNewPost}>
              Add now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewPost;
