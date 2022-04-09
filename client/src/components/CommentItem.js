import React, {useContext} from 'react'
import timeDifferenceForDate from '../utils/timeDifferenceForDate';
import commentContext from '../context/comment/commentContext';

const CommentItem = (props) => {
    const comment = props.comment;

    const contextComment = useContext(commentContext);
    const { deleteComment } = contextComment;

    const handleDeleteComment = (e) => {
        e.preventDefault();
        deleteComment(comment._id);
    };

    return (
        <div className="card card-shadow mb-3 my-1 mx-2">
            <div className="card-body">
                <p className="card-text">{comment.comment}</p>
                <div className="d-flex justify-content-between">
                    <p className="card-text"><small className="text-muted">{timeDifferenceForDate(comment.createdAt)} by {comment.user.name}</small></p>
                    {localStorage.getItem("loggedInUserId") === comment.user._id &&
                        <i className="bi bi-trash" style={{ color: "#a30505" }} onClick={handleDeleteComment}></i>}
                </div>
            </div>
        </div>
    )
}

export default CommentItem