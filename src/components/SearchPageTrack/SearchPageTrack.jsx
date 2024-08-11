import React from "react";
import { Link } from "react-router-dom";
import styles from "./SearchPageTrack.module.css";

function SearchPageTrack({ track }) {

    let title = track.Title;
    let isExplicit = track.Playback_Explicit;
    let length = track.Length;
    let artists = track.Album.Artists;
    let artwork = track.Album.Artwork;

    const secondsToTime = (seconds) => {
        seconds--;
        let mins = Math.floor(seconds / 60);
        mins = "" + mins;
        let secs = seconds % 60;
        if (secs === 0) {
            secs = "00";
        } else if (secs < 10) {
            secs = "0" + secs;
        } else {
            secs = "" + secs;
        }

        return mins + ":" + secs;
    }
    

    return (
        <div className={styles.track}>
                <img className={styles.trackOne} src={`http://lh3.googleusercontent.com/${artwork}`} />
                <div className={styles.trackTwo}>
                    <p>{title}</p>
                    <div className={styles.trackTwoHoriz}>
                        {isExplicit ? <p style={{marginRight: '5px', color: '#fff'}}>E</p> : <></>}
                        {artists.map((artist) => (
                            <Link to={`/artist/${artist.ArtistID}`}><p>{artist.Name}</p></Link>
                        ))}
                    </div>
                </div>
            <p className={styles.trackThree}>{secondsToTime(length)}</p>
        </div>
    );
}

export default SearchPageTrack;
