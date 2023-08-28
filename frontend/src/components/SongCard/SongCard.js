import './SongCard.css'
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { songDetails } from '../../store/songDetailsReducer';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Container, Row, Col, ButtonGroup } from 'react-bootstrap';
import PlayButtonImage from './PlayButtonImage';

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
        <Card style={{ width: '18rem' }}>
            <PlayButtonImage imageUrl={song.imageUrl} songUrl={song.url} songTitle={song.title} />
            <Card.Body>
                <Card.Title>{song.title}</Card.Title>
                <Card.Text>{song.description}</Card.Text>
            </Card.Body>
            <ButtonGroup className="d-flex justify-content-center">
                {(sessionUser.id && song.artistId === sessionUser.id) && <NavLink to={`/songs/${song.id}/delete`}>
                    <Button variant="danger" style={{}}>Delete Song</Button></NavLink>}
                {(sessionUser.id && song.artistId === sessionUser.id) && <NavLink to={`/songs/${song.id}/edit`}>
                    <Button variant="warning">Edit Song</Button></NavLink>}
            </ButtonGroup>
        </Card>
    )
}

export default SongCard
