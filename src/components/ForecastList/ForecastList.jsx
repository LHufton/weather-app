import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL, API_KEY } from '../../globals'
const ForecastList = () => {
  const [forecastList, setForecastList] = useState([])
  const [city, setCity] = useState('')

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
          setForecastList(response.data.list) // Adjust according to the actual structure of your API response
        } catch (error) {
          console.error('Error fetching forecast data', error)
        }
      }

      getForecastList()
    }
  }, [city])

  return (
    <div id="forecast">
      <div className="forecast-list">
        <h2>Look up your city</h2>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={() => setCity(city)}>Search</button>

        {forecastList.map((forecast, index) => (
          <div key={index} className="forecast-item">
            {/* Render your forecast data here */}
            <h3>{forecast.date}</h3>{' '}
            {/* Adjust based on actual data structure */}
            <p>Temperature: {forecast.temperature}°C</p>
            <p>Description: {forecast.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ForecastList
