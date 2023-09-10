import './PlaylistDetails.css'

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { playlistDetails } from '../../store/playlistDetailsReducer';
import SongCard from '../SongCard/SongCard';
import { useMusicPlayer } from '../MusicPlayerContext/MusicPlayerContext';

function PlaylistDetails() {
    const dispatch = useDispatch();
    const { playlistId } = useParams();
    const playlistDetail = useSelector(state => state.playlistDetailsReducer[playlistId])
    const songs = playlistDetail?.Songs
    const { myplaylist, setPlaylist } = useMusicPlayer()


    useEffect(() => {
        if (!playlistDetail) {
            dispatch(playlistDetails(playlistId))
        } else {

        }
    }, [dispatch, playlistId, playlistDetail])

    useEffect(() => {
        if(songs){
            if (JSON.stringify(myplaylist) !== JSON.stringify(songs)) {
                setPlaylist(songs);
            }
        }
    }, [songs, myplaylist, setPlaylist]);

    return (
        <div className='showcase-wrapper'>
            {songs?.map((song, index) => {
                return (
                    <SongCard className='col' key={song.id} song={song} songId={song.id} index={index}></SongCard>
                )
            })}
        </div>

    );

}

export default PlaylistDetails;
