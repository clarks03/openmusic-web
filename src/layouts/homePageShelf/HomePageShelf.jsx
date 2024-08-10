import React, { useState, useEffect } from 'react';
import HomePageAlbum from '../../components/HomePageAlbum/HomePageAlbum';
import styles from './HomePageShelf.module.css';

function HomePageShelf({ shelf }) {
    let title = shelf.Title
    let albums = shelf.Albums;

    const [numAlbums, setNumAlbums] = useState(Math.floor(window.innerWidth / 210));
    const [width, setWidth] = useState((window.innerWidth - 10 * numAlbums) / numAlbums);

    // I want the # of albums to be shown dependent on how many can fit on the screen.
    // Every album is 200px + 10px = 210px. 
    // The # of albums shown on screen at a time is equal to width of window // 210px.
    
    // This chunk of code should handle window resizing.
    useEffect(() => {
        const handleResize = () => {
            setNumAlbums(Math.floor(window.innerWidth / 210));
            setWidth((window.innerWidth - 10 * Math.floor(window.innerWidth / 210)) / Math.floor(window.innerWidth / 210));
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    // Now how do we make it so that the width of an album stretches to fill the width of the screen?
    // 4x + 40 = width, x = width - <num albums>10 / <num albums>.
    // This is handled above as well.

    return (
        <div className={styles.shelf}>
            <h2>{title}</h2>
            <div className={styles.shelfAlbums}>
                {albums.slice(0, numAlbums).map((album) => (
                    <HomePageAlbum album={album} width={width}/>
                ))}
            </div>
        </div>
    );
}

export default HomePageShelf;
