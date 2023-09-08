import './PlaylistDetails.css'

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { playlistDetails } from '../../store/playlistDetailsReducer';
import { loadAllSongs } from '../../store/songsReducer';
import { NavLink } from 'react-router-dom';

function PlaylistDetails() {
    const dispatch = useDispatch();
    const { playlistId } = useParams();

    const playlistDetail = useSelector(state => state.playlistDetailsReducer[playlistId])


    useEffect(() => {
        if (!playlistDetail) {
            dispatch(playlistDetails(playlistId))
        } else {

        }
    }, [dispatch, playlistId, playlistDetail])

    return (
        <div className='showcase-wrapper'>
            yo
        </div>

    );

}

export default PlaylistDetails;
