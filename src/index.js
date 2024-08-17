import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/defaultPage/App';
import HomePage from './pages/homePage/HomePage';
import ShelfPage from './pages/shelfPage/ShelfPage';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArtistPage from './pages/artistPage/ArtistPage';
import ArtistAlbumPage from './pages/artistAlbumPage/ArtistAlbumPage';
import AlbumPage from './pages/albumPage/AlbumPage';
import SearchPage from './pages/searchPage/SearchPage';
import PlayBar from './components/PlayBar/PlayBar';
import Padding from './components/Padding/Padding';
import { PlayBarProvider } from './contexts/PlayBarContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <PlayBarProvider>
            <Router>
                <PlayBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/explore/:id" element={<ShelfPage />} />
                    <Route path="/artist/:id" element={<ArtistPage />}/>
                    <Route path="/artist/:id/albums" element={<ArtistAlbumPage type={'albums'} />}/>
                    <Route path="/artist/:id/singles" element={<ArtistAlbumPage type={'singles'} />}/>
                    <Route path="/album/:id" element={<AlbumPage />} />
                    <Route path="/search" element={<SearchPage />}/>
                </Routes>
                <Padding />
            </Router>
        </PlayBarProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
