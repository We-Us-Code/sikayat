import { useState } from "react";
import PostContext from "./postContext";
import {HOST} from "../../constants";
import axios from "axios";

const PostState = (props) => {

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(-1); //to prevent endMessage from showing in InfiniteScroll( emptyArray.size !== -1 )

    //set default state
    const resetToDefaultState = () => {
        setPosts([]);
        setPage(1);
        setTotalPosts(-1);
    }

    //get all posts
    const getPosts = async () => {
        const ENDPOINT = `/api/v1/posts?page=${page}&limit=6`;
        const GET_ALL_POSTS_ENDPOINT = `${HOST}${ENDPOINT}`;
        try {
            const response = await axios.get(GET_ALL_POSTS_ENDPOINT, {
                withCredentials: true,
                credentials: "include"
            });
            let updatedPosts = posts.concat(response.data.data.data);
            let updatedTotalPosts = response.data.totalDocuments;
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