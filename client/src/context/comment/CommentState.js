import { useState } from "react";
import CommentContext from "./commentContext";
import { HOST } from "../../constants";
import axios from "axios";

const CommentState = (props) => {

    const DEFAULT_COMMENT_STATE = {
        comment: ""
    };

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalComments, setTotalComments] = useState(0);
    const [currentComment, setCurrentComment] = useState(DEFAULT_COMMENT_STATE);

    const resetToDefaultState = () => {
        setComments([]);
        setLoading(true);
        setTotalComments(0);
        setCurrentComment(DEFAULT_COMMENT_STATE);
    }

    const getComments = async(postId) => {
        const ENDPOINT = `/api/v1/posts/${postId}/comments`;
        const GET_ALL_COMMENTS_ENDPOINT = `${HOST}${ENDPOINT}`;
        try {
            const response = await axios.get(GET_ALL_COMMENTS_ENDPOINT, {
                withCredentials: true,
                credentials: "include"
            });
            const updatedComments = response.data.data.comments;
            const updatedTotalComments = response.data.results;
            setComments(updatedComments);
            setTotalComments(updatedTotalComments);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    const AddNewComment = async(postId) => {
        const ENDPOINT = `/api/v1/posts/${postId}/comments`;
        const ADD_NEW_COMMENT_ENDPOINT = `${HOST}${ENDPOINT}`;

        axios.post(ADD_NEW_COMMENT_ENDPOINT, currentComment, {
            withCredentials: true,
            credentials: "include",
          }).then((res) => {
            //API RETURNS MISMATCH JSON, FOR NOW FORCING RELOAD, LATER MUST ADD THE COMMENT RETURNED IN RESPONSE TO "comments" STATE
            resetToDefaultState(); 
            window.location.reload(false); //RELOAD
          }).catch((err) => {
            console.log(err);
          })        
    }

    return (
        <CommentContext.Provider
            value={{ comments, getComments, totalComments, loading, currentComment, setCurrentComment, AddNewComment, resetToDefaultState  }}
        >
            {props.children}
        </CommentContext.Provider>
    );
};

export default CommentState;