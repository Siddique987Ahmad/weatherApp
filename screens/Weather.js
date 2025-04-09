import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = 'ea16cd69c67eafc3c5d0be954be9650a';

const Weather = ()=> {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLastCity = async () => {
      const lastCity = await AsyncStorage.getItem('lastCity');
      console.log('Last city from storage:', lastCity); // <--- Add this
      if (lastCity) {
        fetchWeather(lastCity);
      }
    };
    loadLastCity();
  }, []);
  //   const loadLastCity = async () => {
  //     const lastCity = await AsyncStorage.getItem('lastCity');
  //     if (lastCity) fetchWeather(lastCity);
  //   };

  const fetchWeather = async cityName => {
    console.log('Fetching weather for:', cityName); // <--- Add this
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`,
      );
      setWeather(response.data);
      console.log('API response:', response.data); // <--- Add this
      setCity('');
      await AsyncStorage.setItem('lastCity', cityName);
    } catch (err) {
      console.log('Fetch error:', err); // <--- Add this
      if (err.response?.status === 404) {
        setError('City not found');
      } else {
        setError('Failed to fetch data. Please check your internet.');
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
  //   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow'}}>
  //   <Text style={{fontSize: 24}}>Hello World</Text>
  // </View>
    <View style={[styles.container, {borderWidth: 2, borderColor: 'red'}]}>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => fetchWeather(city)}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#000" />}

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      {weather && (
        <View style={styles.weatherBox}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
          <Text>{weather.weather[0].main}</Text>
          <Image
            style={styles.weatherIcon}
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',  // Light background for better contrast
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      backgroundColor: '#fff',
      fontSize: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    button: {
      backgroundColor: '#1E90FF',
      padding: 15,
      borderRadius: 8,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    error: {
      color: '#ff3333',
      marginVertical: 15,
      textAlign: 'center',
      fontSize: 14,
    },
    weatherBox: {
      alignItems: 'center',
      marginTop: 30,
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 12,
      width: '90%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    city: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#333',
    },
    temp: {
      fontSize: 48,
      fontWeight: 'bold',
      marginVertical: 10,
      color: '#1E90FF',
    },
    weatherDescription: {
      fontSize: 18,
      color: '#666',
      marginBottom: 15,
      textTransform: 'capitalize',
    },
    weatherIcon: {
      width: 80,
      height: 80,
      marginVertical: 10,
    },
  });
export default Weather;
