import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import HomePageAlbum from '../../components/HomePageAlbum/HomePageAlbum';
import styles from './ShelfPage.module.css';

function ShelfPage() {
    // let title = shelf.Title
    // let albums = shelf.Albums;
    const { id } = useParams();


    const [shelf, setShelf] = useState(null);
    const [numAlbums, setNumAlbums] = useState(Math.floor(window.innerWidth / 210));
    const [width, setWidth] = useState((window.innerWidth - 10 * numAlbums) / numAlbums);

    useEffect(() => {
        // Fetch the particular shelf from Charlie's server :3
        fetch('http://server.openmusic.app/explore')
            .then(response => response.json())
            .then(data => {
                const shelvesArray = Object.values(data);
                setShelf(shelvesArray[0][id]);

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

    
    // NOW, rather than only displaying <numAlbums> at a time,
    // we need a grid with numAlbums columns.

    if (shelf) {
        return (
            <div className={styles.shelf}>
                <div className={styles.shelfHeader}>
                    <h2 style={{marginBottom: '10px'}}>{shelf.Title}</h2>
                    <h4 style={{marginBottom: '0', marginRight: '10px'}}><Link to="/">Back</Link></h4>
                </div>
                <div className={styles.shelfAlbums} style={{display: `grid`, gridTemplateColumns: `repeat(${numAlbums}, 1fr)`}}>
                    {shelf.Albums.map((album) => (
                        <HomePageAlbum album={album} width={width}/>
                    ))}
                </div>
            </div>
        );
    } else {
        return <h2>Loading...</h2>
    }
}

export default ShelfPage;
