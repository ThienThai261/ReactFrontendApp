import axios from 'axios';

// Set up your OpenWeatherMap API key
const API_KEY = 'df8415a0cbbcdf3af571bec191dcdad5';  // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Define the async function to fetch weather data
const fetchWeatherData = async (city) => {
    try {
        const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`; // Use metric for Celsius
        const response = await axios.get(url);
        console.log('API Response:', response.data);

        // Extract the necessary data
        const weatherData = {
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed,
            city: response.data.name,
        };

        return weatherData;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};

export default fetchWeatherData;
