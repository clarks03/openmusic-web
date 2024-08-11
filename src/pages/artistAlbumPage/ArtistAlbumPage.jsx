import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArtistPageAlbum from "../../components/ArtistPageAlbum/ArtistPageAlbum";
import styles from './ArtistAlbumPage.module.css';

function ArtistAlbumPage({ type }) {

    const { id } = useParams();

    const [albums, setAlbums] = useState(null);
    const [numAlbums, setNumAlbums] = useState(Math.floor(window.innerWidth / 210));
    const [width, setWidth] = useState((window.innerWidth - 10 * numAlbums) / numAlbums);

    useEffect(() => {
        // Fetch the particular shelf from Charlie's server :3
        fetch(`http://server.openmusic.app/artist?id=${id}`)
            .then(response => response.json())
            .then(data => {
                let albumsArray;
                if (type === 'albums') {
                    albumsArray = Object.values(data.Albums);
                } else if (type === 'singles') {
                    albumsArray = Object.values(data.Singles);
                }
                setAlbums(albumsArray);

            })
            .catch(error => console.error('Error fetching albums:', error));

        // Resizing stuff
        const handleResize = () => {
            setNumAlbums(Math.floor(window.innerWidth / 210));
            setWidth((window.innerWidth - 10 * Math.floor(window.innerWidth / 210)) / Math.floor(window.innerWidth / 210));
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    if (albums && type === 'albums') {
        return (
            <div>
                <h2>Albums</h2>
                <div style={{display: 'grid', gridTemplateColumns: `repeat(${numAlbums}, 1fr)`}}>
                    {albums.map((album) => (
                        <ArtistPageAlbum album={album} width={width}/>
                    ))}
                </div>
            </div>
        );
    } else if (albums && type === 'singles'){
        return (
            <div>
                <h2>Singles</h2>
                <div style={{display: 'grid', gridTemplateColumns: `repeat(${numAlbums}, 1fr)`}}>
                    {albums.map((album) => (
                        <ArtistPageAlbum album={album} width={width}/>
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <h2>Loading...</h2>
        )
    }
}

export default ArtistAlbumPage;
