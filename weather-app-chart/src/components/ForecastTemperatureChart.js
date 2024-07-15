import React from 'react';
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
import { format } from 'date-fns';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale
);

const CurrentTemperatureChart = ({ data }) => {
  const chartData = {
    labels: data.time,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.temperature2m, // Ensure the property name matches
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
          tooltipFormat: 'PPpp', // Format for the tooltip
          displayFormats: {
            hour: 'PP HH:mm', // Format for the x-axis labels
          },
        },
      },
      y: {
        beginAtZero: false,
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
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.raw;
            const formattedTime = format(new Date(context.label), 'PP HH:mm');
            return `${label}: ${value}°C at ${formattedTime}`;
          }
        }
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    }
  };

  return <Line data={chartData} options={options} />;
};

export default CurrentTemperatureChart;
