import React, {useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import CommentItem from './CommentItem';
import commentContext from "./../context/comment/commentContext";
import Spinner from './Spinner';
import AddNewComment from './AddNewComment';

const Comment = () => {

    const contextComment = useContext(commentContext);
    const { comments, getComments, loading, totalComments, resetToDefaultState } = contextComment;

    const {id} = useParams();

    useEffect(() => {
      getComments(id);
      return () => {resetToDefaultState()};
      //eslint-disable-next-line
    }, [])
    

    return (
        <div className="col" style={{ height: "100vh"  }} >
            {/* <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="comment" className="form-label">Write a comment!</label>
                    <input type="text" className="form-control" id="comment" />
                </div>
                <button type="submit" className="btn btn-primary">Post Comment</button>
            </form> */}
            <AddNewComment />
            <div  className='card overflow-auto' style={{height: "70vh"}} >
                {
                    loading? <Spinner/> : (
                        totalComments===0 ? <p className='text-muted'>No comments</p> :
                        comments.map( (comment)=>{
                            return(
                                <CommentItem key={comment._id} comment={comment} />
                            )
                        } ) 
                    )
                }
            </div>
        </div>
    )
}

export default Comment;