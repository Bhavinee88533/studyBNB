import React from 'react';
import './FindHost.css';
import image from './assets/image.png';

const FindHost = () => {
  return (
    <div className="find-host-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Co-hosts near Faridabad, India"
          className="search-input"
        />
        <button className="search-button">Search
        </button>
      </div>

      <img src={image} alt="Map and Car" className="host-image" />

      <h2 className="host-title">No co-hosts nearby</h2>
      <p className="host-subtitle">
        Sign up to be notified if one becomes available.
      </p>

      <button className="notify-button">Notify me</button>
    </div>
  );
};

export default FindHost;
