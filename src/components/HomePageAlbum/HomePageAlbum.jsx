import React from 'react';
import styles from './HomePageAlbum.module.css';

function HomePageAlbum({ album, width }) {
    let albumID = album.AlbumID;
    let title = album.Title;
    let artwork = `http://lh3.googleusercontent.com/${album.Artwork}`;
    let albumType = album.AlbumType;
    let year = album.Year;
    let artists = album.Artists;
    console.log(artists);

    return (
        <div className={styles.album} style={{width: `${width}px`}}>
            <div className={styles.albumArtwork}>
                <img src={artwork} alt="hello"/>
            </div>
            <div className={styles.albumInfoBackground} style={{backgroundImage: `url(${artwork})`, width: `${width}px`}}> 
                <div className={styles.albumInfo}>
                    <div className={styles.albumTitle} style={{width: `${width - 10}px`}}>
                        <p>{title}</p>
                    </div>
                    <div className={styles.albumArtists} style={{width: `${width - 10}px`}}>
                        {artists.map((artist, index) => (
                            <p key={index}>{artist.Name}</p>
                        ))}
                    </div>
                    <div className={styles.albumType}>
                        <p>{albumType}</p>
                        <p>{year}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePageAlbum;
