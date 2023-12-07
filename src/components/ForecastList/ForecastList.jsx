import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_KEY } from '../../globals'
import './ForecastList.css'
import rainyImage from '../../assets/rainy-7.svg'
import snowyImage from '../../assets/snowy-1.svg'
import thunderImage from '../../assets/thunder.svg'
import cloudyImage from '../../assets/cloudy.svg'
import dayImage from '../../assets/day.svg'

const weatherIcons = {
  Rain: rainyImage,
  Snow: snowyImage,
  Thunderstorm: thunderImage,
  Clouds: cloudyImage,
  Clear: dayImage,
  default: dayImage
}

const ForecastList = ({ city }) => {
  const [dailyForecasts, setDailyForecasts] = useState({})
  const [coordinates, setCoordinates] = useState(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude
          setCoordinates({ latitude, longitude })
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`)
        },
        (error) => {
          console.error('Error getting coordinates:', error)
          // You can handle the error here, e.g., show a message to the user.
        }
      )
    }
  }, [])

  useEffect(() => {
    const getForecastList = async () => {
      try {
        let response

        if (coordinates) {
          response = await axios.get(`/api/openweathermap/forecast`, {
            params: {
              lat: coordinates.latitude,
              lon: coordinates.longitude,
              appid: API_KEY,
              units: 'imperial'
            }
          })
        } else if (city) {
          response = await axios.get(`/api/openweathermap/forecast`, {
            params: {
              q: city,
              appid: API_KEY,
              units: 'imperial'
            }
          })
        }

        // Rest of your code to process the response and set dailyForecasts state
      } catch (error) {
        console.error('Error fetching forecast data:', error)
        // You can handle the error here, e.g., show a message to the user.
      }
    }

    getForecastList()
  }, [coordinates, city])

  return (
    <div className="forecast">
      <div className="auto-grid-small">{/* Render daily forecasts here */}</div>
    </div>
  )
}

export default ForecastList
