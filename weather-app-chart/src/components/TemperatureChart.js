
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
const TemperatureChart = ({ data }) => {
    const chartData = {
        labels: data.map(hour => new Date(hour.date)),
        datasets: [
            {
                label: 'Temperature (°C)',
                data: data.map(hour => hour.temperature),
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            },
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
            y: {
                title: {
                    display: true,
                    text: 'Temperature (°C)',
                },
            },
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
            <h2>Temperature Data</h2>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default TemperatureChart;
