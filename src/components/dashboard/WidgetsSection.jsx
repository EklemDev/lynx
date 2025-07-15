"use client"
import { FaPlus, FaSpotify, FaCreditCard } from "react-icons/fa"

export default function WidgetsSection({ weatherData }) {
  return (
    <div className="widgets-section">
      <h3>Widgets</h3>
      <div className="widgets-grid">
        <div className="widget-card weather-card">
          <div className="weather-info">
            <span className="temperature">{weatherData.temperature}</span>
            <span className="city">{weatherData.city}</span>
            <span className="condition">{weatherData.condition}</span>
          </div>
          <div className="weather-icon">{weatherData.icon}</div>
        </div>
        <div className="widget-card" onClick={() => console.log("Abrir Spotify")}>
          <FaSpotify />
          <span>Spotify</span>
        </div>
        <div className="widget-card" onClick={() => console.log("Abrir Cartão")}>
          <FaCreditCard />
          <span>Cartão</span>
        </div>
        <div className="widget-card add-widget" onClick={() => console.log("Adicionar Widget")}>
          <FaPlus />
          <span>Adicionar Widget</span>
        </div>
      </div>
    </div>
  )
}
