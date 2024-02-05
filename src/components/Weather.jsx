import { useState } from "react";

const api = {
  key: "19be1a549ec91195a89d64b3f3322914",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const handleSearch = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  return (
    <>
      {/* Search Box  */}
      <div className="p-5 text-2xl">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Enter the location..."
          className="outline-none p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-purple-600 rounded-lg text-white text-base ml-2"
        >
          Search
        </button>
      </div>

      {weather.name && (
        <div className="p-5 text-xl bg-gray-100 rounded-md">
          <p className="text-2xl font-semibold">{weather.name}</p>

          <p className="text-3xl font-bold">
            {weather.main && weather.main.temp} °C
          </p>

          {weather.weather && (
            <div className="mt-2">
              <p className="capitalize">{weather.weather[0].description}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Weather;
