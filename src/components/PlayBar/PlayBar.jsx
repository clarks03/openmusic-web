import React, { useContext, useEffect, useState } from "react";
import { PlayBarContext } from "../../contexts/PlayBarContext";
import styles from './PlayBar.module.css';

function PlayBar() {

    const { currentTrack } = useContext(PlayBarContext);
    const [rangeValue, setRangeValue] = useState(50);
    const [volumeIcon, setVolumeIcon] = useState("");
    const [muted, setMuted] = useState(false);

    const [playback, setPlayback] = useState(null);

    useEffect(() => {
        if (currentTrack) {
            let playbackID = (currentTrack.Playback_Clean) ? currentTrack.Playback_Clean : currentTrack.Playback_Explicit;
            fetch(`https://server.openmusic.app/playback?id=${playbackID}`)
                .then(response => response.json())
                .then(data => {
                    setPlayback(data);
                    console.log("Success!!");
                });
        }
    }, [currentTrack])

    const handleRangeChange = (event) => {
        setRangeValue(event.target.value);
    }

    useEffect(() => {
        if (rangeValue > 66) {
            setVolumeIcon("🔊");
        } else if (rangeValue > 33) {
            setVolumeIcon("🔉");
        } else if (rangeValue > 0) {
            setVolumeIcon("🔈");
        } else {
            setVolumeIcon("🔇");
        }
    }, [rangeValue]);

    useEffect(() => {
        if (muted) {
            setRangeValue(0) ;
        } else {
            setRangeValue(50);
        }
    }, [muted]);

    if (currentTrack) {
        return (
            <div className={styles.playBar}>
                <div className={styles.playBarLeft}>
                    <img src={`https://lh3.googleusercontent.com/${currentTrack.Album.Artwork}`}/>
                    <div className={styles.playBarLeftInfo}>
                        <p>{currentTrack.Title}</p>
                        <p>{currentTrack.Album.Artists[0].Name}</p>
                    </div>
                </div>
                <div className={styles.playBarMiddle}>
                    <div className={styles.playBarMiddleVert}>
                        <div className={styles.playBarMiddlePlayback}>
                            <button onClick={() => console.log('left')}>⏮</button>
                            <button onClick={() => console.log('play')}>►</button>
                            <button onClick={() => console.log('right')}>⏭</button>
                        </div>
                    </div>
                </div>
                <div className={styles.playBarRight}>
                    <button onClick={() => setMuted(!muted)}>{volumeIcon}</button>
                    <input id="rangeInput" type="range" min="0" max="100" value={rangeValue} onChange={handleRangeChange} />
                    
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.playBar}>
            </div>
        )
    }

}

export default PlayBar;
