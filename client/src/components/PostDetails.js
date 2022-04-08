import React, {useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import PostItem from "./PostItem";
import Comment from "./Comment";
import postDetailsContext from "../context/postDetails/postDetailsContext";
import Spinner from "./Spinner";

const PostDetails = (props) => {

    const {id} = useParams();
    const contextPostDetails = useContext(postDetailsContext);
    const {post, getPost, loading, setLoading} = contextPostDetails;

    useEffect( () => {
        getPost(id);

        return () => { setLoading(true) }
        //eslint-disable-next-line
    }, []);
    
    return (
        <section className="min-vh-100">
            <div className="row d-flex justify-content-center align-items-center mx-1">
                <div className="col-sm-12 col-md-6 col-lg-4">{loading ? <Spinner /> : <PostItem key={post._id} post={post} />}</div>
                <div className="col-sm-12 col-md-6 col-lg-7 mx-2"><Comment postId={id}/></div>
            </div>
        </section>
    );
}

export default PostDetails;