import './SongList.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllSongs } from '../../store/songsReducer'
import SongCard from '../SongCard/SongCard'
import { Button } from 'react-bootstrap'
import { Container, Row, Col } from 'react-bootstrap';
import { useMusicPlayer } from '../MusicPlayerContext/MusicPlayerContext'


const SongList = () => {
    const dispatch = useDispatch()
    const songsObj = useSelector(state => state.songReducer)
    const songsArr = Object.values(songsObj)
    const { myplaylist, setPlaylist } = useMusicPlayer()

    useEffect(() => {
        dispatch(loadAllSongs())
    }, [dispatch])

    useEffect(() => {
        if (JSON.stringify(myplaylist) !== JSON.stringify(songsArr)) {
            setPlaylist(songsArr);
        }
    }, [songsArr, myplaylist, setPlaylist]);

    return (
        // <div>
        //     <h1>All Songs</h1>
        //     <ul className='all-songs'>
        //         <div>
        //             {songsArr.map((song) => {
        //                 return (
        //                     <SongCard key={song.id} song={song} songId={song.id}></SongCard>
        //                 )
        //             })}
        //         </div>
        //     </ul>
        // </div>
        <div>
            <h1>All Songs</h1>
            <Container>
                <Row className="my-grid">
                    {songsArr.map((song, index) => {
                        return (
                            <SongCard className='col' key={song.id} song={song} songId={song.id} index={index}></SongCard>
                        )
                    })}
                </Row>
            </Container>
        </div>
    )
}

export default SongList
