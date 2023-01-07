import './SongCard.css'

const SongCard = ({ song }) => {
    // console.log(song)
    return (
        <div className='song-card'>
            <div>{song.artistId}</div>
            <div>{song.title}</div>
            <div>{song.description}</div>
        </div>
    )
}

export default SongCard
