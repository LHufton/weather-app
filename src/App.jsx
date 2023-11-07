import './App.css'
import { Route, Routes } from 'react-router-dom'
import Forecast from './components/Forecast/Forecast'
import Location from './components/LocationManager/LocationManager'
import LocationManager from './components/LocationManager/LocationManager'

const App = () => {
  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<Forecast />} />
          <Route path="games/Details/:gameId" element={<LocationManager />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
