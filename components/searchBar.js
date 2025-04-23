import React from 'react';

const SearchBar = ({ city, setCity, fetchWeatherData, isDayTime = true }) => {
  // Define color schemes for day and night
  const dayColors = {
    background: 'bg-gray-800 bg-opacity-60',
    text: 'text-white',
    placeholder: 'placeholder-gray-300',
    iconColor: 'text-gray-300'
  };
  
  const nightColors = {
    background: 'bg-gray-900 bg-opacity-60',
    text: 'text-blue-50',
    placeholder: 'placeholder-blue-200 placeholder-opacity-60',
    iconColor: 'text-blue-300'
  };
  
  // Select the appropriate color scheme
  const colors = isDayTime ? dayColors : nightColors;

  return (
    <div className="mb-8 flex justify-center">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search location..."
          className={`w-full p-2 pl-9 ${colors.background} ${colors.text} ${colors.placeholder} rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isDayTime ? 'focus:ring-white' : 'focus:ring-blue-300'}`}
          onKeyPress={(e) => e.key === 'Enter' && fetchWeatherData()}
        />
        <button 
          onClick={fetchWeatherData}
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${colors.iconColor} hover:${isDayTime ? 'text-white' : 'text-blue-200'} transition-colors`}
          aria-label="Search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;