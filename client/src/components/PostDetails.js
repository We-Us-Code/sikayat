import React from "react";
//import styles if needed
import PostItem from "./PostItem";
import Comment from "./Comment";
import sampleResponse from './../temporaryData';

const PostDetails = () => {

    const posts = sampleResponse.data.posts;

    return (
        <section className="min-vh-100">
            <div class="row d-flex justify-content-center align-items-center mx-1">
                <div class="col-sm-12 col-md-6 col-lg-4"><PostItem key={posts[0]._id} post={posts[0]} /></div>
                <div class="col-sm-12 col-md-6 col-lg-7 mx-2"><Comment /></div>
            </div>
        </section>
    );
}

export default PostDetails;