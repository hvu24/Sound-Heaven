import './DeleteComment.css'

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { removeComment } from '../../store/commentsReducer';
import { useParams } from 'react-router-dom';
import { loadAllComments } from '../../store/commentsReducer'

function DeleteComment() {
    const dispatch = useDispatch();
    const history = useHistory()
    const { commentId, songId } = useParams();
    const commentsObj = useSelector(state => state.commentsReducer)
    const comment = commentsObj[commentId]
    const [body, setBody] = useState('');

    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        if (!comment) {
            dispatch(loadAllComments(songId))
        } else {
            setBody(comment.body)
        }
    }, [dispatch, comment, songId])

    if (!sessionUser.id) {
        return <Redirect to="/login" />
    } else {

        const handleSubmit = (e) => {
            e.preventDefault();

            dispatch(removeComment(commentId))
                .then(() => window.alert(`Song with the title of ${comment.body} successfully deleted!`))

            history.push(`/songs`)
        };

        return (
            <>
                <div>{body}</div>
                <div>{songId}</div>
                <button onClick={handleSubmit}>Delete Comment</button>
            </>

        );
    }
}

export default DeleteComment;
