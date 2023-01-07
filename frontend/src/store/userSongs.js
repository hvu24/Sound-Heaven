import { csrfFetch } from './csrf';

export const loadUserSongs = (songs) => {
    return {
        type: 'LOAD_USER_SONGS',
        songs
    }
}

export const loadAllUserSongs = () => async (dispatch) => {
    const response = await csrfFetch('/api/songs/current');
    if (response.ok) {
        const songsObj = await response.json();
        const songsArr = songsObj.songs
        dispatch(loadUserSongs(songsArr))
    }
};

const initialState = {};

const userSongReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'LOAD_USER_SONGS':
            action.songs.forEach(song => {
                newState[song.id] = song
            })
            return newState;
        default:
            return state;
    }
};

export default userSongReducer
