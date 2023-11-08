// api.jsx
import axios from 'axios'
import { BASE_URL, API_KEY } from '../globals'

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY
  }
})

export const fetchForecast = async (zipcode) => {
  try {
    const response = await api.get('/forecast', {
      params: { location: zipcode }
    })
    return response.data
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || 'Error fetching weather data'
    )
  }
}
