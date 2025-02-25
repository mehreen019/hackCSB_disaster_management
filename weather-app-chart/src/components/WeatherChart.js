import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TemperatureChart from './TemperatureChart';
import WindSpeedChart from './WindSpeedChart';
import CloudCoverChart from './CloudCoverChart';
import './mapStyle.css'
import PrecipitationChart from './PrecipitationChart';

const WeatherChart = ({ placeId }) => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/point', {
                    params: {
                        place_id: placeId,
                        sections: 'all',
                        timezone: 'auto',
                        language: 'en',
                        units: 'metric',
                    },
                });

                setWeatherData(response.data);
                console.log("weather data in chart");
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching weather data', error);
            }
        };

        if (placeId) {
            fetchWeatherData();
        }
    }, [placeId]);

    if (!weatherData) return <div>Loading...</div>;

    const hourlyData = weatherData.hourly.data;

    const chartStyle = {
        // width: '600px',
        // height: '400px',
        // marginBottom: '20px'
    };

    return (
        <div>
            <h2>City Weather Data</h2>
            <h3> Current Summary : {weatherData.current.summary}</h3>
            <p>Temperature : {weatherData.current.temperature}</p>
            <p>Wind Speed : {weatherData.current.wind.speed}, {weatherData.current.wind.dir}</p>
            <p>Precipitation : {weatherData.current.precipitation.total}, {weatherData.current.precipitation.type} </p>


            <div className="tgrid-container">
            <div className="tchart-container"> <TemperatureChart data={hourlyData} /></div>
            <div className="tchart-container"> <WindSpeedChart data={hourlyData} /></div>
            <div className="tchart-container"> <CloudCoverChart data={hourlyData} /></div>
            <div className="tchart-container"> <PrecipitationChart data={hourlyData} /></div>
            
            </div>
            {/* <div style={chartStyle}>
                <TemperatureChart data={hourlyData} />
            </div>
            <div style={chartStyle}>
                <WindSpeedChart data={hourlyData} />
            </div>
            <div style={chartStyle}>
                <CloudCoverChart data={hourlyData} />
            </div> */}
        </div>
    );
};

export default WeatherChart;
