import './CommentCard.css'
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';

const CommentCard = ({ comment, songId }) => {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <div className='comment-card'>
            <div>{comment.body}</div>
            <div>{comment.songId}</div>
            {(sessionUser.id && comment.userId === sessionUser.id) && <NavLink to={`/songs/${songId}/comments/${comment.id}/delete`}>Delete Comment</NavLink>}
        </div>
    )
}

export default CommentCard
