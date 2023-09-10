import React, { createContext, useContext, useRef, useState } from 'react';

const MusicPlayerContext = createContext();

export const useMusicPlayer = () => useContext(MusicPlayerContext);

export const MusicPlayerProvider = ({ children }) => {

    const [currentSong, setCurrentSong] = useState(null);
    const [trackIndex, setTrackIndex] = useState(0)
    const [myplaylist, setPlaylist] = useState([])
    const [songTitle, setSongTitle] = useState('')

    return (
        <MusicPlayerContext.Provider value={{
            trackIndex,
            setTrackIndex,
            currentSong,
            setCurrentSong,
            myplaylist,
            setPlaylist,
            songTitle,
            setSongTitle
        }}>
            {children}
        </MusicPlayerContext.Provider>
    );
};
