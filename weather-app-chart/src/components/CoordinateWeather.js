import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ForecastTemperatureChart from './ForecastTemperatureChart';
import ForecastHumidityChart from './ForecastHumidityChart';
import ForecastRainChart from './ForecastRainChart';
import ForecastPressureChart from './ForecastPressureChart';
import ForecastWindSpeedChart from './ForecastWindSpeedChart';

// import TodaysTemperatureChart from './TodaysTemperatureChart';
// import TodaysHumidityChart from './TodaysHumidityChart';
// import TodaysPressureChart from './TodaysPressureChart';
// import TodaysRainChart from './TodaysRainChart';
// import TodaysWindSpeedChart from './TodaysWindSpeedChart';

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
        console.log('lat-lang data: ', data)
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

  const filterTodaysData = (hourlyData) => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const endOfDay = startOfDay + 24 * 60 * 60 * 1000;
    return {
      time: hourlyData.time.filter((t) => t.getTime() >= startOfDay && t.getTime() < endOfDay),
      temperature2m: hourlyData.temperature2m.filter((_, i) => hourlyData.time[i].getTime() >= startOfDay && hourlyData.time[i].getTime() < endOfDay),
      relativeHumidity2m: hourlyData.relativeHumidity2m.filter((_, i) => hourlyData.time[i].getTime() >= startOfDay && hourlyData.time[i].getTime() < endOfDay),
      rain: hourlyData.rain.filter((_, i) => hourlyData.time[i].getTime() >= startOfDay && hourlyData.time[i].getTime() < endOfDay),
      surfacePressure: hourlyData.surfacePressure.filter((_, i) => hourlyData.time[i].getTime() >= startOfDay && hourlyData.time[i].getTime() < endOfDay),
      windSpeed10m: hourlyData.windSpeed10m.filter((_, i) => hourlyData.time[i].getTime() >= startOfDay && hourlyData.time[i].getTime() < endOfDay),
    };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const todaysData = weatherData ? filterTodaysData(weatherData.hourly) : null;


  return (
    <div>
      <h2>Forecast Weather Data (7 Days)</h2>
      {weatherData && (
        <div>
          <ForecastTemperatureChart data={weatherData.hourly} />
          <ForecastHumidityChart data={weatherData.hourly} />
          <ForecastRainChart data={weatherData.hourly} />
          <ForecastPressureChart data={weatherData.hourly} />
          <ForecastWindSpeedChart data={weatherData.hourly} />
        </div>
      )}

    <h2>Today's Weather Data</h2>
      {weatherData && (
        <div>
          <ForecastTemperatureChart data={todaysData} />
          <ForecastHumidityChart data={todaysData} />
          <ForecastRainChart data={todaysData} />
          <ForecastPressureChart data={todaysData} />
          <ForecastWindSpeedChart data={todaysData} />
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
