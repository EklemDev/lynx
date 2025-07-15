"use client"
import { Play, MoreHorizontal } from "lucide-react"
import dashboardStyles from "../../pages/Dashboard.module.css" // Importa o CSS Module do Dashboard

export default function TimeTrackingCard({ items }) {
  return (
    <div className={`${dashboardStyles.dashboardCard} ${dashboardStyles.timeTrackingCard}`}>
      <div className={dashboardStyles.cardHeader}>
        <h3>Time Tracking</h3>
        <button className={dashboardStyles.cardHeaderActionBtn}>
          <MoreHorizontal />
        </button>
      </div>
      <div className={dashboardStyles.timeTrackingList}>
        {items.map((item) => (
          <div key={item.id} className={dashboardStyles.timeTrackingItem}>
            <div className={dashboardStyles.timeTrackingDetails}>
              <span className={dashboardStyles.timeTrackingTaskName}>{item.task}</span>
              <span className={dashboardStyles.timeTrackingCompany}>{item.company}</span>
            </div>
            <div className={dashboardStyles.timeTrackingInfo}>
              <span className={dashboardStyles.timeElapsed}>{item.time}</span>
              <div className={dashboardStyles.timeTrackingActions}>
                <button className={dashboardStyles.timeTrackingActionBtn}>
                  <Play size={16} />
                </button>
                <button className={dashboardStyles.timeTrackingActionBtn}>
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
