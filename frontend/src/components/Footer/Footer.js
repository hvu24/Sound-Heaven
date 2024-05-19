import React, { useState, useRef } from 'react';
import './Footer.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useMusicPlayer } from '../MusicPlayerContext/MusicPlayerContext';

const Footer = () => {
    const { songTitle,
        setSongTitle,
        myplaylist,
        trackIndex,
        setTrackIndex,
        setCurrentSong,
        currentSong
    } = useMusicPlayer();

    const handleClickNext = () => {
        const nextTrack = trackIndex < myplaylist.length - 1 ? trackIndex + 1 : 0
        setTrackIndex(nextTrack);
        setCurrentSong(myplaylist[nextTrack].url)
        setSongTitle(myplaylist[nextTrack].title)
    };

    const handleClickPrevious = () => {
        const prevTrack = trackIndex > 0 ? trackIndex - 1 : myplaylist.length - 1
        setTrackIndex(prevTrack);
        setCurrentSong(myplaylist[prevTrack].url)
        setSongTitle(myplaylist[prevTrack].title)
    };

    const handleEnd = () => {
        const nextTrack = trackIndex < myplaylist.length - 1 ? trackIndex + 1 : 0
        setTrackIndex(nextTrack);
        setCurrentSong(myplaylist[nextTrack].url)
        setSongTitle(myplaylist[nextTrack].title)
    }

    return (
        <div className='footer-container'>
            <footer>
                <a href='https://www.linkedin.com/in/anthony-v-67a490214/' target='_blank' className='footer-link'>
                    <i class="fa-brands fa-linkedin"></i>
                </a>
                <a href='https://github.com/hvu24' target='_blank' className='footer-link'>
                    <i class="fa-brands fa-github"></i>
                </a>
            </footer>
            <div className="audio-controls">
                <AudioPlayer
                    autoPlay={false}
                    src={currentSong}
                    customAdditionalControls={[]}
                    onPlay={e => console.log("onPlay")}
                    showSkipControls={true}
                    header={songTitle}
                    onClickPrevious={handleClickPrevious}
                    onClickNext={handleClickNext}
                    onEnded={handleEnd}
                />

            </div>
        </div>
    );
};

export default Footer;
