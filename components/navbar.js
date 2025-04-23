import React from 'react';

const Navbar = ({ formattedTime, units, setUnits, isDayTime = true }) => {
  // Define color schemes for day and night
  const dayColors = {
    title: 'text-white',
    time: 'text-gray-300',
    buttonBorder: 'border-white',
    buttonText: 'text-white',
    buttonInactive: 'text-gray-300 hover:text-white'
  };
  
  const nightColors = {
    title: 'text-blue-100',
    time: 'text-blue-300',
    buttonBorder: 'border-blue-300',
    buttonText: 'text-blue-300',
    buttonInactive: 'text-gray-400 hover:text-blue-300'
  };
  
  // Select the appropriate color scheme
  const colors = isDayTime ? dayColors : nightColors;

  return (
    <header className="flex justify-between items-center mb-8">
      <div className="flex items-center">
        <h1 className={`text-3xl font-bold ${colors.title}`}>WeatherMe</h1>
        <p className={`ml-4 ${colors.time}`}>{formattedTime}</p>
      </div>
      <div className="flex space-x-4">
        <button 
          className={`px-4 py-2 transition-colors ${
            units === 'metric' 
              ? `border-b-2 ${colors.buttonBorder} ${colors.buttonText}` 
              : colors.buttonInactive
          }`}
          onClick={() => setUnits('metric')}
        >
          °C
        </button>
        <button 
          className={`px-4 py-2 transition-colors ${
            units === 'imperial' 
              ? `border-b-2 ${colors.buttonBorder} ${colors.buttonText}` 
              : colors.buttonInactive
          }`}
          onClick={() => setUnits('imperial')}
        >
          °F
        </button>
      </div>
    </header>
  );
};

export default Navbar;