import './SongCard.css'
import { useSelector, useDispatch } from "react-redux"
import { NavLink } from 'react-router-dom'
import React, { useEffect } from "react"
import { songDetails } from '../../store/songDetailsReducer'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { ButtonGroup, Dropdown } from 'react-bootstrap'
import PlayButtonImage from './PlayButtonImage'
import { addSongToPlaylist } from '../../store/userPlaylistsReducer'
import { loadAllUserPlaylists } from '../../store/userPlaylistsReducer'

const SongCard = ({ song, songId, index, isHomePage = false, isMySongsPage = false }) => {
    const sessionUser = useSelector((state) => state.session.user)
    const dispatch = useDispatch()
    const songDetail = useSelector(state => state.songDetailsReducer[songId])
    const playlistsObj = useSelector(state => state.userPlaylistReducer)
    const playlistsArr = Object.values(playlistsObj)

    useEffect(() => {
        if (!playlistsObj) {
            dispatch(loadAllUserPlaylists())
        }
    }, [dispatch, playlistsObj])

    useEffect(() => {
        if (!songDetail) {
            dispatch(songDetails(songId))
        }
    }, [dispatch, songId, songDetail])

    const addToPlaylist = (playlistId) => {
        const data = { songId, playlistId }
        dispatch(addSongToPlaylist(data))
    }

    return (
        <Card style={{ width: '25rem' }}>
            <PlayButtonImage imageUrl={song.imageUrl} songUrl={song.url} songTitle={song.title} index={index} />
            <Card.Body>
                <Card.Title>{song.title}</Card.Title>
                <Card.Text>{song.description}</Card.Text>
            </Card.Body>

            {!isHomePage && sessionUser?.id && (
                <Dropdown as={ButtonGroup}>
                    <Button variant="success">Add Song to Playlist</Button>
                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                    <Dropdown.Menu>
                        {playlistsArr.map((playlist) => (
                            <Dropdown.Item key={playlist.id} onClick={() => addToPlaylist(playlist.id)}>
                                {playlist.name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            )}

            <div className="d-flex justify-content-center my-3">
                <NavLink to={`/songs/${song.id}/details`}>
                    <Button variant="primary">Details</Button>
                </NavLink>
            </div>

            {isMySongsPage && sessionUser?.id === song.artistId && (
                <ButtonGroup className="d-flex justify-content-center">
                    <NavLink to={`/songs/${song.id}/edit`}>
                        <Button variant="warning">Edit Song</Button>
                    </NavLink>
                    <NavLink to={`/songs/${song.id}/delete`}>
                        <Button variant="danger">Delete Song</Button>
                    </NavLink>
                </ButtonGroup>
            )}
        </Card>
    )
}

export default SongCard
