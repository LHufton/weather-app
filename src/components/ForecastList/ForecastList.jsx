import React from 'react'

const ForecastList = ({ forecasts, selectForecast }) => {
  return (
    <div className="forecast-list">
      {forecasts.map((forecast, index) => (
        <div
          key={index}
          className="forecast-item"
          onClick={() => selectForecast(forecast)}
        >
          <h3>{forecast.date}</h3>
          <p>Temperature: {forecast.temperature}°C</p>
          <p>Description: {forecast.description}</p>
          {/* Add more weather details if needed */}
        </div>
      ))}
    </div>
  )
}

export default ForecastList
