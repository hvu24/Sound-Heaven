import './PlaylistCard.css';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import EditPlaylistForm from '../UserPlaylistsList/EditPlaylistForm';
import { useDispatch } from 'react-redux';
import { deletePlaylist } from '../../store/userPlaylistsReducer';
import { NavLink } from 'react-router-dom';

const PlaylistCard = ({ playlist }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const dispatch = useDispatch();

    const handleEditClick = () => {
        setShowEditModal(true)
    };

    const handleCloseModal = () => {
        setShowEditModal(false)
    };

    const handleDeleteClick = () => {
        setShowDeleteConfirm(true)
    };

    const confirmDelete = () => {
        dispatch(deletePlaylist(playlist.id))
        setShowDeleteConfirm(false)
    };

    return (
        <div className="playlist-card">
            <h3>{playlist.name}</h3>
            <img src={playlist.imageUrl} alt={`${playlist.name} image`} />


            <NavLink to={`/playlists/${playlist.id}/details`}>
                <button className="details-button">Open Playlist</button>
            </NavLink>


            <button onClick={handleEditClick} className="edit-button">Edit Playlist</button>


            <button onClick={handleDeleteClick} className="playlist-delete-button">Delete Playlist</button>


            {showEditModal && (
                <Modal show={showEditModal} onHide={handleCloseModal}>
                    <EditPlaylistForm playlist={playlist} closeModal={handleCloseModal} />
                </Modal>
            )}


            {showDeleteConfirm && (
                <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete the playlist <strong>{playlist.name}</strong>?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>
                            Cancel
                        </button>
                        <button className="btn btn-danger" onClick={confirmDelete}>
                            Delete
                        </button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default PlaylistCard;
