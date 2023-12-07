import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL, API_KEY } from '../../globals'
import dayIcon from '../../assets/day.svg'
import nightIcon from '../../assets/night.svg'
import rainyImage from '../../assets/rainy-7.svg'
import snowyImage from '../../assets/snowy-1.svg'
import thunderImage from '../../assets/thunder.svg'
import cloudyImage from '../../assets/cloudy.svg'
import defaultImage from '../../assets/weather.svg'
import './WeatherDetails.css'

const weatherImages = {
  Rain: rainyImage,
  Snow: snowyImage,
  Thunderstorm: thunderImage,
  Clouds: cloudyImage,
  Clear: defaultImage,
  default: defaultImage
}

const WeatherDetails = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState('')
  const [weatherImage, setWeatherImage] = useState(defaultImage)
  const [dayNightImage, setDayNightImage] = useState(dayIcon)
  const [coordinates, setCoordinates] = useState(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude
          setCoordinates({ latitude, longitude })
        },
        (error) => {
          console.error('Error getting coordinates:', error)
        }
      )
    }
  }, [])

  useEffect(() => {
    if (coordinates) {
      const fetchWeatherData = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
              q: `${coordinates.latitude},${coordinates.longitude}`,
              appid: API_KEY
            }
          })

          const currentCondition = response.data.weather[0].main

          const kelvinToFahrenheit = (kelvin) => {
            return ((kelvin - 273.15) * 9) / 5 + 32
          }

          const updateWeatherImage = (condition, description) => {
            if (
              description.toLowerCase().includes('rain') ||
              description.toLowerCase().includes('drizzle')
            ) {
              setWeatherImage(rainyImage)
            } else if (description.toLowerCase().includes('snow')) {
              setWeatherImage(snowyImage)
            } else if (description.toLowerCase().includes('thunder')) {
              setWeatherImage(thunderImage)
            } else if (description.toLowerCase().includes('cloud')) {
              setWeatherImage(cloudyImage)
            } else {
              setWeatherImage(weatherImages[condition] || weatherImages.default)
            }
          }

          const updateDayNightImage = (data) => {
            const currentTime = new Date().getTime() / 1000
            const isDay =
              currentTime >= data.sys.sunrise && currentTime < data.sys.sunset
            setDayNightImage(isDay ? dayIcon : nightIcon)
          }

          setWeatherData(response.data)
          updateWeatherImage(
            currentCondition,
            response.data.weather[0].description
          )
          updateDayNightImage(response.data)
          setError('')
        } catch (error) {
          setError(
            'Failed to fetch weather data. Check your network or API key.'
          )
          console.error(error)
        }
      }

      fetchWeatherData()
    }
  }, [coordinates])

  return (
    <div>
      {error && <p>{error}</p>}
      {weatherData && (
        <div className="current-weather">
          <h2> Currently in {weatherData.name}</h2>
          <img src={weatherImage} alt="Weather condition" />
          <img
            src={dayNightImage}
            alt={dayNightImage === dayIcon ? 'Day' : 'Night'}
          />
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
