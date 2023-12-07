import './App.css'
import { useState } from 'react'
import ForecastList from './components/ForecastList/ForecastList'
import WeatherDetails from './components/WeatherDetails/WeatherDetails'

const App = () => {
  const [city, setCity] = useState('')
  const [inputValue, setInputValue] = useState('')

  const handleCitySearch = (e) => {
    e.preventDefault()
    setCity(inputValue)
  }

  return (
    <div className="App">
      <h2>Whatever the Weather</h2>
      <p>Check the weather forecast.</p>
      <form onSubmit={handleCitySearch} className="search-bar">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter City"
        />
        <button type="submit">Search</button>
      </form>
      <WeatherDetails city={city} />
      <ForecastList city={city} />
    </div>
  )
}

export default App
