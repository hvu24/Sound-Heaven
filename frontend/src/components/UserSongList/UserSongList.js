import './UserSongList.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllUserSongs } from '../../store/userSongsReducer'
import SongCard from '../SongCard/SongCard'
import { Redirect } from "react-router-dom";
import EditSong from '../EditSong/EditSong'

const UserSongList = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch()
    const songsObj = useSelector(state => state.userSongReducer)
    const songsArr = Object.values(songsObj)
    // console.log(songsArr)
    const sessionUser = useSelector(state => state.session.user)
    useEffect(() => {
            dispatch(loadAllUserSongs()).then(() => setIsLoaded(true))
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    if (!sessionUser.id) {
        return <Redirect to="/login" />
    } else {
        return (
            <div>
                {songsArr.map((song) => {
                    return (
                        <>
                            <SongCard key={song.id} song={song}></SongCard>
                            {/* <form onSubmit={handleSubmit}>
                                <button type="submit">Edit Song</button>
                            </form> */}
                        </>
                    )
                })}
            </div>
        )
    }
}

export default UserSongList
