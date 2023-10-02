import axios from 'axios'

const api = axios.create({
  baseURL:
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata',
  params: {
    key: 'YOUR_API_KEY'
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
      error.response.data.message || 'Error fetching weather data'
    )
  }
}
