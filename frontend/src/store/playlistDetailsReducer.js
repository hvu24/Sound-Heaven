import { csrfFetch } from './csrf';

export const loadPlaylistDetails = (playlist) => {
    return {
        type: 'LOAD_PLAYLIST_DETAILS',
        playlist
    }
}

export const playlistDetails = (playlistId) => async (dispatch) => {
    const response = await csrfFetch(`/api/playlists/${playlistId}`);
    if (response.ok) {
        const playlistObj = await response.json();
        dispatch(loadPlaylistDetails(playlistObj));
    }
};

const initialState = {};

const playlistDetailsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'LOAD_PLAYLIST_DETAILS':
            newState[action.playlist.id] = action.playlist
            return newState;
        default:
            return state;
    }
};

export default playlistDetailsReducer
