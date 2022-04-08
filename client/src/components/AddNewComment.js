import React, { useContext} from 'react';
import {useParams} from 'react-router-dom';
import commentContext from "./../context/comment/commentContext";

const AddNewComment = () => {

    const contextComment = useContext(commentContext);
    const { currentComment, setCurrentComment, AddNewComment } = contextComment;

    const {id} = useParams();

    const handleClick = (e) => {
        e.preventDefault();
        console.log('adding a comment');
        AddNewComment(id);
    }

    const handleChange = (e) => {
        setCurrentComment({
          ...currentComment,
          [e.target.name]: e.target.value
        })
      }

    return (
        <form className='my-3'>
            <div className="mb-3">
                <label htmlFor="comment" className="form-label">Write a comment!</label>
                <input type="text" className="form-control" id="comment" value={currentComment.comment} name='comment' onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleClick}>Post Comment</button>
        </form>
    )
}

export default AddNewComment;