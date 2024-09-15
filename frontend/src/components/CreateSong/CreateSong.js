import './CreateSong.css'
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"
import { createSong } from '../../store/userSongsReducer'

function CreateSong() {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [audio, setAudio] = useState("")
    const [errors, setErrors] = useState([])
    const [albumId, setAlbumId] = useState(null)
    const [image, setImage] = useState(null)

    if (!sessionUser.id) {
        return <Redirect to="/login" />
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])

        dispatch(createSong({ title, description, audio, image, albumId }))
            .then(() => {
                window.alert(`Song with the title of ${title} successfully created!`)
                history.push(`/songs/current`)
            })
            .catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })
    }

    return (
        <div className="create-song-container">
            <form className="create-song-form" onSubmit={handleSubmit}>
                <h1>Upload Song</h1>
                <ul className="error-list">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />

                <label>Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />

                <label>Audio</label>
                <input
                    type="file"
                    name="audio"
                    accept="audio/*"
                    onChange={(e) => {
                        setAudio(e.target.files[0])
                    }} />

                <label>Image</label>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => {
                        setImage(e.target.files[0])
                    }} />

                <button className="submit-btn" type="submit">Upload Song</button>
            </form>
        </div>
    )
}

export default CreateSong
