import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ArtistPage.module.css';

function ArtistPage() {

    const [artist, setArtist] = useState();

    const { id } = useParams();

    useEffect(() => {
        // Fetch the shelves from Charlie's server :3
        fetch(`http://server.openmusic.app/artist?id=${id}`)
            .then(response => response.json())
            .then(data => {
                setArtist(data);

            })
            .catch(error => console.error('Error fetching albums:', error));
    }, []);

    if (artist) {
        return (
            <div>
                <p>Hello!!</p>
            </div>
        );
    } else {
        return <h2>Loading...</h2>
    }
}

export default ArtistPage;
