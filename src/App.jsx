import { useState } from "react"
import "./assets/css/app.css"

const API_KEY = import.meta.env.VITE_API_KEY

function App() {
  const [forcastPlace, setForcastPlace] = useState("")
  const [forcastDays, setForcastDays] = useState(3)
  const [forcastType, setForcastType] = useState("Sky Condition")

  function getForcasts(e) {
    e.preventDefault()
    console.log(e)
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
      {forcastPlace && (
        <h2>
          {`${forcastType} for the next ${forcastDays} day${forcastDays > 1 ? 's' : ''} in ${forcastPlace}:`}
        </h2>
      )}
      <div></div>
    </main>
  )
}

export default App
