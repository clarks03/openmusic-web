import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './ArtistPageTrack.module.css';

function ArtistPageTrack({ track, index }) {
    let title = track.Title;
    let isExplicit = track.Playback_Explicit;
    let length = track.Length;
    let views = track.Views;
    let album = track.Album;
    // let index = track.Index + 1;
    index++;

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

    const commaify = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    const navigate = useNavigate();

    return (
        <div className={styles.track} onClick={() => {navigate(`/album/${album.AlbumID}`)}}>
            <div className={styles.columnOne}>
                <p>{index}</p>
            </div>
            <div className={styles.columnTwo}>
                <img src={`http://lh3.googleusercontent.com/${album.Artwork}`} />
                <div className={styles.columnTwoTitle}>
                    <p>{title}</p>
                    {isExplicit ? <p className={styles.explicit}>E</p> : <></>} {/* Eventually this should be its own logo */}
                </div>
            </div>
            <div className={styles.columnThree}>
                <p>{commaify(views)}</p>
            </div>
            <div className={styles.columnFour}>
                <p>{secondsToTime(length)}</p>
            </div>
        </div>
    )

}

export default ArtistPageTrack;
