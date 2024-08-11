import React from "react";
import styles from './SearchPageAlbum.module.css';

function SearchPageAlbum({ album, width }) {
    let albumID = album.AlbumID;
    let title = album.Title;
    let artwork = album.Artwork;
    let year = album.Year;
    let artists = album.Artists;

    return (
        <div className={styles.album}>
            <img src={`http://lh3.googleusercontent.com/${artwork}`} style={{width: `${width}px`, height: `${width}px`}}/>
            <p>{title}</p>
            <div className={styles.albumHoriz} style={{width: `${width}px`}}>
                <p>{year}</p>
                <p>-</p>
                {artists.map((artist) => (
                    <p>{artist.Name}</p>
                ))}
            </div>
        </div>
    )
}

export default SearchPageAlbum;
