import './DeleteSong.css'

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { removeSong } from '../../store/userSongsReducer';
import { useParams } from 'react-router-dom';

function DeleteSong() {
    const dispatch = useDispatch();
    const history = useHistory()
    const { songId } = useParams();
    const songsObj = useSelector(state => state.userSongReducer)
    const song = songsObj[songId]

    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser.id) {
        return <Redirect to="/login" />
    } else {

        const handleSubmit = (e) => {
            e.preventDefault();
            dispatch(removeSong(songId))
            history.push(`/songs/current`)
        };

        return (
            <>
                <div>{song.artistId}</div>
                <div>{song.title}</div>
                <div>{song.description}</div>
                <form onSubmit={handleSubmit}>
                    <button type="submit">Delete Song</button>
                </form>
            </>

        );
    }
}

export default DeleteSong;
