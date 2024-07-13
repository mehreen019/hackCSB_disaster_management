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
const WindSpeedChart = ({ data }) => {
    const chartData = {
        labels: data.map(hour => new Date(hour.date)),
        datasets: [
            {
                label: 'Wind Speed (m/s)',
                data: data.map(hour => hour.wind.speed),
                borderColor: 'rgba(192, 75, 75, 1)',
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
                    text: 'Wind Speed (m/s)',
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
            <h2>Wind Speed Data</h2>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default WindSpeedChart;
