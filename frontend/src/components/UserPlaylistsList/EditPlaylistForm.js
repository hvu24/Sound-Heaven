import './EditPlaylistForm.css'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePlaylist } from '../../store/userPlaylistsReducer';

const EditPlaylistForm = ({ playlist, closeModal }) => {
    const dispatch = useDispatch()
    const [name, setName] = useState(playlist.name)
    const [imageUrl, setImageUrl] = useState(playlist.imageUrl)
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const updatedPlaylist = {
            name,
            imageUrl,
            playlistId: playlist.id,
        };

        dispatch(updatePlaylist(updatedPlaylist))
            .then(() => closeModal())
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            });
    };

    return (
        <div className="edit-playlist-modal">
            <h2>Edit Playlist</h2>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Image URL
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </label>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditPlaylistForm;
