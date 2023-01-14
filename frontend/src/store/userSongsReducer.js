import { csrfFetch } from './csrf';

export const loadUserSongs = (songs) => {
    return {
        type: 'LOAD_USER_SONGS',
        songs
    }
}

export const addSong = (song) => {
    return {
        type: 'CREATE_SONG',
        song,
    };
};

export const deleteSong = (id) => {
    return {
        type: 'DELETE_SONG',
        id
    };
};

export const editSong = (song) => {
    return {
        type: 'EDIT_SONG',
        song
    };
};

export const loadAllUserSongs = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/songs/current`);
        const songsObj = await response.json();
        const songsArr = songsObj.songs
        dispatch(loadUserSongs(songsArr))
    } catch (response) {
        if (!response.ok) {
            dispatch(loadUserSongs([]))
        }
    }
};

export const createSong = (song) => async (dispatch) => {
    const { title, description, url, imageUrl } = song;
    const albumId = null //included this line because backend expects an albumId but isn't required for project
    const response = await csrfFetch("/api/songs", {
        method: "POST",
        body: JSON.stringify({
            title, description, url, imageUrl, albumId
        }),
    });
    const data = await response.json();
    dispatch(addSong(data));
    return response;
};

export const removeSong = (songId) => async (dispatch) => {
    const response = await csrfFetch(`/api/songs/${songId}`, {
        method: 'DELETE',
    });
    dispatch(deleteSong(songId));
    return response;
};

export const updateSong = (song) => async (dispatch) => {
    const { songId, title, description, url, imageUrl } = song;
    const albumId = null //included this line because backend expects an albumId but isn't required for project
    const response = await csrfFetch(`/api/songs/${songId}`, {
        method: "PUT",
        body: JSON.stringify({
            title, description, url, imageUrl, albumId
        }),
    });
    const data = await response.json();
    console.log(data)
    dispatch(editSong(data));
    return response;
};

const initialState = {};

const userSongReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'DELETE_SONG':
            delete newState[action.id]
            return newState
        case 'LOAD_USER_SONGS':
            newState = {}
            if (action.songs.length > 0) {
                action.songs.forEach(song => {
                    newState[song.id] = song
                })
            }
            return newState;
        case 'CREATE_SONG':
            newState[action.song.id] = action.song
            return newState;
        case 'EDIT_SONG':
            newState[action.song.id] = action.song
            return newState;
        default:
            return state;
    }
};

export default userSongReducer
