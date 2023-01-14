import './CommentCard.css'
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import React from "react";

const CommentCard = ({ comment, songId }) => {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <div className='comment-card'>
            <div>User Name: {comment.User.username}</div>
            <div>{comment.body}</div>
            {(sessionUser.id && comment.userId === sessionUser.id) && <NavLink to={`/songs/${songId}/comments/${comment.id}/delete`}>Delete Comment</NavLink>}
        </div>
    )
}

export default CommentCard
