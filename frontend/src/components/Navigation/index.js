// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;

    if (sessionUser?.id) { //if sessionUser exists try to key into id, if not then move on '(sessionUser && sessionUser.id)'
        sessionLinks = (
            <>
                <ProfileButton user={sessionUser} />
                <NavLink to="/songs/current">My Songs</NavLink>
                <NavLink to="/songs/create">Create Song</NavLink>
                <NavLink to="/songs">All Songs</NavLink>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
                <NavLink to="/songs">All Songs</NavLink>
            </>
        );
    }

    return (
        <ul>
            <li>
                <NavLink exact to="/">Home</NavLink>
                {isLoaded && sessionLinks}
            </li>
        </ul>
    );
}

export default Navigation;
