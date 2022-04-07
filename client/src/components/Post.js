import React, { useContext, useEffect } from "react";
import PostItem from "./PostItem";
import postContext from "../context/post/postContext";
import InfiniteScroll from "react-infinite-scroll-component"

const Post = () => {

  const contextPost = useContext(postContext);
  const { posts, getPosts, totalPosts } = contextPost;

  useEffect(() => {
    getPosts();
  }, [])


  return (



    <InfiniteScroll
      dataLength={posts.length} //This is important field to render the next data
      next={getPosts}
      hasMore={posts.length !== totalPosts}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Read all complaints</b>
        </p>
      }
      scrollThreshold ={0.95}
    >
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 mx-2">
        {
          posts.map((post) => {
            return <PostItem key={post._id} post={post} />
          })
        }
      </div>
    </InfiniteScroll>




  );
};

export default Post;
