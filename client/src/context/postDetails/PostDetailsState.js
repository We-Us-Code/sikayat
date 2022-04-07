import { useState } from "react";
import PostDetailsContext from "./postDetailsContext";
import {HOST} from "../../constants";
import axios from "axios";

const PostDetailsState = (props) => {

    const DEFAULT_POST =       {
        upvotersId: [],
        downvotersId: [],
        upvoteCount: 0,
        downvoteCount: 0,
        images: [],
        createdAt: "",
        tags: [],
        _id: "",
        heading: "",
        body: "",
        userId: "",
        id: "",
      };

    const [post, setPost] = useState(DEFAULT_POST);
    const [loading, setLoading] = useState(true);

    const getPost = async(id) => {
        const ENDPOINT = `/api/v1/posts/${id}`;
        const GET_SINGLE_POST_ENDPOINT = `${HOST}${ENDPOINT}`;
        try {
            const response = await axios.get(GET_SINGLE_POST_ENDPOINT, {
                withCredentials: true,
                credentials: "include"
            });
            let updatedPost = response.data.data.post;
            setPost(updatedPost);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <PostDetailsContext.Provider
            value={{ post, getPost, loading, setLoading }}
        >
            {props.children}
        </PostDetailsContext.Provider>
    );
}

export default PostDetailsState;