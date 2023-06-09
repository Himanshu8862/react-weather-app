import './App.css';
import CurrentWeather from './components/current-weather/CurrentWeather';
import Search from './components/search/Search';
import { WeatherApiUrl, WeatherApiKey } from './api';
import { useState } from 'react';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)

  const handleOnSearchChange = (searchData) => {
    // console.log(searchData);
    const [lat, long] = searchData.value.split(" ")
    // console.log(lat, long);
    const currentWeatherFetch = fetch(`${WeatherApiUrl}/weather?lat=${lat}&lon=${long}&appid=${WeatherApiKey}&units=metric`)
    const forecastFetch = fetch(`${WeatherApiUrl}/forecast?lat=${lat}&lon=${long}&appid=${WeatherApiKey}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({city: searchData.label, ...weatherResponse});
        setForecast({city: searchData.label, ...forecastResponse});
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  console.log(currentWeather, forecast)

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
    </div>
  );
}

export default App;
