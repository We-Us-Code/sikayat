import React from "react";
//import styles if needed
import PostItem from "./PostItem";
import Comment from "./Comment";
import sampleResponse from './../temporaryData';

const PostDetails = () => {

    const posts = sampleResponse.data.posts;

    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <PostItem key={posts[0]._id} post={posts[0]}/>
                    <Comment />
                </div>
            </div>
        </section>
    );
}

export default PostDetails;