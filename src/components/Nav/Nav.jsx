// Nav.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Today's Weather</Link>
        </li>
        <li>
          <Link to="/forecast">5-Day Forecast</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
