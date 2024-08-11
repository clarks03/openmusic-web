import React, { useState, useEffect } from "react";
import styles from "./SearchPage.module.css";
import SearchPageArtist from "../../components/SearchPageArtist/SearchPageArtist";
import SearchPageTrack from "../../components/SearchPageTrack/SearchPageTrack";
import { Link } from "react-router-dom";
import SearchPageAlbum from "../../components/SearchPageAlbum/SearchPageAlbum";

function SearchPage() {

    const [query, setQuery] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);

    const [search, setSearch] = useState(null);

    const [numAlbums, setNumAlbums] = useState(Math.floor(window.innerWidth / 210));
    const [width, setWidth] = useState((window.innerWidth - 10 * numAlbums) / numAlbums);


    useEffect(() => {
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

    useEffect(() => {
        if (query) {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }

            setTypingTimeout(
                setTimeout(() => {
                    // Make your server query here
                    const encodedQuery = encodeURIComponent(query);

                    fetch(`http://server.openmusic.app/search?q=${query}`)
                        .then(response => response.json())
                        .then(data => {
                            setSearch(data);
                        })

                    console.log('Querying the server with:', encodedQuery);
                }, 500)
            );
        }
    }, [query]);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };


    /* Tracks */
    let searchTracks;

    if (search) {
        searchTracks = (
            <div>
                <h2>Songs</h2>
                <div>
                    <Link to={`/album/${search.Tracks[0].Album.AlbumID}`}><SearchPageTrack track={search.Tracks[0]} /></Link>
                    <Link to={`/album/${search.Tracks[1].Album.AlbumID}`}><SearchPageTrack track={search.Tracks[1]} /></Link>
                    <Link to={`/album/${search.Tracks[2].Album.AlbumID}`}><SearchPageTrack track={search.Tracks[2]} /></Link>
                    <Link to={`/album/${search.Tracks[3].Album.AlbumID}`}><SearchPageTrack track={search.Tracks[3]} /></Link>
                    <Link to={`/album/${search.Tracks[4].Album.AlbumID}`}><SearchPageTrack track={search.Tracks[4]} /></Link>
                </div>
            </div>
        )
    } else {
        searchTracks = (<></>);
    }


    /* Artists */
    let searchArtists;

    if (search) {
        searchArtists = (
            <div>
                <h2>Artists</h2>
                <div className={styles.searchArtists}>
                    {search.Artists.slice(0, numAlbums).map((artist) => (
                        <SearchPageArtist artist={artist} width={width} />
                    ))}
                </div>
            </div>
        )

    } else {
        searchArtists = (<></>);
    }


    /* Albums */
    let searchAlbums;

    if (search) {
        searchAlbums = (
            <div>
                <h2>Albums</h2>
                <div className={styles.searchAlbums}>
                    {search.Albums.slice(0, numAlbums).map((album) => (
                        <Link to={`/album/${album.AlbumID}`}><SearchPageAlbum album={album} width={width} /></Link>
                    ))}
                    {/* <SearchPageAlbum album={search.Albums[0]} width={width} /> */}
                </div>
            </div>
        )
    } else {
        searchAlbums = (<></>);
    }

    

    return (
        <div>
            <input type="text" value={query} onChange={handleInputChange} placeholder="Search..."/>
            {searchTracks}
            {searchArtists}
            {searchAlbums}
        </div>
    );
}

export default SearchPage;
