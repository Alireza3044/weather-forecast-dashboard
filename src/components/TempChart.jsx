import { useEffect, useRef } from "react"
import { Chart } from "chart.js/auto"

function TempChart({ weatherData }) {
  const canvasRef = useRef(null)
  const chartInstanceRef = useRef(null)

  useEffect(() => {
    if (!weatherData?.length || !canvasRef.current) return

    const datetimes = weatherData.map(weather => weather.datetime)
    const temps = weatherData.map(weather => weather.temp)
    const rootStyles = getComputedStyle(document.documentElement)
    const primaryColor = rootStyles.getPropertyValue("--primary").trim()

    const chartConfig = {
      type: "line",
      data: {
        labels: datetimes,
        datasets: [{
          label: "Temperature",
          data: temps,
          borderColor: primaryColor || "#E53935"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }

    const ctx = canvasRef.current.getContext("2d")

    chartInstanceRef.current = new Chart(ctx, chartConfig)

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }
    }
  }, [weatherData])

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <canvas ref={canvasRef} id="temp-chart"></canvas>
    </div>
  )
}

export default TempChart
