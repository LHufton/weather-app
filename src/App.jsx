import './App.css'
import { useState } from 'react'
import ForecastList from './components/ForecastList/ForecastList'
import WeatherDetails from './components/WeatherDetails/WeatherDetails' // Correctly importing WeatherDetails

const App = () => {
  const [city, setCity] = useState('')
  const [inputValue, setInputValue] = useState('')

  const handleCitySearch = () => {
    setCity(inputValue)
  }

  return (
    <div className="App">
      <div className="search-bar">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter City"
        />
        <button onClick={handleCitySearch}>Get Weather</button>
      </div>
      <WeatherDetails city={city} />
      <ForecastList city={city} />
    </div>
  )
}

export default App
