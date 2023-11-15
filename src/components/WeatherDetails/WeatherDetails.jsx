import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL, API_KEY } from '../../globals'

const WeatherDetails = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState('')

  // Function to convert Kelvin to Fahrenheit
  const kelvinToFahrenheit = (kelvin) => {
    return ((kelvin - 273.15) * 9) / 5 + 32
  }

  useEffect(() => {
    if (city) {
      const fetchWeatherData = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
              q: city,
              appid: API_KEY
              // Optionally, you can specify units here
              // units: 'imperial' for Fahrenheit
            }
          })
          setWeatherData(response.data)
          setError('')
        } catch (error) {
          setError('Failed to fetch weather data')
          console.error('Error fetching weather data:', error)
        }
      }
      fetchWeatherData()
    }
  }, [city])

  return (
    <div>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>Weather Details for {weatherData.name}</h2>
          <p>
            Temperature: {kelvinToFahrenheit(weatherData.main.temp).toFixed(2)}
            °F
          </p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  )
}

export default WeatherDetails
