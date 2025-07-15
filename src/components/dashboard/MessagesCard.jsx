"use client"
import { MoreHorizontal } from "lucide-react"
import dashboardStyles from "../../pages/Dashboard.module.css" // Importa o CSS Module do Dashboard

export default function MessagesCard({ messages }) {
  return (
    <div className={`${dashboardStyles.dashboardCard} ${dashboardStyles.messagesCard}`}>
      <div className={dashboardStyles.cardHeader}>
        <h3>Messages</h3>
        <button className={dashboardStyles.cardHeaderActionBtn}>
          <MoreHorizontal />
        </button>
      </div>
      <div className={dashboardStyles.messageList}>
        {messages.map((message) => (
          <div key={message.id} className={dashboardStyles.messageItem}>
            <img
              src={message.avatar || "/placeholder.svg"}
              alt={`${message.sender} Avatar`}
              className={dashboardStyles.messageAvatar}
            />
            <div className={dashboardStyles.messageContent}>
              <div className={dashboardStyles.messageSender}>{message.sender}</div>
              <div className={dashboardStyles.messageText}>{message.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
