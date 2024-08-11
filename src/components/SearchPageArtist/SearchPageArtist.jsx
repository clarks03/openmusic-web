import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SearchPageArtist.module.css";

function SearchPageArtist({ artist, width }) {
    let artistID = artist.ArtistID;
    let name = artist.Name;
    let profilePhoto = artist.Profile_Photo;


    return (
        <div className={styles.artist}>
            <Link to={`/artist/${artistID}`}>
                <img src={`http://lh3.googleusercontent.com/${profilePhoto}`} style={{width: `${width}px`, height: `${width}px`, borderRadius: `${Math.round(width/2)}px`}}/>
                <p style={{textAlign: 'center'}}>{name}</p>
                <p style={{textAlign: 'center', color: '#aaa'}}>Artist</p>
            </Link>
        </div>
    )
}

export default SearchPageArtist;
