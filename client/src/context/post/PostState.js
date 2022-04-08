import { useState } from "react";
import PostContext from "./postContext";
import {HOST} from "../../constants";
import axios from "axios";

const PostState = (props) => {

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);

    //set default state
    const resetToDefaultState = () => {
        setPosts([]);
        setPage(1);
        setTotalPosts(0);
    }

    //get all posts
    const getPosts = async () => {
        const endpoint = `/api/v1/posts?page=${page}&limit=6`;
        const GET_ALL_POSTS_ENDPOINT = `${HOST}${endpoint}`;
        try {
            const response = await axios.get(GET_ALL_POSTS_ENDPOINT, {
                withCredentials: true,
                credentials: "include"
            });
            let updatedPosts = posts.concat(response.data.data.posts);
            let updatedTotalPosts = response.data.totalPosts;
            setPosts(updatedPosts);
            setPage(page+1);
            setTotalPosts(updatedTotalPosts);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <PostContext.Provider
            value={{ posts, getPosts, totalPosts, resetToDefaultState }}
        >
            {props.children}
        </PostContext.Provider>
    );
};

export default PostState;