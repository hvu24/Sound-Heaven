import './CreateSong.css'

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createSong } from '../../store/userSongsReducer';

function CreateSong() {
    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    // const [albumId, setAlbumId] = useState(null);

    if (!sessionUser.id) {
        return <Redirect to="/login" />
    } else {

        const handleSubmit = (e) => {
            e.preventDefault();

            dispatch(createSong({ title, description, url, imageUrl }))
                .then(() => window.alert(`Song with the title of ${title} successfully created!`))

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
                {/* <label>
                    Album Id
                    <input
                        type="number"
                        value={albumId}
                        onChange={(e) => setAlbumId(e.target.value)}
                    />
                </label> */}
                <button type="submit">Create Song</button>
            </form>
        );
    }
}

export default CreateSong;
