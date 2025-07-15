"use client"

import { useState } from "react"

interface DraftScreenProps {
  onBackToHome: () => void
}

export default function DraftScreen({ onBackToHome }: DraftScreenProps) {
  const [draftText, setDraftText] = useState("")

  const handleSave = () => {
    localStorage.setItem("lynx-bits-draft", draftText)
    alert("Rascunho salvo!")
  }

  const handleLoad = () => {
    const saved = localStorage.getItem("lynx-bits-draft")
    if (saved) {
      setDraftText(saved)
    }
  }

  const handleClear = () => {
    if (confirm("Limpar todo o rascunho?")) {
      setDraftText("")
    }
  }

  return (
    <div className="draft-screen">
      <div className="draft-header">
        <button className="pixel-btn back" onClick={onBackToHome}>
          ← VOLTAR
        </button>
        <h1>RASCUNHO</h1>
        <div className="draft-actions">
          <button className="pixel-btn small" onClick={handleLoad}>
            CARREGAR
          </button>
          <button className="pixel-btn small" onClick={handleSave}>
            SALVAR
          </button>
          <button className="pixel-btn small danger" onClick={handleClear}>
            LIMPAR
          </button>
        </div>
      </div>

      <div className="draft-content">
        <textarea
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
          placeholder="Digite suas anotações aqui..."
          className="draft-textarea"
        />

        <div className="draft-stats">
          <span>Caracteres: {draftText.length}</span>
          <span>Palavras: {draftText.trim() ? draftText.trim().split(/\s+/).length : 0}</span>
        </div>
      </div>
    </div>
  )
}
