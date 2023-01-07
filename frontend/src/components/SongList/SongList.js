import './SongList.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllSongs } from '../../store/songs'
import SongCard from '../SongCard/SongCard'

const SongList = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch()
    const songsObj = useSelector(state => state.songReducer)
    const songsArr = Object.values(songsObj)
    // console.log(songsArr)
    useEffect(() => {
        dispatch(loadAllSongs()).then(() => setIsLoaded(true))
    }, [dispatch])
    return (
        <div>
            {songsArr.map((song) => {
                return (
                    <SongCard key={song.id} song={song}></SongCard>
                )
            })}
        </div>
    )
}

export default SongList
