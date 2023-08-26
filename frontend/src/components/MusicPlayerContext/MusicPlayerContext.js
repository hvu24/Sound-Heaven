import React, { createContext, useContext, useRef, useState } from 'react';

const MusicPlayerContext = createContext();

export const useMusicPlayer = () => useContext(MusicPlayerContext);

export const MusicPlayerProvider = ({ children }) => {
    const audioRef = useRef(null);
    const [currentSong, setCurrentSong] = useState(null);

    const playSong = (songUrl) => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
        audioRef.current = new Audio(songUrl);
        audioRef.current.play();
        setCurrentSong(songUrl);
    };

    const pauseSong = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setCurrentSong(null);
        }
    };

    return (
        <MusicPlayerContext.Provider value={{ playSong, pauseSong, currentSong }}>
            {children}
        </MusicPlayerContext.Provider>
    );
};
