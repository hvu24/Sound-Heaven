import { csrfFetch } from './csrf';

export const loadUserPlaylists = (playlists) => {
    return {
        type: 'LOAD_USER_PLAYLISTS',
        playlists
    }
}

export const loadAllUserPlaylists = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/playlists/current`);
        const playlistsObj = await response.json();
        const playlistsArr = playlistsObj.playlists
        dispatch(loadUserPlaylists(playlistsArr))
    } catch (response) {
        if (!response.ok) {
            dispatch(loadUserPlaylists([]))
        }
    }
};

const initialState = {};

const userPlaylistReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'LOAD_USER_PLAYLISTS':
            newState = {}
            if (action.playlists.length > 0) {
                action.playlists.forEach(playlist => {
                    newState[playlist.id] = playlist
                })
            }
            return newState;
        default:
            return state;
    }
};

export default userPlaylistReducer
