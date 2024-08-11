import React from "react";
import { Link } from "react-router-dom";
import styles from './ArtistPageAlbum.module.css';

function ArtistPageAlbum({ album, width }) {

    let albumID = album.AlbumID;
    let title = album.Title;
    let artwork = album.Artwork;
    let albumType = album.AlbumType;
    let year = album.Year;
    let artists = album.Artists;

    return (
        <div className={styles.album}>
            <Link to={`/album/${albumID}`}>
                <img src={`http://lh3.googleusercontent.com/${artwork}`} style={{width: `${width}px`}}/>
                <p className={styles.albumTitle} style={{width: `${width - 10}px`}}>{title}</p>
                <div className={styles.albumInfo} style={{width: `${width}px`}}>
                    <p>{year}</p>
                    <p>•</p>
                    <p>{albumType}</p>
                </div>
            </Link>
        </div>
    )

}

export default ArtistPageAlbum;
