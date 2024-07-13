// src/App.js

import React from 'react';
import './App.css';
import LocationSearch from './components/LocationSearch';
import SimpleMap from './components/BasicMap';
import MapWithClickableCustomMarkers from './components/MarkerMap';


function App() {
    return (
        <div className="App">
            <header>
                <h1>Weather Visualization</h1>
            </header>
            <main>
                <LocationSearch />
                <MapWithClickableCustomMarkers></MapWithClickableCustomMarkers>
            </main>
        </div>
    );
}

export default App;
