import React from "react";
import { Link } from "react-router-dom";
import styles from "./AlbumPageTrack.module.css";

function AlbumPageTrack({ track }) {

    let title = track.Title;
    let index = track.Index;
    let length = track.Length;
    let explicit = track.Playback_Explicit;
    let views = track.Views;
    let artists = track.Album.Artists.concat(track.Features);
    console.log(artists[0].Name);

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

    return (
        <div className={styles.track}>
            <p className={styles.columnOne}>{index}</p>
            <div className={styles.columnTwo}>
                <p>{title}</p>
                <div className={styles.columnTwoHoriz}>
                    {explicit ? <p>E</p> : <></>}
                    {artists.map((artist, index) => (
                        <p className={styles.trackArtist} key={index}><Link to={`/artist/${artist.ArtistID}`}>{artist.Name}</Link></p>
                    ))}
                </div>
            </div>
            <p className={styles.columnThree}>{commaify(views)}</p>
            <p className={styles.columnFour}>{secondsToTime(length)}</p>
        </div>
    )

}

export default AlbumPageTrack;
