"use client"
import { FaPlus } from "react-icons/fa"

export default function InstalledAppsPanel() {
  return (
    <div className="dashboard-right-panel">
      <h3>Apps Instalados</h3>
      <div className="installed-apps-list">
        <button className="add-app-button-right" onClick={() => console.log("Adicionar novo app")}>
          <FaPlus /> Adicionar App
        </button>
      </div>
    </div>
  )
}
