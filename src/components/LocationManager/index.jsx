import React, { useContext } from 'react'
import { WeatherContext } from '../../contexts/WeatherContext'

const LocationManager = () => {
  const { savedLocations, setSavedLocations } = useContext(WeatherContext)

  const saveLocation = (location) => {
    setSavedLocations((prevLocations) => [...prevLocations, location])
  }

  return (
    <div className="location-manager-container">
      {/* ...rendering the saved locations... */}
    </div>
  )
}

export default LocationManager
