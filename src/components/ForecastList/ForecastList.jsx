import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL, API_KEY } from '../../globals'
import './ForecastList.css'
import rainyImage from '../../assets/rainy-7.svg'
import snowyImage from '../../assets/snowy-1.svg'
import thunderImage from '../../assets/thunder.svg'
import cloudyImage from '../../assets/cloudy.svg'
import weatherImage from '../../assets/weather.svg'
import dayImage from '../../assets/day.svg'

const weatherIcons = {
  Rain: rainyImage,
  Snow: snowyImage,
  Thunderstorm: thunderImage,
  Clouds: cloudyImage,
  Clear: dayImage,
  default: weatherImage
}

const ForecastList = ({ city }) => {
  const [dailyForecasts, setDailyForecasts] = useState({})

  useEffect(() => {
    if (city) {
      const getForecastList = async () => {
        const response = await axios.get(`${BASE_URL}/forecast`, {
          params: {
            q: city,
            appid: API_KEY,
            units: 'imperial'
          }
        })

        const aggregatedByDay = response.data.list.reduce((acc, forecast) => {
          const dateObj = new Date(forecast.dt * 1000)
          const date = dateObj.toLocaleDateString()
          const day = dateObj.toLocaleDateString('en-US', { weekday: 'long' })
          const dateString = `${day}, ${date}`

          if (!acc[dateString]) {
            acc[dateString] = {
              min: forecast.main.temp_min,
              max: forecast.main.temp_max,
              conditions: new Set([forecast.weather[0].main])
            }
          } else {
            acc[dateString].min = Math.min(
              acc[dateString].min,
              forecast.main.temp_min
            )
            acc[dateString].max = Math.max(
              acc[dateString].max,
              forecast.main.temp_max
            )
            acc[dateString].conditions.add(forecast.weather[0].main)
          }
          return acc
        }, {})

        Object.keys(aggregatedByDay).forEach((date) => {
          const conditionsArray = Array.from(aggregatedByDay[date].conditions)
          aggregatedByDay[date].predominantCondition = conditionsArray.includes(
            'Clear'
          )
            ? 'Clear'
            : conditionsArray[0]
        })

        setDailyForecasts(aggregatedByDay)
      }
      getForecastList()
    }
  }, [city])

  return (
    <div className="Forecast">
      <div className="auto-grid-medium">
        <h2>Five Day Forecast</h2>
        {Object.keys(dailyForecasts).map((dateString) => {
          const dayData = dailyForecasts[dateString]
          const icon = weatherIcons[dayData.predominantCondition]

          return (
            <div key={dateString} className="forecast-day">
              <h3>{dateString}</h3>
              <img src={icon} alt={dayData.predominantCondition} />
              <p>High: {dayData.max.toFixed(2)}°F</p>
              <p>Low: {dayData.min.toFixed(2)}°F</p>
              <p>Condition: {dayData.predominantCondition}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ForecastList
