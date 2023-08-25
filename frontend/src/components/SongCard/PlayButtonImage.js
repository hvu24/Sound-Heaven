import React, { useState, useRef } from 'react';
import './PlayButtonImage.css';

const PlayButtonImage = ({ imageUrl, songUrl }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        const audioElement = audioRef.current;

        if (!isPlaying) {
            audioElement.play();
        } else {
            audioElement.pause();
        }

        setIsPlaying(!isPlaying);
    };

    return (
        <div className="play-button-image-container">
            <img className="background-image" src={imageUrl} alt="Background" />
            <div className="play-button-overlay" onClick={togglePlay}>
                <div className={`play-button-icon ${isPlaying ? 'pause' : 'play'}`} />
            </div>
            <audio ref={audioRef} src={songUrl} />
        </div>
    );
};

const MusicControls = ({ isPlaying, onTogglePlay }) => {
    return (
        <div className="music-controls">
            <button onClick={onTogglePlay}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <input type="range" />
            {/* Add other music controls as needed */}
        </div>
    );
};

export default PlayButtonImage;
export { MusicControls };
