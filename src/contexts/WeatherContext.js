import React, { createContext, useState } from 'react'

export const WeatherContext = createContext()

export const WeatherProvider = ({ children }) => {
  const [forecastData, setForecastData] = useState(null)
  const [savedLocations, setSavedLocations] = useState([])
  const [error, setError] = useState(null)

  return (
    <WeatherContext.Provider
      value={{
        forecastData,
        setForecastData,
        savedLocations,
        setSavedLocations,
        error,
        setError
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}
