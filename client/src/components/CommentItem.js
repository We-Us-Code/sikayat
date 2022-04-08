import React from 'react'
import timeDifferenceForDate from '../utils/timeDifferenceForDate';

const CommentItem = (props) => {
    const comment = props.comment;

    return (
        <div className="card mb-3">
            <div className="card-body">
                <p className="card-text">{comment.comment}</p>
                <p className="card-text"><small className="text-muted">{timeDifferenceForDate(comment.createdAt)} by {comment.user.name}</small></p>
            </div>
        </div>
    )
}

export default CommentItem