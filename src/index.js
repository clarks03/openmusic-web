import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/defaultPage/App';
import HomePage from './pages/homePage/HomePage';
import ShelfPage from './pages/shelfPage/ShelfPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <HomePage /> */}
    <ShelfPage index={0}/>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
