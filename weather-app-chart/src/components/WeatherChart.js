// src/components/WeatherChart.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    TimeScale
);

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

    const chartData = {
        labels: weatherData.hourly.data.map(hour => new Date(hour.date)),
        datasets: [
            {
                label: 'Temperature (°C)',
                data: weatherData.hourly.data.map(hour => hour.temperature),
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                yAxisID: 'y-temperature',
            },
            {
                label: 'Wind Speed (m/s)',
                data: weatherData.hourly.data.map(hour => hour.wind.speed),
                borderColor: 'rgba(192, 75, 75, 1)',
                fill: false,
                yAxisID: 'y-wind',
            },
            {
                label: 'Cloud Cover (%)',
                data: weatherData.hourly.data.map(hour => hour.cloud_cover.total),
                borderColor: 'rgba(75, 75, 192, 1)',
                fill: false,
                yAxisID: 'y-cloud',
            }
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'hour',
                },
                title: {
                    display: true,
                    text: 'Time',
                },
            },
            'y-temperature': {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Temperature (°C)',
                },
            },
            'y-wind': {
                type: 'linear',
                position: 'right',
                title: {
                    display: true,
                    text: 'Wind Speed (m/s)',
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
            'y-cloud': {
                type: 'linear',
                position: 'right',
                title: {
                    display: true,
                    text: 'Cloud Cover (%)',
                },
                grid: {
                    drawOnChartArea: false,
                },
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false,
        }
    };

    return (
        <div>
            <h2>Weather Data</h2>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default WeatherChart;
