import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArtistPageAlbum from '../../components/ArtistPageAlbum/ArtistPageAlbum';
import ArtistPageTrack from '../../components/ArtistPageTrack/ArtistPageTrack';
import styles from './ArtistPage.module.css';

function ArtistPage() {

    const [artist, setArtist] = useState();
    const [trackCount, setTrackCount] = useState(5);

    const [numAlbums, setNumAlbums] = useState(Math.floor(window.innerWidth / 210));
    const [width, setWidth] = useState((window.innerWidth - 10 * numAlbums) / numAlbums);

    const { id } = useParams();

    const navigate = useNavigate();

    const handleClick = () => {
        if (trackCount === 5) {
            setTrackCount(10);
        } else {
            setTrackCount(5);
        }
    }

    const handleBack = () => {
        console.log("Hello")
        navigate(-1);
    }

    const handleForward = () => {
        navigate(1);
    }

    const commaify = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(() => {
        // Fetch the aritst from Charlie's server :3
        fetch(`http://server.openmusic.app/artist?id=${id}`)
            .then(response => response.json())
            .then(data => {
                setArtist(data);
            })
            .catch(error => console.error('Error fetching artist:', error));

        const handleResize = () => {
            setNumAlbums(Math.floor(window.innerWidth / 210));
            setWidth((window.innerWidth - 10 * Math.floor(window.innerWidth / 210)) / Math.floor(window.innerWidth / 210));
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    if (artist) {
        return (
            <div className={styles.artist}>
                <button style={{ position: 'absolute', left: '10px', top: '30px', height: '25px'}} onClick={handleBack}>&lt;</button>
                <button style={{ position: 'absolute', left: '40px', top: '30px', height: '25px'}} onClick={handleForward}>&gt;</button>
                <div className={styles.artistHeader}>
                    <img src={`http://lh3.googleusercontent.com/${artist.Profile_Photo}`} className={styles.artistImage}/>
                    <h1>{artist.Name}</h1>
                    <h5>{commaify(artist.Subscribers)} subscribers</h5>
                </div>

                <h2>Popular</h2>
                <div>
                    {artist.Tracks.slice(0, trackCount).map((track, index) => (
                        <ArtistPageTrack track={track} index={index} />
                    ))}
                </div>
                <p onClick={() => {handleClick()}} className={styles.showMore}>{trackCount === 5 ? "Show more" : "Show less"}</p>

                <div className={styles.artistSectionHeader}>
                    <h2>Albums</h2>
                    <h4><Link to={`/artist/${artist.ArtistID}/albums`}>Show more</Link></h4>
                </div>
                <div className={styles.artistAlbums}>
                    {artist.Albums.slice(0, numAlbums).map((album, index) => (
                        <ArtistPageAlbum key={index} album={album} width={width}/>
                    ))}
                </div>

                <div className={styles.artistSectionHeader}>
                    <h2>Singles &amp; EPs</h2>
                    <h4><Link to={`/artist/${artist.ArtistID}/singles`}>Show more</Link></h4>
                </div>
                <div className={styles.artistSingles}>
                    {artist.Singles.slice(0, numAlbums).map((album, index) => (
                        <ArtistPageAlbum key={index} album={album} width={width}/>
                    ))}
                </div>
            </div>
        );
    } else {
        return <h2>Loading...</h2>
    }
}

export default ArtistPage;
