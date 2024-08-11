import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AlbumPageTrack from "../../components/AlbumPageTrack/AlbumPageTrack";
import styles from './AlbumPage.module.css';

function AlbumPage() {

    const [album, setAlbum] = useState(null);
    const [width, setWidth] = useState(window.innerWidth);

    const { id } = useParams();

    useEffect(() => {
        fetch(`http://server.openmusic.app/album?id=${id}`)
            .then(response => response.json())
            .then(data => {
                setAlbum(data); 
                console.log(data);
            });


        // Resizing stuff
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);


    if (album) {
        return (
            <div>
                <div className={styles.albumHeader}>
                    <div className={styles.albumHeaderArtwork}>
                        <img src={`http://lh3.googleusercontent.com/${album.Artwork}`}/>
                        <div className={styles.albumInfo}>
                            <p>{album.AlbumType}</p>
                            <h1 className={styles.albumTitle} style={{width: `${window.innerWidth - 300}px`}}>{album.Title}</h1>
                            <div className={styles.albumInfoCreator}>
                                <img src={`http://lh3.googleusercontent.com/${album.Artists[0].Profile_Photo}`}/>
                                <p style={{fontWeight: 'bold'}}><Link to={`/artist/${album.Artists[0].ArtistID}`}>{album.Artists[0].Name}</Link></p>
                                <p>•</p>
                                <p>{album.Year}</p>
                                <p>•</p>
                                <p>{album.Tracks.length} songs</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.albumTrackHeader}>
                    <p className={styles.albumTrackHeaderOne}>#</p>
                    <p className={styles.albumTrackHeaderTwo}>Title</p>
                    <p className={styles.albumTrackHeaderThree}>Plays</p>
                    <p className={styles.albumTrackHeaderFour}>Time</p>
                </div>
                <hr style={{border: '1px solid rgba(255,255,255,0.2)', borderBottom: 'none', marginTop: '0', paddingTop: '0', marginBottom: '30px'}} />
                <div>
                    {album.Tracks.map((track) => (
                        <AlbumPageTrack track={track} />
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <h2>Loading...</h2>
        );
    }
}

export default AlbumPage;
