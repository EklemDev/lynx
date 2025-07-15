"use client"
import { MoreHorizontal, CalendarDays } from "lucide-react"
import dashboardStyles from "../../pages/Dashboard.module.css" // Importa o CSS Module do Dashboard

export default function ProjectCard({ project }) {
  return (
    <div className={`${dashboardStyles.dashboardCard} ${dashboardStyles.projectCard}`}>
      <div className={dashboardStyles.cardHeader}>
        <div className={dashboardStyles.projectInfo}>
          <img
            src={project.logo || "/placeholder.svg"}
            alt={`${project.name} Logo`}
            className={dashboardStyles.projectLogo}
          />
          <div className={dashboardStyles.projectDetails}>
            <h4>{project.name}</h4>
            <p>{project.company}</p>
          </div>
        </div>
        <div className={dashboardStyles.cardHeaderActions}>
          <button className={dashboardStyles.statusBtn}>SELECT PROGRESS</button>
          <span className={dashboardStyles.projectPriority}>{project.priority}</span>
          <button className={dashboardStyles.cardHeaderActionBtn}>
            <MoreHorizontal />
          </button>
        </div>
      </div>

      <div className={dashboardStyles.projectProgressText}>
        Task Done: {project.taskDone} / {project.totalTasks}
      </div>
      <div className={dashboardStyles.progressBarContainer}>
        <div className={dashboardStyles.progressBar} style={{ width: `${project.progress}%` }}></div>
      </div>

      <div className={dashboardStyles.projectTags}>
        {project.tags.map((tag, index) => (
          <span key={index} className={dashboardStyles.projectTag}>
            {tag}
          </span>
        ))}
      </div>

      <div className={dashboardStyles.projectMembers}>
        {project.members.slice(0, 4).map((avatar, index) => (
          <img key={index} src={avatar || "/placeholder.svg"} alt="Member" className={dashboardStyles.memberAvatar} />
        ))}
        {project.members.length > 4 && <div className={dashboardStyles.memberCount}>+{project.members.length - 4}</div>}
      </div>

      <div className={dashboardStyles.projectDueDate}>
        <CalendarDays size={16} />
        <span>DUE DATE: {project.dueDate}</span>
      </div>
    </div>
  )
}
