"use client"
import { Search, Bell, Menu } from "lucide-react"
import dashboardStyles from "../../pages/Dashboard.module.css" // Importa o CSS Module do Dashboard

export default function Header({ user, onOpenSettings, onLogout, toggleMobileSidebar }) {
  return (
    <header className={dashboardStyles.dashboardHeader}>
      <button
        className={`${dashboardStyles.headerActionBtn} ${dashboardStyles.mobileMenuToggle}`}
        onClick={toggleMobileSidebar}
      >
        <Menu />
      </button>
      <div className={dashboardStyles.headerSearch}>
        <Search />
        <input type="text" placeholder="Search" />
      </div>
      <div className={dashboardStyles.headerActions}>
        <button className={dashboardStyles.headerActionBtn}>
          <Bell />
        </button>
        <img
          src={user?.photoURL || "/placeholder.svg?height=40&width=40"}
          alt="User Avatar"
          className={dashboardStyles.headerAvatar}
        />
      </div>
    </header>
  )
}
