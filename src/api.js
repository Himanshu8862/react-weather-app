export const GeoApiUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
export const GeoApiOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': window.env.REACT_APP_GEODB_API_KEY,
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

export const WeatherApiUrl = "https://api.openweathermap.org/data/2.5"
export const WeatherApiKey = window.env.REACT_APP_OPEN_WEATHER_API_KEY