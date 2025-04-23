import React from 'react';

const WeatherCard = ({ weatherData, units }) => {
  if (!weatherData) return null;
  
  return (
    <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 rounded-lg mb-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{weatherData.name} {weatherData.sys?.country && `(${weatherData.sys.country})`}</h2>
          <p className="text-sm text-gray-300">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </p>
        </div>
        
        <div className="flex items-center">
          <span className="text-5xl font-bold">{Math.round(weatherData.main.temp)}°{units === 'metric' ? 'C' : 'F'}</span>
          {weatherData.weather[0]?.icon && (
            <img 
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
              alt={weatherData.weather[0].description}
              width={80}
              height={80}
            />
          )}
        </div>
      </div>
      
      {/* Weather Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div>
          <p className="text-sm text-gray-300">HUMIDITY</p>
          <p className="font-bold">{weatherData.main.humidity}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-300">VISIBILITY</p>
          <p className="font-bold">{(weatherData.visibility / 1000).toFixed(0)}km</p>
        </div>
        <div>
          <p className="text-sm text-gray-300">AIR PRESSURE</p>
          <p className="font-bold">{weatherData.main.pressure}hPa</p>
        </div>
        <div>
          <p className="text-sm text-gray-300">WIND</p>
          <p className="font-bold">{Math.round(weatherData.wind.speed)} {units === 'metric' ? 'm/s' : 'mph'}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;