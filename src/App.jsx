import { useState } from "react"
import "./assets/css/app.css"
import TempChart from "./components/TempChart"
import WeatherContainer from "./components/WeatherContainer"
import WeatherForm from "./components/WeatherForm"
import getWeatherData from "./request"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

function App() {
  const [loaded, setLoaded] = useState(false)
  const [weatherData, setWeatherData] = useState([])
  const [forecast, setForecast] = useState({
    place: "",
    days: 3,
    type: "Sky Condition"
  })

  function forecastChangeHandler(e) {
    setForecast(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function getForecasts(e) {
    e.preventDefault()
    setWeatherData([])
    setLoaded(false)

    const data = await getWeatherData(forecast.place, forecast.days)

    const datetimes = data.map(item => {
      // Local Time
      const dt = dayjs.utc(item.dt_txt).local().toString()
      return dt.substr(5, 7) + dt.substr(17, 5)
    })
    const temps = data.map(item => item.main.temp)
    const conditions = data.map(item => item.weather[0].main)

    let wData = []
    for (let i = 0; i < forecast.days * 8; i++) {
      wData.push({
        "datetime": datetimes[i],
        "temp": temps[i],
        "condition": conditions[i]
      })
    }
    setWeatherData(wData)
    setLoaded(true)
  }

  return (
    <main>
      <h1>Weather Forecast Dashboard</h1>
      <WeatherForm
        submitHandler={getForecasts}
        forecast={forecast}
        forecastChangeHandler={forecastChangeHandler}
      />

      {loaded && weatherData && (
        forecast.type === "Sky Condition" ? (
          <>
            {forecast.place && (
              <h2>
                {`${forecast.type} for the next ${forecast.days} day${forecast.days > 1 ? 's' : ''} in ${forecast.place}:`}
              </h2>
            )}
            <WeatherContainer weatherData={weatherData} />
          </>
        ) : (
          <>
            <h2>Temperature in {forecast.place} for next {forecast.days} day{forecast.days > 1 ? "s" : ""}</h2>
            <TempChart weatherData={weatherData} />
          </>
        )
      )}
    </main>
  )
}

export default App
