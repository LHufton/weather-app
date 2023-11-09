import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL, API_KEY } from './globals'
import ForecastList from './components/ForecastList/ForecastList'
import WeatherDetails from './components/WeatherDetails/WeatherDetails'

const App = () => {
  const [forecasts, setForecasts] = useState([])
  const [selectedForecast, setSelectedForecast] = useState(null)

  useEffect(() => {
    const getWeather = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/forecast?api_key=${API_KEY}&q=YOUR_QUERY_HERE`
        )
        setForecasts(response.data.forecasts)
      } catch (error) {
        console.error('Error fetching weather data', error)
      }
    }

    getWeather()
  }, [])

  const selectForecast = (forecastId) => {
    setSelectedForecast(forecastId)
  }

  let content = selectedForecast ? (
    <WeatherDetails
      setSelectedForecast={setSelectedForecast}
      selectedForecast={selectedForecast}
    />
  ) : (
    <ForecastList selectForecast={selectForecast} forecasts={forecasts} />
  )

  return <div className="App">{content}</div>
}

export default App
