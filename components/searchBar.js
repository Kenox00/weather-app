import React from 'react';

const SearchBar = ({ city, setCity, fetchWeatherData }) => {
  return (
    <div className="mb-8">
      <div className="relative">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search location..."
          className="w-full p-3 pl-10 bg-gray-800 rounded-full"
          onKeyPress={(e) => e.key === 'Enter' && fetchWeatherData()}
        />
        <button 
          onClick={fetchWeatherData}
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
        >
          🔍
        </button>
      </div>
    </div>
  );
};

export default SearchBar;