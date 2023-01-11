import './SongCard.css'
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import EditSong from '../EditSong/EditSong';

const SongCard = ({ song }) => {
    const sessionUser = useSelector((state) => state.session.user);
    //  console.log(song.id)
    return (
        <div className='song-card'>
            <div>{song.artistId}</div>
            <div>{song.title}</div>
            <div>{song.description}</div>
            {sessionUser.id && <NavLink to={`/songs/${song.id}/delete`}>Delete Song</NavLink>}
            {/* {sessionUser.id && <EditSong song={song}/>} */}
            {sessionUser.id && <NavLink to={`/songs/${song.id}/edit`}>Edit Song</NavLink>}
        </div>
    )
}

export default SongCard
