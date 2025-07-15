"use client"

import type React from "react"

import { useState } from "react"

interface CreateServerModalProps {
  onClose: () => void
  onSubmit: (serverName: string) => void
}

export default function CreateServerModal({ onClose, onSubmit }: CreateServerModalProps) {
  const [serverName, setServerName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (serverName.trim()) {
      onSubmit(serverName.trim())
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="pixel-modal" onClick={(e) => e.stopPropagation()}>
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

          <div className="server-preview">
            <div className="preview-card">
              <div className="server-icon">🎮</div>
              <div className="server-info">
                <div className="server-title">{serverName || "Meu Servidor"}</div>
                <div className="server-code">LYNX-{Math.random().toString(36).substr(2, 4).toUpperCase()}</div>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="pixel-btn cancel" onClick={onClose}>
              CANCELAR
            </button>
            <button type="submit" className="pixel-btn primary" disabled={!serverName.trim()}>
              CRIAR
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
