import './DeleteSong.css'

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { removeSong } from '../../store/userSongsReducer';
import { useParams } from 'react-router-dom';
import { loadAllUserSongs } from '../../store/userSongsReducer';

function DeleteSong() {
    const dispatch = useDispatch();
    const history = useHistory()
    const { songId } = useParams();
    const songsObj = useSelector(state => state.userSongReducer)
    const song = songsObj[songId]
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [artistId, setArtistId] = useState('');

    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        if (!song) {
            dispatch(loadAllUserSongs())
        } else {
            setTitle(song.title)
            setDescription(song.description)
            setUrl(song.url)
            setImageUrl(song.imageUrl)
            setArtistId(song.artistId)
        }
    }, [dispatch, song])



    if (!sessionUser.id) {
        return <Redirect to="/login" />
    } else {

        const handleSubmit = (e) => {
            e.preventDefault();

            dispatch(removeSong(songId))
                .then(() => window.alert(`Song with the title of ${song.title} successfully deleted!`))

            history.push(`/songs/current`)
        };

        return (
            <>
                <div>{artistId}</div>
                <div>{title}</div>
                <div>{description}</div>
                <div>{url}</div>
                <div>{imageUrl}</div>
                <button onClick={handleSubmit}>Delete Song</button>
            </>

        );
    }
}

export default DeleteSong;
