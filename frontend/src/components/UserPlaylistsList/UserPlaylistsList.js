import './UserPlaylistsList.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllUserPlaylists, createPlaylist } from '../../store/userPlaylistsReducer';
import PlaylistCard from '../PlaylistCard/PlaylistCard';
import { Redirect } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';

const UserPlaylistsList = () => {
    const dispatch = useDispatch();
    const playlistsObj = useSelector(state => state.userPlaylistReducer);
    const playlistsArr = Object.values(playlistsObj);
    const sessionUser = useSelector(state => state.session.user);

    const [showModal, setShowModal] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [newPlaylistImage, setNewPlaylistImage] = useState('');

    useEffect(() => {
        dispatch(loadAllUserPlaylists());
    }, [dispatch]);

    const handleCreatePlaylist = () => {
        const playlistData = {
            name: newPlaylistName,
            imageUrl: newPlaylistImage
        };
        dispatch(createPlaylist(playlistData));
        setShowModal(false);
        setNewPlaylistName('');
        setNewPlaylistImage('');
    };

    if (!sessionUser.id) {
        return <Redirect to='/login' />;
    } else {
        return (
            <div className='playlists-page-wrapper'>
                <div className='playlists-page-container'>
                    <h1>Your Playlists</h1>

                    <Button onClick={() => setShowModal(true)} className='create-playlist-button'>
                        Create New Playlist
                    </Button>

                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create a New Playlist</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Playlist Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter playlist name'
                                        value={newPlaylistName}
                                        onChange={(e) => setNewPlaylistName(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Playlist Image URL</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter image URL (optional)'
                                        value={newPlaylistImage}
                                        onChange={(e) => setNewPlaylistImage(e.target.value)}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleCreatePlaylist}>
                                Create Playlist
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <div className='user-playlists-grid'>
                        {playlistsArr.map((playlist) => (
                            <PlaylistCard key={playlist.id} playlist={playlist} playlistId={playlist.id} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
};

export default UserPlaylistsList;
