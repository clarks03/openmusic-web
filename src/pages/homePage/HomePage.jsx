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

    if (shelves) {
        return (
            <div className={styles.main}>
                {shelves ? shelves.map((shelf, index) => (
                    <HomePageShelf shelf={shelf} index={index}/>
                )) : <></>}
            </div>
        );
    } else {
        return <h2>Loading...</h2>
    }
}

export default HomePage;
