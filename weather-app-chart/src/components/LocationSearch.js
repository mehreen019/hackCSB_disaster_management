// src/components/LocationSearch.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherChart from './WeatherChart';

const LocationSearch = () => {
    const [location, setLocation] = useState('');
    const [placeId, setPlaceId] = useState(null);
    //setPlaceId('dhaka')
    useEffect(() => {
        setPlaceId('dhaka')
    },[]);

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/find_places', {
                params: {
                    text: location,
                    language: 'en',
                },
            });
            console.log("================")
            console.log(response.data)

            const place = response.data[0];
            console.log(place)
            console.log(place['place_id'])
            if (place) {
                setPlaceId(place['place_id']);
            } else {
                alert('Location not found');
            }
        } catch (error) {
            console.error('Error fetching place ID', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
            />
            <button onClick={handleSearch}>Search</button>
            {placeId && <div>{placeId}</div>}
            {placeId && <WeatherChart placeId={placeId} />}
        </div>
    );
};

export default LocationSearch;
