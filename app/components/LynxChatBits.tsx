"use client"

import { useState, useEffect } from "react"
import HomeScreen from "./HomeScreen"
import JoinServerModal from "./JoinServerModal"
import CreateServerModal from "./CreateServerModal"
import DraftScreen from "./DraftScreen"
import ChatScreen from "./ChatScreen"
import "./globals.css"

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

export default function LynxChatBits() {
  const [currentScreen, setCurrentScreen] = useState<"home" | "draft" | "chat">("home")
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [servers, setServers] = useState<Server[]>([])
  const [currentServer, setCurrentServer] = useState<Server | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  // Carregar servidores salvos
  useEffect(() => {
    const savedServers = localStorage.getItem("lynx-bits-servers")
    if (savedServers) {
      setServers(JSON.parse(savedServers))
    }
  }, [])

  // Salvar servidores
  const saveServers = (newServers: Server[]) => {
    setServers(newServers)
    localStorage.setItem("lynx-bits-servers", JSON.stringify(newServers))
  }

  // Gerar código único
  const generateUniqueCode = (): string => {
    let code: string
    do {
      const randomNum = Math.floor(Math.random() * 9999) + 1
      code = `$LYNX${randomNum.toString().padStart(4, "0")}`
    } while (servers.some((server) => server.code === code))
    return code
  }

  const handleJoinServer = () => {
    setShowJoinModal(true)
  }

  const handleCreateServer = () => {
    setShowCreateModal(true)
  }

  const handleDraft = () => {
    setCurrentScreen("draft")
  }

  const handleBackToHome = () => {
    setCurrentScreen("home")
    setCurrentServer(null)
    setCurrentUser(null)
  }

  const handleJoinServerSubmit = (serverCode: string, userName: string, password?: string) => {
    const server = servers.find((s) => s.code.toLowerCase() === serverCode.toLowerCase())

    if (!server) {
      alert("Servidor não encontrado!")
      return
    }

    if (server.hasPassword && server.password !== password) {
      alert("Senha incorreta!")
      return
    }

    setCurrentServer(server)
    setCurrentUser({ name: userName, isCreator: false })
    setCurrentScreen("chat")
    setShowJoinModal(false)
  }

  const handleCreateServerSubmit = (
    serverName: string,
    creatorName: string,
    hasPassword: boolean,
    password?: string,
  ) => {
    const newServer: Server = {
      code: generateUniqueCode(),
      name: serverName,
      creator: creatorName,
      hasPassword,
      password: hasPassword ? password : undefined,
      createdAt: new Date(),
    }

    const newServers = [...servers, newServer]
    saveServers(newServers)

    setCurrentServer(newServer)
    setCurrentUser({ name: creatorName, isCreator: true })
    setCurrentScreen("chat")
    setShowCreateModal(false)

    // Mostrar código do servidor criado
    alert(`Servidor criado com sucesso!\nCódigo: ${newServer.code}\nCompartilhe este código para outros entrarem.`)
  }

  return (
    <div className="lynx-bits-app">
      {currentScreen === "home" && (
        <HomeScreen onJoinServer={handleJoinServer} onCreateServer={handleCreateServer} onDraft={handleDraft} />
      )}

      {currentScreen === "draft" && <DraftScreen onBackToHome={handleBackToHome} />}

      {currentScreen === "chat" && currentServer && currentUser && (
        <ChatScreen server={currentServer} user={currentUser} onBackToHome={handleBackToHome} />
      )}

      {showJoinModal && (
        <JoinServerModal onClose={() => setShowJoinModal(false)} onSubmit={handleJoinServerSubmit} servers={servers} />
      )}

      {showCreateModal && (
        <CreateServerModal onClose={() => setShowCreateModal(false)} onSubmit={handleCreateServerSubmit} />
      )}
    </div>
  )
}
