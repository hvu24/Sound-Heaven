import { csrfFetch } from './csrf';

export const loadSongDetails = (song) => {
    return {
        type: 'LOAD_SONG_DETAILS',
        song
    }
}

export const songDetails = (songId) => async (dispatch) => {
    const response = await csrfFetch(`/api/songs/${songId}`);
    if (response.ok) {
        const songObj = await response.json();
        dispatch(loadSongDetails(songObj));
    }
};

const initialState = {};

const songDetailsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'LOAD_SONG_DETAILS':
            newState[action.song.id] = action.song
            return newState;
        default:
            return state;
    }
};

export default songDetailsReducer
