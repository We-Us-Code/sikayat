import React from 'react';
import CommentItem from './CommentItem';

const Comment = () => {
    return (
        <div className="col" style={{ height: "100%"  }} >
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="comment" className="form-label">Write a comment!</label>
                    <input type="text" className="form-control" id="comment" />
                </div>
                <button type="submit" className="btn btn-primary">Post Comment</button>
            </form>
            <div  className='overflow-auto' style={{ height: "70%"}} >
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
            </div>
        </div>
    )
}

export default Comment;