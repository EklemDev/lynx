"use client"

import type React from "react"

import { useState } from "react"

interface Server {
  code: string
  name: string
  creator: string
  hasPassword: boolean
  password?: string
  createdAt: Date
}

interface JoinServerModalProps {
  onClose: () => void
  onSubmit: (serverCode: string, userName: string, password?: string) => void
  servers: Server[]
}

export default function JoinServerModal({ onClose, onSubmit, servers }: JoinServerModalProps) {
  const [serverCode, setServerCode] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [foundServer, setFoundServer] = useState<Server | null>(null)

  const handleCodeChange = (code: string) => {
    setServerCode(code)
    const server = servers.find((s) => s.code.toLowerCase() === code.toLowerCase())
    setFoundServer(server || null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (serverCode.trim() && userName.trim()) {
      onSubmit(serverCode.trim(), userName.trim(), password.trim() || undefined)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="pixel-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>ENTRAR EM SERVIDOR</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="serverCode">CÓDIGO DO SERVIDOR</label>
            <input
              id="serverCode"
              type="text"
              value={serverCode}
              onChange={(e) => handleCodeChange(e.target.value)}
              placeholder="$LYNX0001"
              className="pixel-input"
              maxLength={20}
              autoFocus
            />
            <small>Exemplo: $LYNX1234</small>
          </div>

          {foundServer && (
            <div className="server-info-card">
              <div className="server-icon">🎮</div>
              <div className="server-details">
                <div className="server-name">{foundServer.name}</div>
                <div className="server-creator">Criado por: {foundServer.creator}</div>
                <div className="server-status">
                  {foundServer.hasPassword ? "🔒 Protegido por senha" : "🔓 Acesso livre"}
                </div>
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="userName">SEU NOME</label>
            <input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Digite seu nome..."
              className="pixel-input"
              maxLength={30}
            />
            <small>Como você será identificado no chat</small>
          </div>

          {foundServer?.hasPassword && (
            <div className="form-group">
              <label htmlFor="password">SENHA DO SERVIDOR</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha..."
                className="pixel-input"
              />
            </div>
          )}

          <div className="modal-actions">
            <button type="button" className="pixel-btn cancel" onClick={onClose}>
              CANCELAR
            </button>
            <button
              type="submit"
              className="pixel-btn primary"
              disabled={!serverCode.trim() || !userName.trim() || (foundServer?.hasPassword && !password.trim())}
            >
              ENTRAR
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
