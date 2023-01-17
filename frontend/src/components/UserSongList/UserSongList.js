import './UserSongList.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllUserSongs } from '../../store/userSongsReducer'
import SongCard from '../SongCard/SongCard'
import { Redirect } from "react-router-dom";

const UserSongList = () => {
    const dispatch = useDispatch()
    const songsObj = useSelector(state => state.userSongReducer)
    const songsArr = Object.values(songsObj)
    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(loadAllUserSongs())
    }, [dispatch])

    if (!sessionUser.id) {
        return <Redirect to="/login" />
    } else {
        return (
            <div>
                <h1>Your Songs</h1>
                <ul className='user-songs'>
                    <div>
                        {songsArr.map((song) => {
                            return (
                                <SongCard key={song.id} song={song} songId={song.id}></SongCard>
                            )
                        })}
                    </div>
                </ul>
            </div>
        )
    }
}

export default UserSongList
