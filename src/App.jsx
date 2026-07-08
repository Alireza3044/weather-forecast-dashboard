import { useState } from "react"
import "./assets/css/app.css"
import getWeatherData from "./request"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

// TODO: Find a library to graph the data
// TODO: Implement the Temperature data return

function App() {
  const [forcastPlace, setForcastPlace] = useState("")
  const [forcastDays, setForcastDays] = useState(3)
  const [forcastType, setForcastType] = useState("Sky Condition")
  const [weatherData, setWeatherData] = useState([])
  const [loaded, setLoaded] = useState(false)

  async function getForcasts(e) {
    e.preventDefault()
    setWeatherData([])
    setLoaded(false)

    const data = await getWeatherData(forcastPlace, forcastDays)

    const datetimes = data.map(item => {
      // Local Time
      const dt = dayjs.utc(item.dt_txt).local().toString()
      return dt.substr(5, 7) + dt.substr(17, 5)
    })
    const temps = data.map(item => item.main.temp)
    const conditions = data.map(item => item.weather[0].main)

    let wData = []
    for (let i = 0; i < 24; i++) {
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
      <h1>Weather Forcast Dashboard</h1>
      <form onSubmit={getForcasts}>
        <div className="container">
          <label htmlFor="forcast-place">Place:</label>
          <input
            id="forcast-place"
            className="form-control"
            name="forcast-place"
            type="text"
            value={forcastPlace}
            onChange={e => setForcastPlace(e.target.value)} />
        </div>

        <div className="container">
          <label htmlFor="forcast-days">Forcast Days:</label>
          <span id="forcast-days-count">{forcastDays}</span>
          <input
            id="forcast-days"
            name="forcast-days"
            type="range"
            min={1}
            max={5}
            value={forcastDays}
            onChange={e => setForcastDays(+e.target.value)}
          />
        </div>

        <div className="container">
          <label htmlFor="forcast-type">Select Data:</label>
          <select
            name="forcast-type"
            id="forcast-type"
            value={forcastType}
            onChange={e => setForcastType(e.target.value)}
          >
            <option value="Sky Condition">Sky Condition</option>
            <option value="Temperature">Temperature</option>
          </select>
        </div>
      </form>
      {loaded && forcastPlace && (
        <h2>
          {`${forcastType} for the next ${forcastDays} day${forcastDays > 1 ? 's' : ''} in ${forcastPlace}:`}
        </h2>
      )}
      {loaded && forcastType === "Sky Condition" && weatherData && (
        <div className="weather-cards-container">
          {weatherData.map(weather => (
            <div className="weather-card" key={crypto.randomUUID()}>
              <img
                src={"src/assets/images/" + (weather.condition === "Clear" ? "clear.png"
                  : weather.condition === "Clouds" ? "clouds.png"
                    : weather.condition === "Rain" ? "rain.png"
                      : "snow.png"
                )}
                alt={"Condition of " + weather.condition}
              />
              <p>{weather.datetime}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default App
