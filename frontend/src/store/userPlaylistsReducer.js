import { csrfFetch } from './csrf';

export const loadUserPlaylists = (playlists) => {
    return {
        type: 'LOAD_USER_PLAYLISTS',
        playlists
    }
}

export const addPlaylistSong = (song) => {
    return {
        type: 'ADD_PLAYLIST_SONG',
        song
    }
}

export const addSongToPlaylist = (data) => async (dispatch) => {
    const {songId, playlistId} = data
    console.log('logging songId' + songId)
    console.log('logging playlistId' + playlistId)
    const response = await csrfFetch(`api/playlists/${playlistId}/songs`, {
        method: "POST",
        body: JSON.stringify({
            songId
        })
    })
    const res = await response.json()
    console.log(res)
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
