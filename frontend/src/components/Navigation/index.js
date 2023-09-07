// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;

    if (sessionUser?.id) { //if sessionUser exists try to key into id, if not then move on '(sessionUser && sessionUser.id)'
        sessionLinks = (
            <>
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/playlists/current">My Playlists</NavLink>
                <NavLink to="/songs/current">My Songs</NavLink>
                <NavLink to="/songs/create">Create Song</NavLink>
                <NavLink to="/songs">All Songs</NavLink>
                <a href="https://www.linkedin.com/in/anthony-v-67a490214/">LinkedIn</a>
                <a href="https://github.com/hvu24">GitHub</a>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
                <NavLink to="/songs">All Songs</NavLink>
                <a href="https://www.linkedin.com/in/hung-v-67a490214/">LinkedIn</a>
                <a href="https://github.com/hvu24">GitHub</a>
            </>
        );
    }

    return (
        <ul>
            {(sessionUser.id && isLoaded) && <ProfileButton user={sessionUser} />}
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    {isLoaded && sessionLinks}
                </Container>
            </Navbar>
        </ul>
    );
}

export default Navigation;
