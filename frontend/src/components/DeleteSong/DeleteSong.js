import './DeleteSong.css'

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { removeSong } from '../../store/userSongsReducer';
import { useParams } from 'react-router-dom';
import { loadAllUserSongs } from '../../store/userSongsReducer';
import { songDetails } from '../../store/songDetailsReducer';
// import { loadAllSongs } from '../../store/songsReducer';
import { deleteSongFromAll } from '../../store/songsReducer';

function DeleteSong() {
    const dispatch = useDispatch();
    const history = useHistory()
    const { songId } = useParams();
    const songsObj = useSelector(state => state.userSongReducer)
    const song = songsObj[songId]
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // const [url, setUrl] = useState('');
    // const [imageUrl, setImageUrl] = useState('');
    // const [artistId, setArtistId] = useState('');

    const sessionUser = useSelector((state) => state.session.user);

    const songDetail = useSelector(state => state.songDetailsReducer[songId])
    const [artist, setArtist] = useState({})

    useEffect(() => {
        if (!song) {
            dispatch(loadAllUserSongs())
        } else {
            setTitle(song.title)
            setDescription(song.description)
            // setUrl(song.url)
            // setImageUrl(song.imageUrl)
            // setArtistId(song.artistId)
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
        return <Redirect to="/login" />
    } else {

        const handleSubmit = (e) => {
            e.preventDefault();

            dispatch(removeSong(songId))
                .then(() => {
                    // dispatch(loadAllSongs())
                    dispatch(deleteSongFromAll(songId))
                    window.alert(`Song with the title of ${songDetail.title} successfully deleted!`)
                    history.push(`/songs/current`)
                })

        };

        return (
            <>
                {/* <div>Song Id: {songId}</div>
                <div>Artist Id: {artistId}</div> */}
                <div>Artist Name: {artist.username}</div>
                <div>Title: {title}</div>
                <div>Description: {description}</div>
                {/* <div>Url: {url}</div>
                <div>Image Url:{imageUrl}</div> */}
                <button onClick={handleSubmit}>Delete Song</button>
            </>
        );
    }
}

export default DeleteSong;
