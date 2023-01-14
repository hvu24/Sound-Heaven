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
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState([]);
    // const [albumId, setAlbumId] = useState(null);

    useEffect(() => {
        if (!song) {
            dispatch(loadAllUserSongs())
        } else {
            setTitle(song.title)
            setDescription(song.description)
            setUrl(song.url)
            setImageUrl(song.imageUrl)
            // setAlbumId(song.albumId)
        }
    }, [dispatch, song])

    if (!sessionUser.id) {
        return <Redirect to="/login" />
    } else {

        const handleSubmit = (e) => {
            e.preventDefault();
            setErrors([]);

            dispatch(updateSong({ songId, title, description, url, imageUrl }))
                .then(() => {
                    window.alert(`Song with the title of ${title} successfully edited!`)
                    history.push(`/songs/current`)
                })
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        };

        return (
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    Description
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Url
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </label>
                <label>
                    Image Url
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </label>
                {/* <label>
                    Album Id
                    <input
                        type="number"
                        value={albumId}
                        onChange={(e) => setAlbumId(e.target.value)}
                    />
                </label> */}
                <button type="submit">Edit Song</button>
            </form>
        );
    }
}

export default EditSong;
