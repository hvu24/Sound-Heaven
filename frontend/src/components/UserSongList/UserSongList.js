import './UserSongList.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllUserSongs } from '../../store/userSongsReducer'
import SongCard from '../SongCard/SongCard'
import { Redirect } from "react-router-dom"
import { useMusicPlayer } from '../MusicPlayerContext/MusicPlayerContext'
import { Container, Row, Col } from 'react-bootstrap'

const UserSongList = () => {
    const dispatch = useDispatch()
    const songsObj = useSelector(state => state.userSongReducer)
    const songsArr = Object.values(songsObj)
    const sessionUser = useSelector(state => state.session.user)
    const { myplaylist, setPlaylist } = useMusicPlayer()

    useEffect(() => {
        dispatch(loadAllUserSongs())
    }, [dispatch])

    useEffect(() => {
        if (JSON.stringify(myplaylist) !== JSON.stringify(songsArr)) {
            setPlaylist(songsArr)
        }
    }, [songsArr, myplaylist, setPlaylist])

    if (!sessionUser.id) {
        return <Redirect to="/login" />
    } else {
        return (
            <div className="user-song-list-container">
                <h1>Your Songs</h1>
                <Container className='my-songs'>
                    <Row className="my-grid">
                        {songsArr.map((song, index) => (
                            <SongCard
                                className='song-card'
                                key={song.id}
                                song={song}
                                songId={song.id}
                                index={index}
                                isMySongsPage={true}
                            />
                        ))}
                    </Row>
                </Container>
            </div>
        )
    }
}

export default UserSongList
