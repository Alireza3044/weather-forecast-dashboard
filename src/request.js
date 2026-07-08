import axios from "axios"

const API_KEY = import.meta.env.VITE_API_KEY

async function getWeatherData(city, days) {
  const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  const response = await axios.get(URL)

  return response.data.list.slice(0, 8 * days)
}

export default getWeatherData
