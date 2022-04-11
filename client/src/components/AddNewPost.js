import React, { useState, useContext, useEffect } from "react";
import "../styles/Card.css";
import axios from "axios";
import { HOST } from "../constants";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/alert/alertContext";
import loadingBarContext from "../context/loadingBar/loadingBarContext";
import { storage } from "../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import imageCompression from "browser-image-compression";

const AddNewPost = () => {
  const navigate = useNavigate();

  const contextAlert = useContext(alertContext);
  const { showAlert } = contextAlert;
  const contextLoadingBar = useContext(loadingBarContext);
  const {setProgress} = contextLoadingBar;

  const DEFAULT_STATE = {
    heading: "",
    body: ""
  };

  const [currPost, setCurrPost] = useState(DEFAULT_STATE);
  const [imageDataFiles, setImageDataFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const btnDisabled =
    currPost.heading.length < 10 ||
    currPost.heading.length > 100 ||
    currPost.body.length < 10 ||
    currPost.body.length > 2000 || uploading;

  useEffect(() => {
    document.title = "Sikayat - Add New Post";
  }, [])
  

  //Image uploading relaed functions: -------------------------------------------------
  const uploadToFirebase = async (compressedImageFiles) => {
    const USER_ID = localStorage.getItem("loggedInUserId");

    const urlPromises = [];
    const imgReferences = [];

    compressedImageFiles.forEach((imageFile, index) => {
      const currentRef = `${USER_ID}/${Date.now()}${index}`;
      const imageRef = ref(storage, currentRef);
      imgReferences.push(currentRef);
      const res = uploadBytes(imageRef, imageFile, {
        contentType: "image/jpeg",
      })
        .then((snapshot) => getDownloadURL(imageRef))
        .catch((error) => {
          console.log(error);
        });
      urlPromises.push(res);
    });
    const downloadURLs = await Promise.all(urlPromises);
    return {downloadURLs, imgReferences};
  };

  const compressImages = async (imageFiles) => {
    const compressedImageFilesPromises = [];

    const options = {
      maxSizeMB: 0.35,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      imageFiles.forEach((image) => {
        const task = imageCompression(image, options);
        compressedImageFilesPromises.push(task);
      });
    } catch (error) {
      console.log(error);
    }

    const result = await Promise.all(compressedImageFilesPromises);
    return result;
  };

  //Doing it here because it is almost isolated function:------------------------------
  const addNewPost = async(e) => {
    e.preventDefault();
    setUploading(true);
    setProgress(20);
    const ENDPOINT = `/api/v1/posts`;
    const ADD_NEW_POST_ENDPOINT = `${HOST}${ENDPOINT}`;

    //First do the image compression:-----
    let uploadResult = {};
    if(imageDataFiles.length!==0){
      const compressedImages = await compressImages(imageDataFiles);
      setProgress(40);
      uploadResult = await uploadToFirebase(compressedImages);
    }
    setProgress(60);

    axios
      .post(ADD_NEW_POST_ENDPOINT, {...currPost, images: uploadResult.downloadURLs, imgRef: uploadResult.imgReferences}, {
        withCredentials: true,
        credentials: "include",
      })
      .then((post) => {
        setCurrPost(DEFAULT_STATE);
        setProgress(100);
        navigate("/");
        showAlert("success", "Complaint Added Successfully");
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        showAlert("danger", "Something went wrong...");
        setUploading(false);
        setProgress(100);
      });
  };

  const handleChange = (e) => {
    setCurrPost({
      ...currPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const currentImageDataFiles = [];
    for (let i = 0; i < e.target.files.length; i++) {
      currentImageDataFiles.push(e.target.files[i]);
    }
    setImageDataFiles(currentImageDataFiles);
  };

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
            <div className="mb-3 d-block">
              <h6 className="mx-1 d-inline">
                <label htmlFor="descriptionInput" className="form-label">
                  Upload Images:
                </label>
                <input
                  multiple
                  type="file"
                  className="form-control"
                  id="image"
                  aria-describedby="imageHelp"
                  placeholder="Upload images"
                  name="imageUpload"
                  accept="image/jpeg"
                  onChange={handleImageChange}
                />
              </h6>
            </div>
            <button
              className="btn btn-success my-2"
              onClick={addNewPost}
              disabled={btnDisabled}
            >
              {uploading?"Adding...":"Add now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewPost;
