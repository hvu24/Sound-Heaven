import './SongCard.css'
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { songDetails } from '../../store/songDetailsReducer';

const SongCard = ({ song, songId }) => {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const songDetail = useSelector(state => state.songDetailsReducer[songId])
    const [artist, setArtist] = useState({})

    useEffect(() => {
        if (!songDetail) {
            dispatch(songDetails(songId))
        } else {
            setArtist(songDetail.Artist)
        }
    }, [dispatch, songId, songDetail])

    return (
        <div className='song-card'>
            {/* <div>Song Id: {song.id}</div>
            <div>Artist Id: {song.artistId}</div> */}
            <div>Artist Name: {artist.username}</div>
            <div>Title: {song.title}</div>
            <div>Description: {song.description}</div>
            {/* <div>Url: {song.url}</div>
            <div>Image Url: {song.imageUrl}</div> */}
            <NavLink to={`/songs/${song.id}/details`}>Song Details</NavLink>
            {(sessionUser.id && song.artistId === sessionUser.id) && <NavLink to={`/songs/${song.id}/delete`}>Delete Song</NavLink>}
            {(sessionUser.id && song.artistId === sessionUser.id) && <NavLink to={`/songs/${song.id}/edit`}>Edit Song</NavLink>}
        </div>
    )
}

export default SongCard
