"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import dashboardStyles from "../../pages/Dashboard.module.css" // Importa o CSS Module do Dashboard

export default function CalendarCard() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2020, 1)) // Feb 2020 as per image

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const days = []

    // Add leading inactive days from previous month
    const firstDayOfWeek = firstDayOfMonth.getDay()
    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, 0 - (firstDayOfWeek - 1 - i))
      days.push({ date: prevMonthDay.getDate(), active: false })
    }

    // Add active days of current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push({ date: i, active: true })
    }

    // Add trailing inactive days from next month
    const totalCells = 6 * 7 // 6 weeks * 7 days
    const remainingCells = totalCells - days.length
    for (let i = 1; i <= remainingCells; i++) {
      days.push({ date: i, active: false })
    }

    return days
  }

  const days = getDaysInMonth(currentMonth)

  return (
    <div className={`${dashboardStyles.dashboardCard} ${dashboardStyles.calendarCard}`}>
      <div className={dashboardStyles.cardHeader}>
        <h3>{currentMonth.toLocaleString("en-US", { month: "short", year: "numeric" })}</h3>
        <div className={dashboardStyles.calendarNav}>
          <button>
            <ChevronLeft size={18} />
          </button>
          <button>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className={dashboardStyles.calendarGrid}>
        {daysOfWeek.map((day) => (
          <span key={day} className={dashboardStyles.calendarDayName}>
            {day}
          </span>
        ))}
        {days.map((day, index) => (
          <span
            key={index}
            className={`${dashboardStyles.calendarDate} ${!day.active ? dashboardStyles.inactive : ""} ${
              day.active && day.date === 5 ? dashboardStyles.selected : ""
            }`} // Highlight 5th as per image
          >
            {day.date}
          </span>
        ))}
      </div>
    </div>
  )
}
