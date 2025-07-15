"use client"
import { FaSearch, FaArrowRight } from "react-icons/fa"

export default function BottomSearchBar({ serverCode, setServerCode, handleSearchServer }) {
  return (
    <div className="dashboard-bottom-bar">
      <div className="server-search-input-bottom">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Buscar servidor por código"
          value={serverCode}
          onChange={(e) => setServerCode(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearchServer()}
        />
        <button onClick={handleSearchServer} title="Buscar Servidor">
          <FaArrowRight />
        </button>
      </div>
    </div>
  )
}
