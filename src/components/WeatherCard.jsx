function WeatherCard({ weather }) {
  return (
    <div className="weather-card">
      <img
        src={"src/assets/images/" + (weather.condition === "Clear" ? "clear.png"
          : weather.condition === "Clouds" ? "clouds.png"
            : weather.condition === "Rain" ? "rain.png"
              : weather.condition === "Snow" ? "snow.png"
                : null
        )}
        alt={"Condition of " + weather.condition}
      />
      <p>{weather.datetime}</p>
    </div>
  )
}

export default WeatherCard
