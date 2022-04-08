import { useState } from "react";
import CommentContext from "./commentContext";
import { HOST } from "../../constants";
import axios from "axios";

const CommentState = (props) => {

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalComments, setTotalComments] = useState(0);

    const resetToDefaultState = () => {
        setComments([]);
        setLoading(true);
        setTotalComments(0);
    }

    const getComments = async(postId) => {
        const ENDPOINT = `/api/v1/posts/${postId}/comments`;
        const GET_ALL_COMMENTS_ENDPOINT = `${HOST}${ENDPOINT}`;
        try {
            const response = await axios.get(GET_ALL_COMMENTS_ENDPOINT, {
                withCredentials: true,
                credentials: "include"
            });
            let updatedComments = response.data.data.comments;
            let updatedTotalComments = response.data.results;
            setComments(updatedComments);
            setTotalComments(updatedTotalComments);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <CommentContext.Provider
            value={{ comments, getComments, totalComments,loading, resetToDefaultState  }}
        >
            {props.children}
        </CommentContext.Provider>
    );
};

export default CommentState;