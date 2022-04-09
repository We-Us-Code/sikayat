import React, { useContext} from 'react';
import {useParams} from 'react-router-dom';
import commentContext from "./../context/comment/commentContext";

const AddNewComment = () => {

    const contextComment = useContext(commentContext);
    const { currentComment, setCurrentComment, AddNewComment } = contextComment;

    const {id} = useParams();

    const handleClick = (e) => {
        e.preventDefault();
        AddNewComment(id);
    }

    const handleChange = (e) => {
        setCurrentComment({
          ...currentComment,
          [e.target.name]: e.target.value
        })
      }

    return (
        <form className='my-2'>
            <div className="mb-3 my-2 mx-2">
                <label htmlFor="comment" className="form-label">Write a comment!</label>
                <input type="text" className="form-control" id="comment" value={currentComment.comment} name='comment' onChange={handleChange}/>
            </div>
            <button disabled={currentComment.comment.length<1||currentComment.comment.length>300} type="submit" className="btn btn-primary my-2 mx-2" onClick={handleClick}>Post Comment</button>
        </form>
    )
}

export default AddNewComment;