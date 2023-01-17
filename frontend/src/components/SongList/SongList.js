import './SongList.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllSongs } from '../../store/songsReducer'
import SongCard from '../SongCard/SongCard'

const SongList = () => {
    const dispatch = useDispatch()
    const songsObj = useSelector(state => state.songReducer)
    const songsArr = Object.values(songsObj)

    useEffect(() => {
        dispatch(loadAllSongs())
    }, [dispatch])

    return (
        <div>
            <h1>All Songs</h1>
            <ul className='all-songs'>
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

export default SongList
