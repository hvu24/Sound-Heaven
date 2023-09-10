import React, { useState, useRef } from 'react';
import './Footer.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useMusicPlayer } from '../MusicPlayerContext/MusicPlayerContext';

const Footer = () => {
    const { myplaylist, currentTrack, setTrackIndex } = useMusicPlayer();

    const handleClickNext = () => {
        console.log('click next')
        console.log('logging playlist from footer'+JSON.stringify(myplaylist))
        setTrackIndex((currentTrack) =>
            currentTrack < myplaylist.length - 1 ? currentTrack + 1 : 0
        );
    };

    const handleClickPrevious = () => {
        console.log('click previous')
        setTrackIndex((currentTrack) =>
            currentTrack > 0 ? currentTrack - 1 : myplaylist.length - 1
        );
    };

    const handleEnd = () => {
        console.log('end')
        setTrackIndex((currentTrack) =>
            currentTrack < myplaylist.length - 1 ? currentTrack + 1 : 0
        );
    }

    return (
        <div className="footer">
            <AudioPlayer
                autoPlay
                src={myplaylist[currentTrack]?.url}
                onPlay={e => console.log("onPlay")}
                showSkipControls={true}
                header={myplaylist[currentTrack]?.title}
                onClickPrevious={handleClickPrevious}
                onClickNext={handleClickNext}
                onEnded={handleEnd}
            />
        </div>
    );
};

export default Footer;
