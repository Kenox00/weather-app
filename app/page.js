"use client";

import React, { useState, useEffect } from 'react';
import { formatToLocalTime } from '../utils/dateUtils';
import Navbar from '../components/navbar';
import SearchBar from '../components/searchBar';
import WeatherCard from '../components/weatherCard';
import HourlyForecast from '../components/hourlyForecast';
import NearbyLocations from '../components/nearbyLocations';
import NavTabs from '../components/navTabs';

const Page = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [activeTab, setActiveTab] = useState('today');

  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  // Get user's geolocation on initial load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setCity('London'); // Fallback city
          fetchWeatherData();
          setLoading(false);
        }
      );
    } else {
      setCity('London'); // Fallback if geolocation not available
      fetchWeatherData();
      setLoading(false);
    }
  }, []);

  // Re-fetch data when units change
  useEffect(() => {
    if (weatherData && weatherData.coord) {
      fetchWeatherByCoords(weatherData.coord.lat, weatherData.coord.lon);
    }
  }, [units]);

  const fetchWeatherByCoords = async (lat, lon) => {
    if (!API_KEY) {
      setError('Please add your API key');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Fetch current weather
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      
      const data = await response.json();
      setWeatherData(data);
      setCity(data.name);
      
      // Fetch hourly forecast
      await fetchHourlyForecast(lat, lon);
      
      // Fetch nearby locations
      await fetchNearbyLocations(lat, lon);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherData = async () => {
    if (!API_KEY || !city) {
      setError('Please add your API key and city name');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      
      const data = await response.json();
      setWeatherData(data);
      
      // After getting weather data, fetch hourly forecast and nearby locations
      if (data.coord) {
        await fetchHourlyForecast(data.coord.lat, data.coord.lon);
        await fetchNearbyLocations(data.coord.lat, data.coord.lon);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch hourly forecast using OneCall API v3.0
  const fetchHourlyForecast = async (lat, lon) => {
    try {
      // Using 5-day forecast API instead, which is still free
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
      );
      
      if (!response.ok) {
        throw new Error('Hourly forecast data not available');
      }
      
      const data = await response.json();
      
      // Format the data to match what we need
      // This API returns forecasts in 3-hour intervals
      const next6Hours = data.list.slice(0, 6).map(item => ({
        dt: item.dt,
        temp: item.main.temp,
        weather: item.weather
      }));
      
      setHourlyForecast(next6Hours);
    } catch (err) {
      console.error("Error fetching hourly forecast:", err);
    }
  };

  // Fetch nearby locations using the Find API
  const fetchNearbyLocations = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=5&appid=${API_KEY}&units=${units}`
      );
      
      if (!response.ok) {
        throw new Error('Nearby locations data not available');
      }
      
      const data = await response.json();
      // Filter out the current location
      const nearby = data.list.filter(location => location.name !== city);
      setNearbyLocations(nearby);
    } catch (err) {
      console.error("Error fetching nearby locations:", err);
    }
  };

  // Get current time
  const currentTime = new Date();
  const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes().toString().padStart(2, '0')} ${currentTime.getHours() >= 12 ? 'pm' : 'am'}`;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4">
        <Navbar 
          formattedTime={formattedTime} 
          units={units} 
          setUnits={setUnits} 
        />
        
        <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <SearchBar 
          city={city} 
          setCity={setCity} 
          fetchWeatherData={fetchWeatherData} 
        />

        {loading && <p className="text-center text-xl">Loading weather data...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {activeTab === 'today' && !loading && !error && (
          <>
            <WeatherCard weatherData={weatherData} units={units} />
            
            <HourlyForecast hourlyForecast={hourlyForecast} />
            
            <NearbyLocations 
              nearbyLocations={nearbyLocations} 
              setCity={setCity}
              fetchWeatherData={fetchWeatherData}
            />
          </>
        )}
        
        {activeTab === 'tomorrow' && (
          <div className="text-center p-10">
            <p>Tomorrow&#39;s forecast will be implemented soon.</p>
          </div>
        )}
        
        {activeTab === 'monthly' && (
          <div className="text-center p-10">
            <p>Monthly forecast will be implemented soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;