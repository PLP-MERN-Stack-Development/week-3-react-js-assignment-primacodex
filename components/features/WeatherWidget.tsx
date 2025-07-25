"use client"

import { useState } from "react"
import { useApi } from "@/hooks/useApi"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import Loading from "@/components/ui/Loading"

export default function WeatherWidget() {
  const [city, setCity] = useState("London")
  const [searchCity, setSearchCity] = useState("")

  // Using a mock weather API endpoint
  const {
    data: weather,
    loading,
    error,
    refetch,
  } = useApi(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=demo&units=metric`, {
    fallbackData: {
      name: city,
      main: { temp: 22, feels_like: 25, humidity: 65 },
      weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
      wind: { speed: 3.5 },
    },
  })

  const handleSearch = () => {
    if (searchCity.trim()) {
      setCity(searchCity.trim())
      setSearchCity("")
      refetch()
    }
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Weather Search</h2>
        <div className="flex space-x-3">
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Enter city name..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={!searchCity.trim()}>
            Search
          </Button>
        </div>
      </Card>

      {/* Weather Display */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Weather</h2>

        {loading ? (
          <Loading text="Loading weather..." />
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">Error loading weather data</p>
            <p className="text-sm text-gray-500 mb-4">Note: This demo uses mock data since no API key is provided</p>
            <Button onClick={refetch}>Retry</Button>
          </div>
        ) : weather ? (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{weather.name}</h3>

            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="text-4xl">
                {weather.weather?.[0]?.main === "Clear"
                  ? "☀️"
                  : weather.weather?.[0]?.main === "Clouds"
                    ? "☁️"
                    : weather.weather?.[0]?.main === "Rain"
                      ? "🌧️"
                      : "🌤️"}
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{Math.round(weather.main?.temp || 22)}°C</div>
                <div className="text-gray-600 capitalize">{weather.weather?.[0]?.description || "clear sky"}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm text-gray-600">Feels like</div>
                <div className="font-semibold">{Math.round(weather.main?.feels_like || 25)}°C</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm text-gray-600">Humidity</div>
                <div className="font-semibold">{weather.main?.humidity || 65}%</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm text-gray-600">Wind</div>
                <div className="font-semibold">{weather.wind?.speed || 3.5} m/s</div>
              </div>
            </div>
          </div>
        ) : null}
      </Card>
    </div>
  )
}
