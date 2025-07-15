"use client"

interface HomeScreenProps {
  onJoinServer: () => void
  onCreateServer: () => void
  onDraft: () => void
}

export default function HomeScreen({ onJoinServer, onCreateServer, onDraft }: HomeScreenProps) {
  return (
    <div className="home-screen">
      <div className="home-container">
        <div className="logo-section">
          <div className="pixel-logo">
            <img src="/placeholder.svg?height=80&width=80" alt="Lynx Bits" />
          </div>
          <h1 className="game-title">LYNX CHAT-BITS</h1>
          <p className="game-subtitle">v1.0 • PIXEL EDITION</p>
        </div>

        <div className="menu-buttons">
          <button className="pixel-btn primary" onClick={onJoinServer}>
            <span className="btn-icon">🔗</span>
            <span className="btn-text">ENTRAR EM SERVIDOR</span>
            <span className="btn-subtitle">Por código</span>
          </button>

          <button className="pixel-btn secondary" onClick={onCreateServer}>
            <span className="btn-icon">⚡</span>
            <span className="btn-text">CRIAR SERVIDOR</span>
            <span className="btn-subtitle">Novo servidor</span>
          </button>

          <button className="pixel-btn tertiary" onClick={onDraft}>
            <span className="btn-icon">📝</span>
            <span className="btn-text">RASCUNHO</span>
            <span className="btn-subtitle">Área de teste</span>
          </button>
        </div>

        <div className="footer-info">
          <div className="status-indicator">
            <div className="status-dot online"></div>
            <span>SISTEMA ONLINE</span>
          </div>
        </div>
      </div>

      <div className="background-pattern"></div>
    </div>
  )
}
