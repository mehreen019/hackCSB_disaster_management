// src/App.js

import React from 'react';
import './App.css';
import LocationSearch from './components/LocationSearch';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Weather Visualization</h1>
            </header>
            <main>
                <LocationSearch />
            </main>
        </div>
    );
}

export default App;
