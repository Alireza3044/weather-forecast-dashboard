import WeatherCard from "./WeatherCard"

function WeatherContainer({ weatherData }) {
  console.log(weatherData.length)
  return (
    <div className="weather-container">
      {weatherData.map(weather => (
        <WeatherCard weather={weather} key={crypto.randomUUID()} />
      ))}
    </div>
  )
}

export default WeatherContainer
