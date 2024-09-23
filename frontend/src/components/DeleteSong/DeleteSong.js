import './DeleteSong.css'
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory, useParams } from "react-router-dom"
import { removeSong, loadAllUserSongs } from '../../store/userSongsReducer'
import { songDetails } from '../../store/songDetailsReducer'
import { deleteSongFromAll } from '../../store/songsReducer'

function DeleteSong() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { songId } = useParams()
    const songsObj = useSelector(state => state.userSongReducer)
    const song = songsObj[songId]
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const sessionUser = useSelector((state) => state.session.user)
    const songDetail = useSelector(state => state.songDetailsReducer[songId])
    const [artist, setArtist] = useState({})

    useEffect(() => {
        if (!song) {
            dispatch(loadAllUserSongs())
        } else {
            setTitle(song.title)
            setDescription(song.description)
        }
    }, [dispatch, song])

    useEffect(() => {
        if (!songDetail) {
            dispatch(songDetails(songId))
        } else {
            setArtist(songDetail.Artist)
        }
    }, [dispatch, songId, songDetail])

    if (!sessionUser.id) {
        return <Redirect to="/" />
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(removeSong(songId))
            .then(() => {
                dispatch(deleteSongFromAll(songId))
                window.alert(`Song with the title of ${songDetail.title} successfully deleted!`)
                history.push(`/songs/current`)
            })
    }

    return (
        <div className="delete-song-wrapper">
            <div className="delete-song-container">
                <h1>Delete Song</h1>
                <div className="delete-song-details">
                    <p><strong>Artist Name:</strong> {artist.username}</p>
                    <p><strong>Title:</strong> {title}</p>
                    <p><strong>Description:</strong> {description}</p>
                </div>
                <div className="submit-btn-container">
                    <button className="submit-btn" onClick={handleSubmit}>Delete Song</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteSong
