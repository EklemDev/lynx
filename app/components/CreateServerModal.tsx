"use client"

import type React from "react"

import { useState } from "react"

interface CreateServerModalProps {
  onClose: () => void
  onSubmit: (serverName: string, creatorName: string, hasPassword: boolean, password?: string) => void
}

export default function CreateServerModal({ onClose, onSubmit }: CreateServerModalProps) {
  const [serverName, setServerName] = useState("")
  const [creatorName, setCreatorName] = useState("")
  const [hasPassword, setHasPassword] = useState(false)
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (serverName.trim() && creatorName.trim()) {
      onSubmit(serverName.trim(), creatorName.trim(), hasPassword, hasPassword ? password : undefined)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="pixel-modal large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>CRIAR SERVIDOR</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="serverName">NOME DO SERVIDOR</label>
            <input
              id="serverName"
              type="text"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              placeholder="Meu Servidor Incrível"
              className="pixel-input"
              maxLength={50}
              autoFocus
            />
            <small>Máximo 50 caracteres</small>
          </div>

          <div className="form-group">
            <label htmlFor="creatorName">SEU NOME</label>
            <input
              id="creatorName"
              type="text"
              value={creatorName}
              onChange={(e) => setCreatorName(e.target.value)}
              placeholder="Seu nome como criador"
              className="pixel-input"
              maxLength={30}
            />
            <small>Como você será identificado</small>
          </div>

          <div className="form-group">
            <div className="checkbox-group">
              <input
                id="hasPassword"
                type="checkbox"
                checked={hasPassword}
                onChange={(e) => setHasPassword(e.target.checked)}
                className="pixel-checkbox"
              />
              <label htmlFor="hasPassword" className="checkbox-label">
                🔒 Proteger com senha
              </label>
            </div>
          </div>

          {hasPassword && (
            <div className="form-group">
              <label htmlFor="password">SENHA DO SERVIDOR</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite uma senha..."
                className="pixel-input"
              />
              <small>Sem limite de caracteres</small>
            </div>
          )}

          <div className="server-preview">
            <div className="preview-card">
              <div className="server-icon">🎮</div>
              <div className="server-info">
                <div className="server-title">{serverName || "Meu Servidor"}</div>
                <div className="server-creator">Criador: {creatorName || "Você"}</div>
                <div className="server-code">Código será gerado automaticamente</div>
                <div className="server-security">{hasPassword ? "🔒 Protegido por senha" : "🔓 Acesso livre"}</div>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="pixel-btn cancel" onClick={onClose}>
              CANCELAR
            </button>
            <button
              type="submit"
              className="pixel-btn primary"
              disabled={!serverName.trim() || !creatorName.trim() || (hasPassword && !password.trim())}
            >
              CRIAR SERVIDOR
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
