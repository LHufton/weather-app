import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL, API_KEY } from '../../globals'
import './ForecastList.css'

const ForecastList = ({ city }) => {
  const [groupedForecasts, setGroupedForecasts] = useState({})

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

          // Group forecasts by day
          const groupedByDay = response.data.list.reduce((acc, forecast) => {
            const date = new Date(forecast.dt * 1000).toLocaleDateString()
            if (!acc[date]) {
              acc[date] = []
            }
            acc[date].push(forecast)
            return acc
          }, {})

          setGroupedForecasts(groupedByDay)
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
        {Object.keys(groupedForecasts).map((date) => (
          <div key={date} className="forecast-day">
            <h3>{date}</h3>
            {groupedForecasts[date].map((forecast, index) => (
              <div key={index} className="forecast-item">
                <p>Time: {new Date(forecast.dt * 1000).toLocaleTimeString()}</p>
                <p>Temperature: {forecast.main.temp}°F</p>
                <p>Feels Like: {forecast.main.feels_like}°F</p>
                <p>High: {forecast.main.temp_max}°F</p>
                <p>Low: {forecast.main.temp_min}°F</p>
                <p>Description: {forecast.weather[0].description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ForecastList
