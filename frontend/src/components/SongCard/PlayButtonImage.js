import React, { useState } from 'react';
import './PlayButtonImage.css'

const PlayButtonImage = ({ imageUrl, songUrl }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.createRef();

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

export default PlayButtonImage;
