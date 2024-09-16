import './PlaylistDetails.css'
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom'
import { playlistDetails } from '../../store/userPlaylistsReducer'
import { useMusicPlayer } from '../MusicPlayerContext/MusicPlayerContext'
import { removeSongFromPlaylist } from '../../store/userPlaylistsReducer'

function PlaylistDetails() {
    const dispatch = useDispatch()
    const { playlistId } = useParams()
    const playlistDetail = useSelector(state => state.userPlaylistReducer[playlistId])
    const songs = playlistDetail?.Songs
    const { myplaylist, setPlaylist, currentSong, setSongTitle, setCurrentSong, setTrackIndex } = useMusicPlayer()

    useEffect(() => {
        dispatch(playlistDetails(playlistId))
    }, [dispatch, playlistId])

    useEffect(() => {
        if (songs && JSON.stringify(myplaylist) !== JSON.stringify(songs)) {
            setPlaylist(songs)
        }
    }, [songs, myplaylist, setPlaylist])

    const handlePlay = (song, index) => {
        if (currentSong !== song.url) {
            setSongTitle(song.title)
            setCurrentSong(song.url)
            setTrackIndex(index)
        }
    }

    const handleDelete = (songId) => {
        const data = { songId, playlistId }
        dispatch(removeSongFromPlaylist(data))
    }

    return (
        <div className="playlist-outer-wrapper">
            <div className="playlist-details-wrapper">
                <div className="playlist-header">
                    <img className="playlist-image" src={playlistDetail?.imageUrl} alt={playlistDetail?.name} />
                    <div className="playlist-info">
                        <h1>{playlistDetail?.name}</h1>
                        <p>{songs?.length} {songs?.length === 1 ? 'Song' : 'Songs'}</p>
                    </div>
                </div>

                <div className="playlist-songs-list">
                    {songs?.map((song, index) => (
                        <div className="playlist-song" key={song.id}>
                            <div className="playlist-song-index">{index + 1}</div>
                            <div className="playlist-song-info">
                                <h3>{song.title}</h3>
                                <p>{song.artistName}</p>
                            </div>
                            <div className="playlist-song-controls">
                                <button className="play-button" onClick={() => handlePlay(song, index)}>
                                    {currentSong === song.url ? 'pause' : 'play'}
                                </button>
                                <button className="delete-button" onClick={() => handleDelete(song.id)}>
                                    &#x2212;
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PlaylistDetails
