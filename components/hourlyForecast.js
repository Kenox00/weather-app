import Image from 'next/image';
import React from 'react';

const HourlyForecast = ({ hourlyForecast }) => {
  if (!hourlyForecast || hourlyForecast.length === 0) {
    return <p className="text-blue-100">Hourly forecast not available</p>;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-white">Hourly Forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {hourlyForecast.map((hour, index) => (
          <div
            key={index}
            className="bg-blue-500 bg-opacity-60 p-3 rounded-lg text-center shadow hover:bg-blue-400 transition duration-200"
          >
            <p className="text-sm text-white">{new Date(hour.dt * 1000).getHours()}:00</p>
            {hour.weather[0]?.icon && (
              <Image 
                src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} 
                alt={hour.weather[0].description}
                width={50}
                height={50}
                className="mx-auto"
              />
            )}
            <p className="font-bold text-white text-lg">{Math.round(hour.temp)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
