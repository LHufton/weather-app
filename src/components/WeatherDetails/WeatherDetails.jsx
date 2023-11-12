import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL, API_KEY } from '../../globals'

const WeatherDetails = ({ selectedForecast, setSelectedForecast }) => {
  const [weatherDetails, setWeatherDetails] = useState({})

  useEffect(() => {
    if (selectedForecast && selectedForecast.lat && selectedForecast.lon) {
      const fetchWeatherDetails = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
              lat: selectedForecast.lat,
              lon: selectedForecast.lon,
              appid: API_KEY
            }
          })
          setWeatherDetails(response.data)
        } catch (error) {
          console.error('Error fetching detailed weather data', error)
        }
      }

      fetchWeatherDetails()
    }
  }, [selectedForecast])

  if (!selectedForecast) {
    return null
  }

  const backToList = () => setSelectedForecast(null)

  return (
    <div className="weather-details">
      <button onClick={backToList}>Back</button>
      <h2>Weather Details</h2>
      <p>Temperature: {weatherDetails.main?.temp}°C</p>
      <p>Description: {weatherDetails.weather?.[0]?.description}</p>
    </div>
  )
}

export default WeatherDetails
