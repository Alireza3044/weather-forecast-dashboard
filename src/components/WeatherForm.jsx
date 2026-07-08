function WeatherForm({ submitHandler, forecast, forecastChangeHandler }) {
  return (
    <form onSubmit={submitHandler}>
      <div className="container">
        <label htmlFor="forecast-place">Place:</label>
        <input
          id="forecast-place"
          className="form-control"
          name="place"
          type="text"
          value={forecast.place}
          onChange={forecastChangeHandler} />
      </div>

      <div className="container">
        <label htmlFor="forecast-days">Forecast Days:</label>
        <span id="forecast-days-count">{forecast.days}</span>
        <input
          id="forecast-days"
          name="days"
          type="range"
          min={1}
          max={5}
          value={forecast.days}
          onChange={forecastChangeHandler}
        />
      </div>

      <div className="container">
        <label htmlFor="forecast-type">Select Data:</label>
        <select
          id="forecast-type"
          name="type"
          value={forecast.type}
          onChange={forecastChangeHandler}
        >
          <option value="Sky Condition">Sky Condition</option>
          <option value="Temperature">Temperature</option>
        </select>
      </div>
    </form>
  )
}

export default WeatherForm