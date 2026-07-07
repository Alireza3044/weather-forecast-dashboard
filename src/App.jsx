import "./assets/css/app.css"

function App() {
  return (
    <main>
      <h2>Weather Forcast Dashboard</h2>
      <div className="container">
        <label htmlFor="place">Place:</label>
        <input id="forcast-place" className="form-control" name="forcast-place" type="text" />
      </div>
      
      <div className="container">
        <label htmlFor="forcast-days">Forcast Days:</label>
        <input id="forcast-days" name="forcast-days" type="range" min={1} max={5} />
      </div>
      
      <div className="container">
        <label htmlFor="forcast-type">Select Data to View:</label>
        <select name="forcast-type" id="forcast-type">
          <option value="Sky Condition">Sky Condition</option>
          <option value="Temperature">Temperature</option>
        </select>
      </div>

      <h3>[type] for the next [days] day(s) in [place]</h3>
      <div></div>
    </main>
  )
}

export default App
