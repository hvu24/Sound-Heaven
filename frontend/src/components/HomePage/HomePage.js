import './HomePage.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllSongs } from '../../store/songsReducer'
import SongCard from '../SongCard/SongCard'
import { Button } from 'react-bootstrap'
import { Container, Row, Col } from 'react-bootstrap'
import { useMusicPlayer } from '../MusicPlayerContext/MusicPlayerContext'
import Carousel from 'react-bootstrap/Carousel'
// import ExampleCarouselImage from 'components/ExampleCarouselImage'


const HomePage = () => {
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
    }, [songsArr, myplaylist, setPlaylist])

    return (
        <div>
            <Container>

                    <Carousel>
                        {songsArr.map((song, index) => {
                            return (
                                <Carousel.Item key={song.id}>
                                    <div className="carousel-item-center">
                                        <SongCard className='col' song={song} songId={song.id} index={index}></SongCard>
                                    </div>
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                
                {/* <Row className="my-grid">
                    {songsArr.map((song, index) => {
                        return (
                            <SongCard className='col' key={song.id} song={song} songId={song.id} index={index}></SongCard>
                        )
                    })}
                </Row> */}
            </Container>
        </div>
    )
}

export default HomePage
