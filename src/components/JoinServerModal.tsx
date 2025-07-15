"use client"

import type React from "react"

import { useState } from "react"

interface JoinServerModalProps {
  onClose: () => void
  onSubmit: (serverCode: string) => void
}

export default function JoinServerModal({ onClose, onSubmit }: JoinServerModalProps) {
  const [serverCode, setServerCode] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (serverCode.trim()) {
      onSubmit(serverCode.trim())
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
              onChange={(e) => setServerCode(e.target.value)}
              placeholder="Digite o código..."
              className="pixel-input"
              maxLength={20}
              autoFocus
            />
            <small>Exemplo: LYNX-2024-ABCD</small>
          </div>

          <div className="modal-actions">
            <button type="button" className="pixel-btn cancel" onClick={onClose}>
              CANCELAR
            </button>
            <button type="submit" className="pixel-btn primary" disabled={!serverCode.trim()}>
              ENTRAR
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
