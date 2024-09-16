import { csrfFetch } from './csrf'

export const playlistDetails = (playlistId) => async (dispatch) => {
    const response = await csrfFetch(`/api/playlists/${playlistId}`)

    if (response.ok) {
        const playlist = await response.json()
        dispatch(loadPlaylistDetails(playlist))
    }
}

export const loadPlaylistDetails = (playlist) => {
    return {
        type: 'LOAD_PLAYLIST_DETAILS',
        playlist
    }
}

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

export const removePlaylistSong = (songId, playlistId) => {
    return {
        type: 'REMOVE_PLAYLIST_SONG',
        songId,
        playlistId
    }
}

export const addSongToPlaylist = (data) => async (dispatch) => {
    const { songId, playlistId } = data
    console.log('logging songId' + songId)
    console.log('logging playlistId' + playlistId)

    const response = await csrfFetch(`api/playlists/${playlistId}/songs`, {
        method: "POST",
        body: JSON.stringify({
            songId
        })
    })

    if (response.ok) {
        const res = await response.json()
        console.log(res)

        dispatch(playlistDetails(playlistId))
    }
}

export const removeSongFromPlaylist = (data) => async (dispatch) => {
    const { songId, playlistId } = data
    console.log('logging songId ' + songId)
    console.log('logging playlistId ' + playlistId)

    const response = await csrfFetch(`/api/playlists/${playlistId}/songs/${songId}`, {
        method: "DELETE",
    })

    if (response.ok) {
        const res = await response.json()
        console.log(res)

        dispatch(playlistDetails(playlistId))
    }
}

export const loadAllUserPlaylists = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/playlists/current`)
        const playlistsObj = await response.json()
        const playlistsArr = playlistsObj.playlists
        dispatch(loadUserPlaylists(playlistsArr))
    } catch (response) {
        if (!response.ok) {
            dispatch(loadUserPlaylists([]))
        }
    }
}

const initialState = {}

const userPlaylistReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case 'LOAD_USER_PLAYLISTS':
            newState = {}
            if (action.playlists.length > 0) {
                action.playlists.forEach(playlist => {
                    newState[playlist.id] = playlist
                })
            }
            return newState

        case 'LOAD_PLAYLIST_DETAILS':
            newState[action.playlist.id] = action.playlist
            return newState

        case 'REMOVE_PLAYLIST_SONG':
            const updatedPlaylist = { ...newState[action.playlistId] }
            updatedPlaylist.Songs = updatedPlaylist.Songs.filter(song => song.id !== action.songId)
            newState[action.playlistId] = updatedPlaylist
            return newState

        default:
            return state
    }
}

export default userPlaylistReducer

