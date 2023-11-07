import './App.css'
import { Route, Routes } from 'react-router-dom'
import Forecast from './components/Forecast/Forecast'
import LocationManager from './components/LocationManager/LocationManager'

const App = () => {
  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<Forecast />} />
          <Route path="/location" element={<LocationManager />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
