import './UserPlaylistsList.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllUserPlaylists } from '../../store/userPlaylistsReducer'
import PlaylistCard from '../PlaylistCard/PlaylistCard'
import { Redirect } from "react-router-dom";

const UserPlaylistsList = () => {
    const dispatch = useDispatch()
    const playlistsObj = useSelector(state => state.userPlaylistReducer)
    const playlistsArr = Object.values(playlistsObj)
    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(loadAllUserPlaylists())
    }, [dispatch])

    if (!sessionUser.id) {
        return <Redirect to="/login" />
    } else {
        return (
            <div>
                <h1>Your Playlists</h1>
                <ul className='user-playlists'>
                    <div>
                        {playlistsArr.map((playlist) => {
                            return (
                                <PlaylistCard key={playlist.id} playlist={playlist} playlistId={playlist.id}></PlaylistCard>
                            )
                        })}
                    </div>
                </ul>
            </div>
        )
    }
}

export default UserPlaylistsList
