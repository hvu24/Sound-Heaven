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
    const [errors, setErrors] = useState([]);
    const [albumId, setAlbumId] = useState(null);
    const [image, setImage] = useState(null);

    if (!sessionUser.id) {
        return <Redirect to="/login" />
    } else {

        const handleSubmit = (e) => {
            e.preventDefault();
            setErrors([]);

            dispatch(createSong({ title, description, url, image, albumId }))
                .then(() => {
                    window.alert(`Song with the title of ${title} successfully created!`)
                    history.push(`/songs/current`)
                })
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        };

        return (
            // <form onSubmit={handleSubmit}>
            // <ul>
            //     {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            // </ul>
            //     <label>
            //         Title
            //         <input
            //             type="text"
            //             value={title}
            //             onChange={(e) => setTitle(e.target.value)}

            //         />
            //     </label>
            //     <label>
            //         Description
            //         <input
            //             type="text"
            //             value={description}
            //             onChange={(e) => setDescription(e.target.value)}

            //         />
            //     </label>
            //     <label>
            //         Url
            //         <input
            //             type="text"
            //             value={url}
            //             onChange={(e) => setUrl(e.target.value)}

            //         />
            //     </label>
            //     <label>
            //         Image Url
            //         <input
            //             type="text"
            //             value={imageUrl}
            //             onChange={(e) => setImageUrl(e.target.value)}

            //         />
            //     </label>
            //     {/* <label>
            //         Album Id
            //         <input
            //             type="number"
            //             value={albumId}
            //             onChange={(e) => setAlbumId(e.target.value)}
            //         />
            //     </label> */}
            //     <button type="submit">Create Song</button>
            // </form>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
                <input
                    type="text"
                    placeholder="Url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)} />
                {/* <input
                        type="file"
                        placeholder="Image Url"
                        value={image}
                        onChange={(e) => setImage(e.target.files[0])} /> */}
                <label>Image:
                    <input type="file"
                    onChange={(e) => {
                        setImage(e.target.files[0]);
                    }} />
                </label>
                <button type="submit">Create Song</button>
            </form>
        );
    }
}

export default CreateSong;
