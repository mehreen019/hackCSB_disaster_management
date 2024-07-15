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

const CurrentWindSpeedChart = ({ data }) => {
  const chartData = {
    labels: data.time,
    datasets: [
      {
        label: 'Wind Speed (m/s)',
        data: data.windSpeed10m,
        fill: false,
        borderColor: 'rgba(255,99,132,1)',
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
          tooltipFormat: 'PPpp',
          displayFormats: {
            hour: 'PP HH:mm',
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
            return `${label}: ${value}m/s at ${formattedTime}`;
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

export default CurrentWindSpeedChart;
