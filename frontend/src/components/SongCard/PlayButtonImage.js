import React, { useState, useRef, useContext } from 'react';
import './PlayButtonImage.css';
import { useMusicPlayer } from '../MusicPlayerContext/MusicPlayerContext';

const PlayButtonImage = ({ imageUrl, songUrl }) => {
    const { playSong, pauseSong, currentSong } = useMusicPlayer();

    const isPlaying = songUrl === currentSong;

    const togglePlay = () => {
        if (!isPlaying) {
            playSong(songUrl);
        } else {
            pauseSong();
        }
    };

    return (
        <div className="play-button-image-container">
            <img className="background-image" src={imageUrl} alt="Background" />
            <div className="play-button-overlay" onClick={togglePlay}>
                <div className={`play-button-icon ${isPlaying ? 'pause' : 'play'}`} />
            </div>
            {/* <audio ref={audioRef} src={songUrl} /> */}
        </div>
    );
};

// const MusicControls = ({ isPlaying, onTogglePlay }) => {
//     return (
//         <div className="music-controls">
//             <button onClick={onTogglePlay}>
//                 {isPlaying ? 'Pause' : 'Play'}
//             </button>
//             <input type="range" />
//             {/* Add other music controls as needed */}
//         </div>
//     );
// };

export default PlayButtonImage;
// export { MusicControls };
