import './SongCard.css'
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';

const SongCard = ({ song }) => {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <div className='song-card'>
            <div>{song.artistId}</div>
            <div>{song.title}</div>
            <div>{song.description}</div>
            <NavLink to={`/songs/${song.id}/details`}>Song Details</NavLink>
            {(sessionUser.id && song.artistId === sessionUser.id) && <NavLink to={`/songs/${song.id}/delete`}>Delete Song</NavLink>}
            {(sessionUser.id && song.artistId === sessionUser.id) && <NavLink to={`/songs/${song.id}/edit`}>Edit Song</NavLink>}
        </div>
    )
}

export default SongCard
