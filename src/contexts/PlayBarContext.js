import React, { createContext, useState } from "react";

export const PlayBarContext = createContext();

export const PlayBarProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null);

    return (
        <PlayBarContext.Provider value={{ currentTrack, setCurrentTrack }}>
            {children}
        </PlayBarContext.Provider>
    );
};
