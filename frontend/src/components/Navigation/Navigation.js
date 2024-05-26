// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useModal } from '../context/Modal';
import LoginFormModal from '../LoginFormModal';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    let location = useLocation();
    const isActive = location.pathname === '/';

    let sessionLinks;

    const { setModalContent, closeModal } = useModal();
    const openLoginModal = () => {
        setModalContent(<LoginFormModal />);
      };

    if (sessionUser?.id) { //if sessionUser exists try to key into id, if not then move on '(sessionUser && sessionUser.id)'
        sessionLinks = (
            <>
                <Nav className="nav-links">
                    <Nav.Link><NavLink exact to="/songs" className='link' ><i class="fa-solid fa-music"></i> <span> Explore Songs</span></NavLink></Nav.Link>
                    <Nav.Link><NavLink exact to="/playlists/current" className='link' ><i class="fa-solid fa-list"></i> <span> My Playlists</span></NavLink></Nav.Link>
                    <Nav.Link><NavLink exact to="/songs/current" className='link' ><i class="fa-solid fa-play"></i> <span> My Songs</span></NavLink></Nav.Link>
                    <Nav.Link><NavLink exact to="/songs/create" className='link' ><i class="fa-solid fa-upload"></i> <span> Upload Song</span></NavLink></Nav.Link>
                    {isLoaded && (
                        <Nav.Link><ProfileButton user={sessionUser} /></Nav.Link>
                    )}
                </Nav>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <Nav className="nav-links">
                    <Nav.Link><NavLink exact to="/songs" className='link' ><i class="fa-solid fa-music"></i> <span> Explore Songs</span></NavLink></Nav.Link>
                    <Nav.Link as="button" onClick={openLoginModal} className='link'><i className="fa-solid fa-right-to-bracket"></i><span> Login</span></Nav.Link>
                    <Nav.Link><NavLink exact to="/signup" className='link' ><i class="fa-solid fa-user-plus"></i> <span> Sign Up</span></NavLink></Nav.Link>
                </Nav>
            </>
        );
    }

    return (
        <Navbar style={{ fontFamily: 'sans-serif', position: 'absolute', width: '100%', zIndex: '999' }} bg="dark" expand="lg">
            <Container>
                <Navbar.Brand as={NavLink} to="/" style={{ color: '#E6E6FA', fontSize: '36px' }} className={isActive ? 'active-brand-link' : 'brand-link'}><i class="fa-brands fa-soundcloud"></i></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {isLoaded && sessionLinks}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
