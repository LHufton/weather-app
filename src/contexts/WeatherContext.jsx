import { createContext, useContext, useState } from 'react'

// Create a context with a default value
export const WeatherContext = createContext() // <-- Add 'export' here

export const useWeather = () => useContext(WeatherContext)

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null)

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData }}>
      {children}
    </WeatherContext.Provider>
  )
}
