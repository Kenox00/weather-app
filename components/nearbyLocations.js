import Image from 'next/image';
import React from 'react';

const NearbyLocations = ({ nearbyLocations, setCity, fetchWeatherData }) => {
  if (!nearbyLocations || nearbyLocations.length === 0) return null;

  return (
    <div>
      <h3 className="text-xl font-semibold mt-8 mb-4 text-white">Nearby Locations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nearbyLocations.map((location, index) => (
          <div 
            key={index} 
            className="bg-blue-500 bg-opacity-60 p-4 rounded-lg cursor-pointer hover:bg-blue-400 transition duration-200"
            onClick={() => {
              setCity(location.name);
              fetchWeatherData();
            }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-white">{location.name}</h4>
                <p className="text-sm text-blue-100">{location.sys.country}</p>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2 text-white">{Math.round(location.main.temp)}°</span>
                {location.weather[0]?.icon && (
                  <Image 
                    src={`http://openweathermap.org/img/wn/${location.weather[0].icon}.png`} 
                    alt={location.weather[0].description}
                    width={40}
                    height={40}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyLocations;
