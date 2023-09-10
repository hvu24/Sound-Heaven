import './PlaylistCard.css'
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Container, Row, Col, ButtonGroup } from 'react-bootstrap';

const PlaylistCard = ({ playlist, playlistId }) => {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();


    return (
        <Card style={{ width: '25rem' }}>
            <Card.Body>
                <Card.Title>Playlist Name: {playlist.name}</Card.Title>
                <Card.Text>Playlist image url: {playlist.imageUrl}</Card.Text>
                <Card.Text>Playlist ID: {playlist.id}</Card.Text>
                <Card.Text>Playlist User ID: {playlist.userId}</Card.Text>
            </Card.Body>
            <ButtonGroup className="d-flex justify-content-center">
                <NavLink to={`/playlists/${playlistId}/details`}>
                    <Button variant="primary">Details</Button></NavLink>
            </ButtonGroup>
        </Card>
    )
}

export default PlaylistCard
