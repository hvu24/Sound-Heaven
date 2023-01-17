import { csrfFetch } from './csrf';

export const loadSongs = (songs) => {
    return {
        type: 'LOAD_SONGS',
        songs
    }
}

export const loadAllSongs = () => async (dispatch) => {
    const response = await csrfFetch('/api/songs');
    if (response.ok) {
        const songsObj = await response.json();
        const songsArr = songsObj.songs
        dispatch(loadSongs(songsArr))
    }
};

export const deleteSongFromAll = (id) => {
    return {
        type: 'DELETE_SONG',
        id
    };
};

const initialState = {};

const songReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case 'DELETE_SONG':
            newState = { ...state }
            delete newState[action.id]
            return newState
        case 'LOAD_SONGS':
            newState = { ...state }
            action.songs.forEach(song => {
                newState[song.id] = song
            })
            return newState;
        default:
            return state;
    }
};

export default songReducer
