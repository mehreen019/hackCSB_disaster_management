import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CurrentTemperatureChart from './CurrentTemperatureChart';

const WeatherComponent = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const params = {
          latitude: lat,
          longitude: lon,
          current_weather: true,
          hourly: "temperature_2m,relative_humidity_2m,rain,surface_pressure,wind_speed_10m",
          timeformat: "unixtime"
        };
        const url = "https://api.open-meteo.com/v1/forecast";
        const response = await axios.get(url, { params });
        const data = processWeatherData(response.data);
        setWeatherData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (lat && lon) {
      fetchWeatherData();
    }
  }, [lat, lon]);

  const processWeatherData = (response) => {
    const utcOffsetSeconds = response.utc_offset_seconds;
    const current = response.current_weather;
    const hourly = response.hourly;

    const range = (start, stop, step) => Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    const weatherData = {
      current: {
        time: new Date((Number(current.time) + utcOffsetSeconds) * 1000),
        temperature2m: current.temperature,
        relativeHumidity2m: current.relative_humidity,
        apparentTemperature: current.apparent_temperature,
        isDay: current.is_day,
        precipitation: current.precipitation,
        rain: current.rain,
        cloudCover: current.cloud_cover,
        surfacePressure: current.surface_pressure,
        windSpeed10m: current.wind_speed,
        windDirection10m: current.wind_direction,
      },
      hourly: {
        time: hourly.time.map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        temperature2m: hourly.temperature_2m,
        relativeHumidity2m: hourly.relative_humidity_2m,
        rain: hourly.rain,
        surfacePressure: hourly.surface_pressure,
        windSpeed10m: hourly.wind_speed_10m,
      },
    };

    return weatherData;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Weather Data</h2>
      {weatherData && (
        <div>
          <h3>Current Weather:</h3>
          <CurrentTemperatureChart data={weatherData.hourly} />
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
