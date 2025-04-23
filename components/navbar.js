import React from 'react';

const Navbar = ({ formattedTime, units, setUnits }) => {
  return (
    <header className="flex justify-between items-center mb-8">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold">WeatherMe</h1>
        <p className="ml-4 text-gray-300">{formattedTime}</p>
      </div>
      <div className="flex space-x-4">
        <button 
          className={`px-4 py-2 ${units === 'metric' ? 'border-b-2 border-white' : ''}`}
          onClick={() => setUnits('metric')}
        >
          °C
        </button>
        <button 
          className={`px-4 py-2 ${units === 'imperial' ? 'border-b-2 border-white' : ''}`}
          onClick={() => setUnits('imperial')}
        >
          °F
        </button>
      </div>
    </header>
  );
};

export default Navbar;