import Image from 'next/image';
import React from 'react';

const HourlyForecast = ({ hourlyForecast }) => {
  if (!hourlyForecast || hourlyForecast.length === 0) return <p>Hourly forecast not available</p>;
  
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Hourly Forecast</h3>
      <div className="grid grid-cols-6 gap-2">
        {hourlyForecast.map((hour, index) => (
          <div key={index} className="bg-gray-800 p-3 rounded-lg text-center">
            <p>{new Date(hour.dt * 1000).getHours()}:00</p>
            {hour.weather[0]?.icon && (
              <Image 
                src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} 
                alt={hour.weather[0].description}
                width={50}
                height={50}
                className="mx-auto"
              />
            )}
            <p className="font-bold">{Math.round(hour.temp)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;