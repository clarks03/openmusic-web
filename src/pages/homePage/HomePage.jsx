import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import HomePageShelf from '../../layouts/homePageShelf/HomePageShelf';

function HomePage() {

    const [shelves, setShelves] = useState(null);

    useEffect(() => {
        // Fetch the shelves from Charlie's server :3
        fetch('http://server.openmusic.app/explore')
            .then(response => response.json())
            .then(data => {
                const shelvesArray = Object.values(data);
                setShelves(shelvesArray[0]);

            })
            .catch(error => console.error('Error fetching albums:', error));
    }, []);

    return (
        <div className={styles.main}>
            {shelves ? shelves.map((shelf) => (
                <HomePageShelf shelf={shelf} />
            )) : <></>}
        </div>
    )
}

export default HomePage;
