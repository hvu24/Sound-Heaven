import './SongDetails.css'

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { songDetails } from '../../store/songDetailsReducer';
import CommentList from '../CommentList/CommentList';
import { createComment } from '../../store/commentsReducer';

function SongDetails() {
    const dispatch = useDispatch();
    const { songId } = useParams();
    const song = useSelector(state => state.songDetailsReducer[songId])
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [albumId, setAlbumId] = useState(0);
    const sessionUser = useSelector((state) => state.session.user);
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (!song) {
            dispatch(songDetails(songId))
        } else {
            setTitle(song.title)
            setDescription(song.description)
            setUrl(song.url)
            setImageUrl(song.imageUrl)
            setAlbumId(song.albumId)
        }
    }, [dispatch, song, songId])

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        dispatch(createComment({ body, songId }))
            .then(() => window.alert(`Comment successfully created!`))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    };

    return (
        <>
            <div>{title}</div>
            <div>{description}</div>
            <div>{url}</div>
            <div>{imageUrl}</div>
            <div>{albumId}</div>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            {sessionUser.id && <form onSubmit={handleSubmit}>
                <label>
                    <textarea
                        rows={5}
                        cols={50}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </label>
                <button type="submit">Create Comment</button>
            </form>}
            <CommentList songId={songId} />
        </>

    );

}

export default SongDetails;
