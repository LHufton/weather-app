import React from 'react'

const WeatherDetails = ({ selectedForecast, setSelectedForecast }) => {
  if (!selectedForecast) {
    // Render nothing if there's no selected forecast
    return null
  }

  // Function to clear the selected forecast and show the list again
  const backToList = () => setSelectedForecast(null)

  return (
    <div className="weather-details">
      <button onClick={backToList}>Back to List</button>
      <h2>Weather Details for {selectedForecast.date}</h2>
      <p>Temperature: {selectedForecast.temperature}°C</p>
      <p>Description: {selectedForecast.description}</p>
      {/* Include more detailed information as required */}
    </div>
  )
}

export default WeatherDetails
