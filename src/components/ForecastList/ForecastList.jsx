import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL, API_KEY } from '../../globals'

const ForecastList = () => {
  const [forecastList, setForecastList] = useState([])
  const [city, setCity] = useState('')
  const [inputValue, setInputValue] = useState('')

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
          setForecastList(response.data.list)
        } catch (error) {
          console.error('Error fetching forecast data', error)
        }
      }
      getForecastList()
    }
  }, [city])

  const handleSearch = () => {
    setCity(inputValue)
  }

  return (
    <div id="forecast">
      <div className="forecast-list">
        <h2>Look up your city</h2>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>

        {forecastList.map((forecast, index) => (
          <div key={index} className="forecast-item">
            <h3>{new Date(forecast.dt * 1000).toLocaleDateString()}</h3>
            <p>Temperature: {forecast.main.temp}°F</p>
            <p>Description: {forecast.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ForecastList
