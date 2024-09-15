import './SongDetails.css'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { songDetails } from '../../store/songDetailsReducer';
import CommentList from '../CommentList/CommentList';
import { createComment } from '../../store/commentsReducer';
import { loadAllSongs } from '../../store/songsReducer';
import { NavLink } from 'react-router-dom';

function SongDetails() {
    const dispatch = useDispatch();
    const { songId } = useParams();
    const songsObj = useSelector(state => state.songReducer)
    const song = songsObj[songId]
    const [artistId, setArtistId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const sessionUser = useSelector((state) => state.session.user);
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState([]);
    const songDetail = useSelector(state => state.songDetailsReducer[songId])
    const [artist, setArtist] = useState({})

    useEffect(() => {
        if (!song) {
            dispatch(loadAllSongs())
        } else {
            setTitle(song.title)
            setDescription(song.description)
            setUrl(song.url)
            setImageUrl(song.imageUrl)
            setArtistId(song.artistId)
        }
    }, [dispatch, song])

    useEffect(() => {
        if (!songDetail) {
            dispatch(songDetails(songId))
        } else {
            setArtist(songDetail.Artist)
        }
    }, [dispatch, songId, songDetail])

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const userName = sessionUser.username;
        const userId = sessionUser.id;

        dispatch(createComment({ body, songId, userName, userId }))
            .then(() => {
                window.alert(`Comment successfully created!`);
                setBody('');
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    };

    return (
        <div className='details-container'>
            <div className='details-header'>
                <img className='preview-img' src={imageUrl} alt={title} />
                <div className='details-info'>
                    <h2>{title}</h2>
                    <p><strong>Artist:</strong> {artist.username}</p>
                    <p><strong>Description:</strong> {description}</p>
                </div>
            </div>

            <div className='comment-section'>
                <h3>Comments</h3>
                {sessionUser?.id && (
                    <form onSubmit={handleSubmit} className="comment-form">
                        <ul className="errors-list">
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        <textarea
                            rows={5}
                            cols={65}
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Write a comment..."
                        />
                        <button className='create-comment-button' type="submit">Create Comment</button>
                    </form>
                )}
                <CommentList songId={songId} />
            </div>
        </div>
    );
}

export default SongDetails;

