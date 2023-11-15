import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL, API_KEY } from '../../globals'
import './ForecastList.css'

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

          // Aggregate forecasts by day
          const aggregatedByDay = response.data.list.reduce((acc, forecast) => {
            const dateObj = new Date(forecast.dt * 1000)
            const date = dateObj.toLocaleDateString()
            const day = dateObj.toLocaleDateString('en-US', { weekday: 'long' })

            const dateString = `${day}, ${date}`

            if (!acc[dateString]) {
              acc[dateString] = {
                min: forecast.main.temp_min,
                max: forecast.main.temp_max
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
            }
            return acc
          }, {})

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
        {Object.keys(dailyForecasts).map((dateString) => (
          <div key={dateString} className="forecast-day">
            <h3>{dateString}</h3>
            <p>High: {dailyForecasts[dateString].max.toFixed(2)}°F</p>
            <p>Low: {dailyForecasts[dateString].min.toFixed(2)}°F</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ForecastList
