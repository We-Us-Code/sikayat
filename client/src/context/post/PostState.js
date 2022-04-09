import { useState, useContext } from "react";
import PostContext from "./postContext";
import { HOST } from "../../constants";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import alertContext from "./../alert/alertContext";

const PostState = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const contextAlert = useContext(alertContext);
  const { showAlert } = contextAlert;

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(-1); //to prevent endMessage from showing in InfiniteScroll( emptyArray.size !== -1 )

  //set default state
  const resetToDefaultState = () => {
    setPosts([]);
    setPage(1);
    setTotalPosts(-1);
  };

  //get all posts
  const getPosts = async () => {
    const ENDPOINT = `/api/v1/posts?page=${page}&limit=6`;
    const GET_ALL_POSTS_ENDPOINT = `${HOST}${ENDPOINT}`;
    try {
      const response = await axios.get(GET_ALL_POSTS_ENDPOINT, {
        withCredentials: true,
        credentials: "include",
      });
      let updatedPosts = posts.concat(response.data.data.data);
      let updatedTotalPosts = response.data.totalDocuments;
      setPosts(updatedPosts);
      setPage(page + 1);
      setTotalPosts(updatedTotalPosts);
    } catch (error) {
      console.error(error);
    }
  };

  //delete a post
  const deletePost = async (id) => {
    const ENDPOINT = `/api/v1/posts/${id}`;
    const DELETE_SINGLE_POST_ENDPOINT = `${HOST}${ENDPOINT}`;
    try {
      const response = await axios.delete(DELETE_SINGLE_POST_ENDPOINT, {
        withCredentials: true,
        credentials: "include",
      });

      if (response.status === 204) {
        if (location.pathname === "/") window.location.reload();
        else navigate("/");
        showAlert("success", "Post Deleted Successfully");
      } else {
        console.log("Something went wrong!!!, couldn't delete");
        showAlert("danger", "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      showAlert("danger", "Something went wrong");
    }
  };

  return (
    <PostContext.Provider
      value={{ posts, getPosts, totalPosts, resetToDefaultState, deletePost }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
