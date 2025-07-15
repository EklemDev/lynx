"use client"

import { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import ProjectCard from "./ProjectCard"
import MyTasksCard from "./MyTasksCard"
import CalendarCard from "./CalendarCard"
import TimeTrackingCard from "./TimeTrackingCard"
import MessagesCard from "./MessagesCard"
import dashboardStyles from "../../pages/Dashboard.module.css" // Importa o CSS Module do Dashboard

export default function DashboardLayout({ user, onLogout, onOpenSettings }) {
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar)
  }

  // Mock data for the dashboard cards
  const mockProjects = [
    {
      id: 1,
      name: "Google",
      company: "Google Inc.",
      logo: "/placeholder.svg?height=50&width=50",
      progress: 50,
      taskDone: 25,
      totalTasks: 50,
      priority: "HIGH",
      tags: ["IOS APP", "UI/UX"],
      members: [
        "/placeholder.svg?height=30&width=30",
        "/placeholder.svg?height=30&width=30",
        "/placeholder.svg?height=30&width=30",
        "/placeholder.svg?height=30&width=30",
      ],
      dueDate: "20 June",
    },
    {
      id: 2,
      name: "Slack",
      company: "Slack corporation",
      logo: "/placeholder.svg?height=50&width=50",
      progress: 100,
      taskDone: 30,
      totalTasks: 30,
      priority: "MEDIUM",
      tags: ["IOS APP", "ANDROID"],
      members: [
        "/placeholder.svg?height=30&width=30",
        "/placeholder.svg?height=30&width=30",
        "/placeholder.svg?height=30&width=30",
        "/placeholder.svg?height=30&width=30",
      ],
      dueDate: "20 June",
    },
  ]

  const mockTasks = [
    { id: 1, name: "Create wireframe" },
    { id: 2, name: "Slack Logo Design" },
    { id: 3, name: "Dashboard Design" },
    { id: 4, name: "Create wireframe" },
    { id: 5, name: "Google Logo Design" },
    { id: 6, name: "Slack Logo Design" },
    { id: 7, name: "Dashboard Design" },
  ]

  const mockTimeTracking = [
    { id: 1, company: "Google", task: "Create Wireframe", time: "25m 20s" },
    { id: 2, company: "Slack", task: "Slack logo design", time: "30m 0s" },
    { id: 3, company: "Slack", task: "Dashboard design", time: "30m 0s" },
    { id: 4, company: "Google", task: "Create Wireframe", time: "30m 0s" },
  ]

  const mockMessages = [
    {
      id: 1,
      sender: "John Doe",
      text: "Hi Angelina! How are you?",
      avatar: "/placeholder.svg?height=45&width=45",
    },
    {
      id: 2,
      sender: "Charmie",
      text: "Do you need that design?",
      avatar: "/placeholder.svg?height=45&width=45",
    },
    {
      id: 3,
      sender: "Jason Mandela",
      text: "What is the price of hourly...",
      avatar: "/placeholder.svg?height=45&width=45",
    },
    {
      id: 4,
      sender: "Charlie Chu",
      text: "Awesome!",
      avatar: "/placeholder.svg?height=45&width=45",
    },
  ]

  return (
    <div className={dashboardStyles.dashboardWrapper}>
      {!isMobile && <Sidebar onLogout={onLogout} onOpenSettings={onOpenSettings} />}
      {isMobile && (
        <Header
          user={user}
          onOpenSettings={onOpenSettings}
          onLogout={onLogout}
          toggleMobileSidebar={toggleMobileSidebar}
        />
      )}

      {showMobileSidebar && isMobile && (
        <div className={dashboardStyles.mobileMenuOverlay} onClick={toggleMobileSidebar}>
          <div className={dashboardStyles.mobileSidebar} onClick={(e) => e.stopPropagation()}>
            <Sidebar onLogout={onLogout} onOpenSettings={onOpenSettings} />
          </div>
        </div>
      )}

      {!isMobile && (
        <Header
          user={user}
          onOpenSettings={onOpenSettings}
          onLogout={onLogout}
          toggleMobileSidebar={toggleMobileSidebar}
        />
      )}

      <div className={dashboardStyles.dashboardContentGrid}>
        <ProjectCard project={mockProjects[0]} />
        <MyTasksCard tasks={mockTasks} />
        <CalendarCard />
        <ProjectCard project={mockProjects[1]} />
        <TimeTrackingCard items={mockTimeTracking} />
        <MessagesCard messages={mockMessages} />
      </div>
    </div>
  )
}
