"use client"

import { useState } from "react"
import HomeScreen from "./components/HomeScreen"
import JoinServerModal from "./components/JoinServerModal"
import CreateServerModal from "./components/CreateServerModal"
import DraftScreen from "./components/DraftScreen"
import "./styles/globals.css"

export default function LynxChatBits() {
  const [currentScreen, setCurrentScreen] = useState<"home" | "draft">("home")
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)

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
  }

  const handleJoinServerSubmit = (serverCode: string) => {
    console.log("Joining server with code:", serverCode)
    setShowJoinModal(false)
    // Aqui você implementaria a lógica de entrar no servidor
  }

  const handleCreateServerSubmit = (serverName: string) => {
    console.log("Creating server:", serverName)
    setShowCreateModal(false)
    // Aqui você implementaria a lógica de criar servidor
  }

  return (
    <div className="lynx-bits-app">
      {currentScreen === "home" && (
        <HomeScreen onJoinServer={handleJoinServer} onCreateServer={handleCreateServer} onDraft={handleDraft} />
      )}

      {currentScreen === "draft" && <DraftScreen onBackToHome={handleBackToHome} />}

      {showJoinModal && <JoinServerModal onClose={() => setShowJoinModal(false)} onSubmit={handleJoinServerSubmit} />}

      {showCreateModal && (
        <CreateServerModal onClose={() => setShowCreateModal(false)} onSubmit={handleCreateServerSubmit} />
      )}
    </div>
  )
}
