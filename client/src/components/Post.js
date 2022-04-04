import React from "react";
import PostItem from "./PostItem";
import sampleResponse from './../temporaryData'

const Post = () => {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 mx-2">
      {
        sampleResponse.data.posts.map((post)=>{
          return <PostItem key={post._id} post={post}/>
        })
      }
    </div>
  );
};

export default Post;
