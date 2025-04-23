import Image from 'next/image';
import React from 'react';

const HourlyForecast = ({ hourlyForecast }) => {
  if (!hourlyForecast || hourlyForecast.length === 0) {
    return <p className="text-white">Hourly forecast not available</p>;
  }
  
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-white">Hourly Forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {hourlyForecast.map((hour, index) => (
          <div key={index} className="bg-gray-800 bg-opacity-70 p-3 rounded-lg text-center">
            <p className="text-white">{new Date(hour.dt * 1000).getHours()}:00</p>
            {hour.weather[0]?.icon && (
              <Image 
                src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} 
                alt={hour.weather[0].description}
                width={50}
                height={50}
                className="mx-auto"
              />
            )}
            <p className="font-bold text-white">{Math.round(hour.temp)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;