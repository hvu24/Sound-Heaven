import './ProfileButton.css'
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useModal } from '../context/Modal';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const { openModal } = useModal();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            // Close the menu if the click is outside of the menu
            if (!e.target.closest('.profile-dropdown') && !e.target.closest('.profile-button')) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout()).then(() => {
            openModal('login');
        });
    };

    return (
        <div className="profile-button-wrapper">
            <button onClick={openMenu} className="profile-button">
                <i className="fas fa-user-circle" />
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li className="dropdown-item">{user.username}</li>
                    <li className="dropdown-item">{user.email}</li>
                    <li className="dropdown-item">
                        <button onClick={logout} className="logout-button">Log Out</button>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default ProfileButton;
