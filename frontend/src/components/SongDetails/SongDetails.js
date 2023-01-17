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
    // const [albumId, setAlbumId] = useState(0);
    const sessionUser = useSelector((state) => state.session.user);
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState([]);

    const songDetail = useSelector(state => state.songDetailsReducer[songId])
    const [artist, setArtist] = useState({})
    console.log(imageUrl)

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

        const userName = sessionUser.username
        const userId = sessionUser.id

        dispatch(createComment({ body, songId, userName, userId }))
            .then(() => {
                window.alert(`Comment successfully created!`)
                setBody('')
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    };

    return (
        <div className='showcase-wrapper'>
            {/* <div>Song Id: {songId}</div>
            <div>Artist Id: {artistId}</div> */}
            <div>Artist Name: {artist.username}</div>
            <div>Title: {title}</div>
            <div>Description: {description}</div>
            {/* <div>Url: {url}</div>
            <div>Image Url: {imageUrl}</div> */}
            <img className='preview-img' src={imageUrl} />
            {/* <div>{albumId}</div> */}
            {(sessionUser.id && artistId === sessionUser.id) && <NavLink to={`/songs/${song.id}/delete`}>Delete Song</NavLink>}
            {(sessionUser.id && artistId === sessionUser.id) && <NavLink to={`/songs/${song.id}/edit`}>Edit Song</NavLink>}
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            {sessionUser.id &&
                <textarea
                    rows={5}
                    cols={65}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            }
            {sessionUser.id &&
                <button className='create-comment-button' onClick={handleSubmit}>Create Comment</button>
            }
            <CommentList songId={songId} />
        </div>

    );

}

export default SongDetails;
