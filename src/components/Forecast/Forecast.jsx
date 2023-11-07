import React, { useContext, useEffect, useState } from 'react'
import { WeatherContext } from '../../contexts/WeatherContext'
import { fetchForecast } from '../../services/api'

const Forecast = () => {
  // const { forecastData, setForecastData, error, setError } =
  useContext(WeatherContext)
  const [zipcode, setZipcode] = useState('')

  const getForecast = async () => {
    try {
      const data = await fetchForecast(zipcode)
      setForecastData(data)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    if (zipcode) {
      getForecast()
    }
  }, [zipcode])

  return (
    <div className="forecast-container">
      {/* ...rendering the forecast data... */}
    </div>
  )
}

export default Forecast
