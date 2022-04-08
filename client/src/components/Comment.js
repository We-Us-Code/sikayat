import React, {useContext, useEffect} from 'react';
import CommentItem from './CommentItem';
import commentContext from "./../context/comment/commentContext";
import Spinner from './Spinner';

const Comment = (props) => {

    const contextComment = useContext(commentContext);
    const {  comments, getComments, loading, totalComments, resetToDefaultState } = contextComment;

    useEffect(() => {
      getComments(props.postId);
      return () => {resetToDefaultState()};
      //eslint-disable-next-line
    }, [])
    

    return (
        <div className="col" style={{ height: "100vh"  }} >
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="comment" className="form-label">Write a comment!</label>
                    <input type="text" className="form-control" id="comment" />
                </div>
                <button type="submit" className="btn btn-primary">Post Comment</button>
            </form>
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