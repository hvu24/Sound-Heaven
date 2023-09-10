import React, { createContext, useContext, useRef, useState } from 'react';

const MusicPlayerContext = createContext();

export const useMusicPlayer = () => useContext(MusicPlayerContext);

export const MusicPlayerProvider = ({ children }) => {
    // const audioRef = useRef(null);
    const [currentSong, setCurrentSong] = useState(null);
    const [currentTrack, setTrackIndex] = useState(0)
    const [songTitle, setSongTitle] = useState(null);
    const [myplaylist, setPlaylist] = useState([])

    // const playSong = (songUrl) => {
    //     if (audioRef.current) {
    //         audioRef.current.pause();
    //     }
    //     audioRef.current = new Audio(songUrl);
    //     audioRef.current.play();
    //     setCurrentSong(songUrl);
    // };

    // const pauseSong = () => {
    //     if (audioRef.current) {
    //         audioRef.current.pause();
    //         setCurrentSong(null);
    //     }
    // };

    return (
        <MusicPlayerContext.Provider value={{
            currentTrack,
            setTrackIndex,
            currentSong,
            setCurrentSong,
            setSongTitle,
            songTitle,
            myplaylist,
            setPlaylist
        }}>
            {children}
        </MusicPlayerContext.Provider>
    );
};
