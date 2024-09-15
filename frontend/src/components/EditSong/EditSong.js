import './EditSong.css'
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory, useParams } from "react-router-dom"
import { updateSong, loadAllUserSongs } from '../../store/userSongsReducer'

function EditSong() {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user)
    const { songId } = useParams()
    const song = useSelector(state => state.userSongReducer[songId])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [url, setUrl] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (!song) {
            dispatch(loadAllUserSongs())
        } else {
            setTitle(song.title)
            setDescription(song.description)
            setUrl(song.url)
            setImageUrl(song.imageUrl)
        }
    }, [dispatch, song])

    if (!sessionUser.id) {
        return <Redirect to="/login" />
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])

        dispatch(updateSong({ songId, title, description, url, imageUrl }))
            .then(() => {
                window.alert(`Song with the title of ${title} successfully edited!`)
                history.push(`/songs/current`)
            })
            .catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })
    }

    return (
        <div className="edit-song-container">
            <form className="edit-song-form" onSubmit={handleSubmit}>
                <h1>Edit Song</h1>
                <ul className="error-list">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>URL</label>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />

                <label>Image URL</label>
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />

                <div className="submit-btn-container">
                    <button className="submit-btn" type="submit">Edit Song</button>
                </div>
            </form>
        </div>
    )
}

export default EditSong
