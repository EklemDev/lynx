"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

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

interface Message {
  id: string
  user: string
  content: string
  timestamp: Date
  type: "text" | "file" | "image" | "video"
  fileName?: string
  fileSize?: string
  fileUrl?: string
}

interface ChatScreenProps {
  server: Server
  user: User
  onBackToHome: () => void
}

export default function ChatScreen({ server, user, onBackToHome }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  // Auto scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Carregar mensagens salvas
  useEffect(() => {
    const savedMessages = localStorage.getItem(`lynx-chat-${server.code}`)
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
  }, [server.code])

  // Salvar mensagens
  const saveMessages = (newMessages: Message[]) => {
    setMessages(newMessages)
    localStorage.setItem(`lynx-chat-${server.code}`, JSON.stringify(newMessages))
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      user: user.name,
      content: newMessage.trim(),
      timestamp: new Date(),
      type: "text",
    }

    const updatedMessages = [...messages, message]
    saveMessages(updatedMessages)
    setNewMessage("")
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const fileUrl = URL.createObjectURL(file)
    const fileSize = (file.size / 1024 / 1024).toFixed(2) + " MB"

    let messageType: "file" | "image" | "video" = "file"
    if (file.type.startsWith("image/")) messageType = "image"
    else if (file.type.startsWith("video/")) messageType = "video"

    const message: Message = {
      id: Date.now().toString(),
      user: user.name,
      content: `Enviou um arquivo: ${file.name}`,
      timestamp: new Date(),
      type: messageType,
      fileName: file.name,
      fileSize,
      fileUrl,
    }

    const updatedMessages = [...messages, message]
    saveMessages(updatedMessages)
  }

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const renderMessage = (message: Message) => {
    const isOwn = message.user === user.name

    return (
      <div key={message.id} className={`message ${isOwn ? "own" : "other"}`}>
        <div className="message-header">
          <span className="message-user">{message.user}</span>
          <span className="message-time">{formatTime(message.timestamp)}</span>
        </div>
        <div className="message-content">
          {message.type === "text" && <p>{message.content}</p>}
          {message.type === "image" && (
            <div className="message-media">
              <img src={message.fileUrl || "/placeholder.svg"} alt={message.fileName} className="message-image" />
              <p className="file-info">
                📷 {message.fileName} ({message.fileSize})
              </p>
            </div>
          )}
          {message.type === "video" && (
            <div className="message-media">
              <video src={message.fileUrl} controls className="message-video" />
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
                <a href={message.fileUrl} download={message.fileName} className="file-download">
                  Baixar arquivo
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
        </div>
        <div className="user-info">
          <span className="current-user">
            {user.name} {user.isCreator && "👑"}
          </span>
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <div className="welcome-message">
              <h3>🎮 Bem-vindo ao {server.name}!</h3>
              <p>Seja o primeiro a enviar uma mensagem!</p>
            </div>
          </div>
        ) : (
          messages.map(renderMessage)
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <div className="chat-actions">
          <button className="action-btn" onClick={() => fileInputRef.current?.click()} title="Anexar arquivo">
            📎
          </button>
          <button className="action-btn" onClick={() => cameraInputRef.current?.click()} title="Galeria/Câmera">
            🖼️
          </button>
          <button
            className="action-btn"
            onClick={() => {
              cameraInputRef.current?.click()
            }}
            title="Câmera"
          >
            📷
          </button>
        </div>

        <form onSubmit={handleSendMessage} className="message-form">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="message-input"
            maxLength={1000}
          />
          <button type="submit" className="send-btn" disabled={!newMessage.trim()}>
            ➤
          </button>
        </form>

        <input ref={fileInputRef} type="file" onChange={handleFileUpload} style={{ display: "none" }} accept="*/*" />
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
