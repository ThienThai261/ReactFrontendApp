import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import fetchWeatherData from '../components/WeatherAPI';

// Define the type for weather data
interface WeatherData {
    temperature: number;
    description: string;
    humidity: number;
    windSpeed: number;
    city: string;
}

const WeatherScreen: React.FC = () => {
    // State variables with proper types
    const [city, setCity] = useState<string>('');
    const [weather, setWeather] = useState<WeatherData | null>(null);  // Weather data or null
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);  // Error message or null

    // Event handler to fetch weather data
    const handleSearch = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchWeatherData(city);

            // Log the fetched data
            console.log('Fetched Weather Data:', data);

            if (data) {
                setWeather(data);
            } else {
                setError('Could not fetch weather data.');
            }
        } catch (err) {
            // Log any error that occurs during fetching
            console.error('Error during fetch:', err);
            setError('Error fetching weather data.');
        }

        setLoading(false);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Weather App</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter City"
                value={city}
                onChangeText={setCity}
            />

            <Button title="Get Weather" onPress={handleSearch}/>

            {loading && <Text>Loading...</Text>}

            {error && <Text style={styles.error}>{error}</Text>}

            {weather && (
                <View style={styles.weatherInfo}>
                    <Text>City: {weather.city}</Text>
                    <Text>Temperature: {weather.temperature}°C</Text>
                    <Text>Description: {weather.description}</Text>
                    <Text>Humidity: {weather.humidity}%</Text>
                    <Text>Wind Speed: {weather.windSpeed} m/s</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
    weatherInfo: {
        marginTop: 20,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default WeatherScreen;
