import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL, API_KEY } from '../../globals'
import './ForecastList.css'
import rainyImage from '../../assets/rainy-1.svg'
import snowyImage from '../../assets/snowy-1.svg'
import thunderImage from '../../assets/thunder.svg'
import clearImage from '../../assets/day.svg'
import defaultImage from '../../assets/weather.svg'

const weatherIcons = {
  Rain: rainyImage,
  Snow: snowyImage,
  Thunderstorm: thunderImage,
  Clear: clearImage,
  default: defaultImage
}

const ForecastList = ({ city }) => {
  const [dailyForecasts, setDailyForecasts] = useState({})

  useEffect(() => {
    if (city) {
      const getForecastList = async () => {
        try {
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
                conditions: [forecast.weather[0].main],
                clearCondition: forecast.weather[0].main === 'Clear'
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
              acc[dateString].conditions.push(forecast.weather[0].main)
              if (forecast.weather[0].main === 'Clear') {
                acc[dateString].clearCondition = true
              }
            }
            return acc
          }, {})

          Object.keys(aggregatedByDay).forEach((date) => {
            if (aggregatedByDay[date].clearCondition) {
              aggregatedByDay[date].predominantCondition = 'Clear'
            } else {
              const conditionCounts = aggregatedByDay[date].conditions.reduce(
                (acc, condition) => {
                  acc[condition] = (acc[condition] || 0) + 1
                  return acc
                },
                {}
              )
              aggregatedByDay[date].predominantCondition = Object.keys(
                conditionCounts
              ).reduce((a, b) =>
                conditionCounts[a] > conditionCounts[b] ? a : b
              )
            }
          })

          setDailyForecasts(aggregatedByDay)
        } catch (error) {
          console.error('Error fetching forecast data', error)
        }
      }
      getForecastList()
    }
  }, [city])

  return (
    <div className="forecast">
      <div className="auto-grid-medium">
        <h2>Five Day Forecast</h2>
        {Object.keys(dailyForecasts).map((dateString) => {
          const dayData = dailyForecasts[dateString]
          const icon =
            weatherIcons[dayData.predominantCondition] || weatherIcons.default

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
