import React, { useState, useRef } from 'react';
import './Footer.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useMusicPlayer } from '../MusicPlayerContext/MusicPlayerContext';

const Footer = () => {
    const { playSong, pauseSong, currentSong, songTitle } = useMusicPlayer();
    const ref = useRef(null)

    return (
        <div className="footer">
            <AudioPlayer
                autoPlay
                src={currentSong}
                onPlay={e => console.log("onPlay")}
                showSkipControls={false}
                header={songTitle}
            />
        </div>
    );
};

export default Footer;
