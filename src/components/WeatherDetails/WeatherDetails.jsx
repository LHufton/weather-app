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

const WeatherDetails = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState('')
  const [weatherImage, setWeatherImage] = useState(defaultImage)
  const [dayNightImage, setDayNightImage] = useState(dayIcon)

  useEffect(() => {
    if (city) {
      const fetchWeatherData = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
              q: city,
              appid: API_KEY
            }
          })
          setWeatherData(response.data)
          const currentCondition = response.data.weather[0].main
          updateWeatherImage(
            currentCondition,
            response.data.weather[0].description
          )
          updateDayNightImage(response.data)
          setError('')
        } catch (error) {
          setError('Failed to fetch weather data')
        }
      }
      fetchWeatherData()
    }
  }, [city])

  const kelvinToFahrenheit = (kelvin) => {
    return ((kelvin - 273.15) * 9) / 5 + 32
  }

  const updateWeatherImage = (condition, description) => {
    if (
      description.toLowerCase().includes('rain') ||
      description.toLowerCase().includes('drizzle')
    ) {
      setWeatherImage(rainyImage)
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

  return (
    <div>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>Weather right now in {weatherData.name}</h2>
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
