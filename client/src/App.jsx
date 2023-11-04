import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL, API_KEY } from './globals'
import MovieList from './components/MovieList'
import MovieDetails from './components/MovieDetails'

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Switch>
          <Route exact path="/" component={Forecast} />
          <Route path="/locations" component={LocationManager} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
