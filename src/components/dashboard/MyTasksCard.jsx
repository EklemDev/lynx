"use client"
import { MoreHorizontal, Play, Circle } from "lucide-react"
import dashboardStyles from "../../pages/Dashboard.module.css" // Importa o CSS Module do Dashboard

export default function MyTasksCard({ tasks }) {
  return (
    <div className={`${dashboardStyles.dashboardCard} ${dashboardStyles.myTasksCard}`}>
      <div className={dashboardStyles.cardHeader}>
        <h3>My Tasks ({tasks.length})</h3>
        <button className={dashboardStyles.cardHeaderActionBtn}>
          <MoreHorizontal />
        </button>
      </div>
      <div className={dashboardStyles.taskList}>
        {tasks.map((task, index) => (
          <div key={task.id} className={dashboardStyles.taskItem}>
            <div className={dashboardStyles.taskDetails}>
              <span className={dashboardStyles.taskNumber}>{String(index + 1).padStart(2, "0")}</span>
              <span className={dashboardStyles.taskName}>{task.name}</span>
            </div>
            <div className={dashboardStyles.taskActions}>
              <button className={dashboardStyles.taskActionBtn}>
                <Play size={16} />
              </button>
              <button className={dashboardStyles.taskActionBtn}>
                <Circle size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
