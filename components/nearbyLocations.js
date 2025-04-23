import Image from 'next/image';
import React from 'react';

const NearbyLocations = ({ nearbyLocations, setCity, fetchWeatherData }) => {
  if (!nearbyLocations || nearbyLocations.length === 0) return null;
  
  return (
    <div>
      <h3 className="text-xl font-semibold mt-8 mb-4">Nearby Locations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nearbyLocations.map((location, index) => (
          <div 
            key={index} 
            className="bg-gray-800 p-4 rounded-lg cursor-pointer"
            onClick={() => {
              setCity(location.name);
              fetchWeatherData();
            }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">{location.name}</h4>
                <p className="text-sm text-gray-300">{location.sys.country}</p>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">{Math.round(location.main.temp)}°</span>
                {location.weather[0]?.icon && (
                  <Image 
                    src={`http://openweathermap.org/img/wn/${location.weather[0].icon}.png`} 
                    alt={location.weather[0].description}
                    width={50}
                    height={50}
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