import './EditSong.css'

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { updateSong } from '../../store/userSongsReducer';
import { useParams } from 'react-router-dom';
import { loadAllUserSongs } from '../../store/userSongsReducer';

function EditSong() {
    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);
    const { songId } = useParams();
    const song = useSelector(state => state.userSongReducer[songId])
    // const song = songsObj[songId]
    console.log(song)
    const [title, setTitle] = useState(song?.title || '');
    console.log(title)
    const [description, setDescription] = useState(song?.description);
    const [url, setUrl] = useState(song?.url);
    const [imageUrl, setImageUrl] = useState(song?.imageUrl);
    const [albumId, setAlbumId] = useState(song?.albumId);

    useEffect(() => {
        dispatch(loadAllUserSongs())
    }, [dispatch])

    if (!sessionUser.id) {
        return <Redirect to="/login" />
    } else {

        const handleSubmit = (e) => {
            e.preventDefault();
            dispatch(updateSong({ songId, title, description, url, imageUrl, albumId }))
            history.push(`/songs/current`)
        };

        return (
            <form onSubmit={handleSubmit}>
                <label>
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Url
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Image Url
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Album Id
                    <input
                        type="number"
                        value={albumId}
                        onChange={(e) => setAlbumId(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Edit Song</button>
            </form>
        );
    }
}

export default EditSong;
