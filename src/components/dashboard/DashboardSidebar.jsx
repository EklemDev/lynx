"use client"
import { FaAddressBook, FaServer, FaChartBar, FaUsers, FaSignOutAlt, FaCog } from "react-icons/fa"

export default function DashboardSidebar({ onLogout, onOpenSettings }) {
  return (
    <div className="dashboard-left-sidebar">
      <div className="sidebar-logo">
        <img src="/placeholder.svg?height=45&width=45" alt="Lynx" />
        <div className="logo-text">
          <span>Lynx</span>
          <small>v2.0</small>
        </div>
      </div>

      <nav className="main-navigation">
        <button className="nav-item" onClick={() => console.log("Contatos")}>
          <FaAddressBook />
          <span>Contatos</span>
        </button>
        <button className="nav-item" onClick={() => console.log("Servidores")}>
          <FaServer />
          <span>Servidores</span>
        </button>
        <button className="nav-item" onClick={() => console.log("Estatísticas")}>
          <FaChartBar />
          <span>Estatísticas</span>
        </button>
        <button className="nav-item" onClick={() => console.log("Abrir tela de Sessões")}>
          <FaUsers />
          <span>Sessões</span>
        </button>
      </nav>

      <div className="sidebar-bottom-nav">
        <button className="nav-item" onClick={onOpenSettings}>
          <FaCog />
          <span>Configurações</span>
        </button>
        <button className="nav-item" onClick={onLogout}>
          <FaSignOutAlt />
          <span>Sair</span>
        </button>
      </div>
    </div>
  )
}
