import './SongCard.css'
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { songDetails } from '../../store/songDetailsReducer';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Container, Row, Col, ButtonGroup } from 'react-bootstrap';

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
        // <div className='song-card'>
        //     {/* <div>Song Id: {song.id}</div>
        //     <div>Artist Id: {song.artistId}</div> */}
        //     <div>Artist Name: {artist.username}</div>
        //     <div>Title: {song.title}</div>
        //     <div>Description: {song.description}</div>
        //     {/* <div>Url: {song.url}</div>
        //     <div>Image Url: {song.imageUrl}</div> */}
        //     <NavLink to={`/songs/${song.id}/details`}>Song Details</NavLink>
        //     {(sessionUser.id && song.artistId === sessionUser.id) && <NavLink to={`/songs/${song.id}/delete`}>Delete Song</NavLink>}
        //     {(sessionUser.id && song.artistId === sessionUser.id) && <NavLink to={`/songs/${song.id}/edit`}>Edit Song</NavLink>}
        // </div>
        // <div class="card">
        //     <div class="card-header">
        //         Featured
        //     </div>
        //     <div class="card-body">
        //         <h5 class="card-title">Special title treatment</h5>
        //         <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        //         <a href="#" class="btn btn-primary">Go somewhere</a>
        //     </div>
        //     <div class="card-footer text-muted">
        //         2 days ago
        //     </div>
        // </div>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80" />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
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
