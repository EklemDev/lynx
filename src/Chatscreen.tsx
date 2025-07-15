"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { addMessage, subscribeToMessages, type FirebaseMessage, startAutoCleanup } from "../lib/messageService"
import { uploadFile, validateFile } from "../lib/fileService"

interface Server {
  code: string
  name: string
  creator: string
  hasPassword: boolean
  password?: string
  createdAt: Date
}

interface User {
  name: string
  isCreator: boolean
}

interface ChatScreenProps {
  server: Server
  user: User
  onBackToHome: () => void
}

export default function ChatScreen({ server, user, onBackToHome }: ChatScreenProps) {
  const [messages, setMessages] = useState<FirebaseMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  // Auto scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Configurar Firebase listener e limpeza automática
  useEffect(() => {
    // Iniciar limpeza automática
    const stopCleanup = startAutoCleanup()

    // Escutar mensagens em tempo real
    const unsubscribe = subscribeToMessages(server.code, (firebaseMessages) => {
      setMessages(firebaseMessages)
    })

    return () => {
      unsubscribe()
      stopCleanup()
    }
  }, [server.code])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      await addMessage({
        serverCode: server.code,
        user: user.name,
        content: newMessage.trim(),
        type: "text",
      })

      setNewMessage("")
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
      alert("Erro ao enviar mensagem. Tente novamente.")
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validar arquivo
    const validation = validateFile(file)
    if (!validation.valid) {
      alert(validation.error)
      return
    }

    setIsUploading(true)
    setUploadProgress("Preparando upload...")

    try {
      setUploadProgress("Fazendo upload do arquivo...")
      const uploadResult = await uploadFile(file)

      setUploadProgress("Enviando mensagem...")
      await addMessage({
        serverCode: server.code,
        user: user.name,
        content: `Enviou um arquivo: ${uploadResult.fileName}`,
        type: uploadResult.type,
        fileName: uploadResult.fileName,
        fileSize: uploadResult.fileSize,
        fileUrl: uploadResult.url,
      })

      setUploadProgress("Concluído!")
      setTimeout(() => {
        setUploadProgress("")
        setIsUploading(false)
      }, 1000)
    } catch (error) {
      console.error("Erro no upload:", error)
      alert("Erro ao fazer upload do arquivo. Tente novamente.")
      setIsUploading(false)
      setUploadProgress("")
    }

    // Limpar input
    if (event.target) {
      event.target.value = ""
    }
  }

  const formatTime = (timestamp: any) => {
    if (!timestamp) return ""

    let date: Date
    if (timestamp.toDate) {
      date = timestamp.toDate()
    } else {
      date = new Date(timestamp)
    }

    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return ""

    let date: Date
    if (timestamp.toDate) {
      date = timestamp.toDate()
    } else {
      date = new Date(timestamp)
    }

    const today = new Date()
    const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())

    const diffTime = todayDate.getTime() - messageDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Hoje"
    if (diffDays === 1) return "Ontem"
    if (diffDays <= 4) return `${diffDays} dias atrás`

    return date.toLocaleDateString("pt-BR")
  }

  const renderMessage = (message: FirebaseMessage) => {
    const isOwn = message.user === user.name

    return (
      <div key={message.id} className={`message ${isOwn ? "own" : "other"}`}>
        <div className="message-header">
          <span className="message-user">{message.user}</span>
          <span className="message-time">{formatTime(message.timestamp)}</span>
          <span className="message-date">{formatDate(message.timestamp)}</span>
        </div>
        <div className="message-content">
          {message.type === "text" && <p>{message.content}</p>}
          {message.type === "image" && (
            <div className="message-media">
              <img
                src={message.fileUrl || "/placeholder.svg"}
                alt={message.fileName}
                className="message-image"
                loading="lazy"
              />
              <p className="file-info">
                📷 {message.fileName} ({message.fileSize})
              </p>
            </div>
          )}
          {message.type === "video" && (
            <div className="message-media">
              <video src={message.fileUrl} controls className="message-video" preload="metadata" />
              <p className="file-info">
                🎥 {message.fileName} ({message.fileSize})
              </p>
            </div>
          )}
          {message.type === "file" && (
            <div className="message-file">
              <div className="file-icon">📎</div>
              <div className="file-details">
                <p className="file-name">{message.fileName}</p>
                <p className="file-size">{message.fileSize}</p>
                <a href={message.fileUrl} target="_blank" rel="noopener noreferrer" className="file-download">
                  Abrir arquivo
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="chat-screen">
      <div className="chat-header">
        <button className="pixel-btn back small" onClick={onBackToHome}>
          ← VOLTAR
        </button>
        <div className="server-info">
          <h1>{server.name}</h1>
          <p>
            {server.code} • Criado por {server.creator}
          </p>
          <small className="auto-delete-info">🗑️ Mensagens são apagadas automaticamente após 4 dias</small>
        </div>
        <div className="user-info">
          <span className="current-user">
            {user.name} {user.isCreator && "👑"}
          </span>
          <div className="online-status">
            <div className="status-dot online"></div>
            <span>Online</span>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <div className="welcome-message">
              <h3>🎮 Bem-vindo ao {server.name}!</h3>
              <p>Seja o primeiro a enviar uma mensagem!</p>
              <small>💡 Mensagens são sincronizadas em tempo real</small>
            </div>
          </div>
        ) : (
          messages.map(renderMessage)
        )}
        <div ref={messagesEndRef} />
      </div>

      {isUploading && (
        <div className="upload-progress">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <span>{uploadProgress}</span>
        </div>
      )}

      <div className="chat-input-area">
        <div className="chat-actions">
          <button
            className="action-btn"
            onClick={() => fileInputRef.current?.click()}
            title="Anexar arquivo"
            disabled={isUploading}
          >
            📎
          </button>
          <button
            className="action-btn"
            onClick={() => cameraInputRef.current?.click()}
            title="Galeria/Câmera"
            disabled={isUploading}
          >
            🖼️
          </button>
        </div>

        <form onSubmit={handleSendMessage} className="message-form">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={isUploading ? "Fazendo upload..." : "Digite sua mensagem..."}
            className="message-input"
            maxLength={1000}
            disabled={isUploading}
          />
          <button type="submit" className="send-btn" disabled={!newMessage.trim() || isUploading}>
            ➤
          </button>
        </form>

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          accept="image/*,video/*,.pdf,.txt,.doc,.docx"
        />
        <input
          ref={cameraInputRef}
          type="file"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          accept="image/*,video/*"
          capture="environment"
        />
      </div>
    </div>
  )
}
