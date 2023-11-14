import React, { useState } from 'react'
import axios from 'axios'
import { BASE_URL, API_KEY } from '../../globals'

const WeatherApp = () => {
  const [cityName, setCityName] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState('')

  const fetchWeatherData = async () => {
    try {
      console.log('Fetching weather data for:', cityName)
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: cityName,
          appid: API_KEY
        }
      })
      console.log(response.data)
      setWeatherData(response.data)
      setError('')
    } catch (error) {
      setError('Failed to fetch weather data')
      console.error('Error fetching weather data:', error)
    }
  }

  const handleSearch = () => {
    if (cityName.trim() !== '') {
      fetchWeatherData()
    }
  }

  return (
    <div>
      <input
        type="text"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Get Weather</button>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>Weather Details for {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°F</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  )
}

export default WeatherApp
