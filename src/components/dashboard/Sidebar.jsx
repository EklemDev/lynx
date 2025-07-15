"use client"
import { LayoutDashboard, Folder, ListTodo, Calendar, Clock, BarChart, Settings, LogOut } from "lucide-react"
import dashboardStyles from "../../pages/Dashboard.module.css" // Importa o CSS Module do Dashboard

export default function Sidebar({ onLogout, onOpenSettings }) {
  return (
    <div className={dashboardStyles.dashboardSidebar}>
      <div className={dashboardStyles.sidebarLogo}>
        <img src="/placeholder.svg?height=45&width=45" alt="Lynx" />
        <div className={dashboardStyles.logoText}>
          <span>Lynx</span>
          <small>v2.0</small>
        </div>
      </div>

      <nav className={dashboardStyles.sidebarNav}>
        <button className={`${dashboardStyles.sidebarNavItem} ${dashboardStyles.active}`}>
          <LayoutDashboard />
          <span>Dashboard</span>
        </button>
        <button className={dashboardStyles.sidebarNavItem}>
          <Folder />
          <span>Projects</span>
        </button>
        <button className={dashboardStyles.sidebarNavItem}>
          <ListTodo />
          <span>My Task</span>
        </button>
        <button className={dashboardStyles.sidebarNavItem}>
          <Calendar />
          <span>Calendar</span>
        </button>
        <button className={dashboardStyles.sidebarNavItem}>
          <Clock />
          <span>Time Manage</span>
        </button>
        <button className={dashboardStyles.sidebarNavItem}>
          <BarChart />
          <span>Reports</span>
        </button>
      </nav>

      <div className={dashboardStyles.sidebarBottomNav}>
        <button className={dashboardStyles.sidebarNavItem} onClick={onOpenSettings}>
          <Settings />
          <span>Settings</span>
        </button>
        <button className={dashboardStyles.sidebarNavItem} onClick={onLogout}>
          <LogOut />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  )
}
