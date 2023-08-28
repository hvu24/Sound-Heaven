import React, { useState, useRef, useContext } from 'react';
import './PlayButtonImage.css';
import { useMusicPlayer } from '../MusicPlayerContext/MusicPlayerContext';

const PlayButtonImage = ({ imageUrl, songUrl, songTitle }) => {
    const { pauseSong, currentSong, playSong, setCurrentSong, setSongTitle } = useMusicPlayer();

    const isPlaying = songUrl === currentSong;

    // const togglePlay = () => {
    //     if (!isPlaying) {
    //         playSong(songUrl);
    //     } else {
    //         pauseSong();
    //     }
    // };
    const togglePlay = () => {
        if (!isPlaying) {
            setCurrentSong(songUrl);
            setSongTitle(songTitle)
        }
    };

    return (
        <div className="play-button-image-container">
            <img className="background-image" src={imageUrl} alt="Background" />
            <div className={`play-button-overlay ${isPlaying ? 'pause' : 'play'}`} onClick={togglePlay}>
                <div className={`play-button-icon ${isPlaying ? 'pause' : 'play'}`} />
            </div>
        </div>
    );
};

export default PlayButtonImage;
