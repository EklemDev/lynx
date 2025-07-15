"use client"

import { useState, useEffect } from "react"
import Login from "./components/Login/Login"
import Dashboard from "./pages/Dashboard"
import { AuthUtils } from "./utils/auth"
import "./globals.css"

function App() {
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)

  // Verificar se há usuário logado ao iniciar
  useEffect(() => {
    const verificarUsuarioLogado = async () => {
      try {
        // Verificar se há usuário no localStorage ou sessionStorage
        const usuarioSalvo = localStorage.getItem("lynxUser") || sessionStorage.getItem("guestUser")

        if (usuarioSalvo) {
          const dadosUsuario = JSON.parse(usuarioSalvo)
          setUsuario(dadosUsuario)
        }
      } catch (error) {
        console.error("Erro ao verificar usuário logado:", error)
      } finally {
        setCarregando(false)
      }
    }

    verificarUsuarioLogado()
  }, [])

  // Função chamada quando login é bem-sucedido
  const handleLoginSuccess = (dadosUsuario) => {
    setUsuario(dadosUsuario)

    // Salvar usuário no localStorage (ou sessionStorage para convidados)
    if (dadosUsuario?.isGuest) {
      sessionStorage.setItem("guestUser", JSON.stringify(dadosUsuario))
    } else {
      localStorage.setItem("lynxUser", JSON.stringify(dadosUsuario))
    }
  }

  // Função para fazer logout
  const handleLogout = async () => {
    try {
      // Limpar dados salvos
      localStorage.removeItem("lynxUser")
      sessionStorage.removeItem("guestUser")

      // Se não for convidado, fazer logout do Firebase
      if (!usuario?.isGuest) {
        await AuthUtils.logout()
      }

      setUsuario(null)
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  // Mostrar loading enquanto verifica usuário
  if (carregando) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-logo">
            <img src="/placeholder.svg?height=80&width=80" alt="Lynx" />
          </div>
          <div className="loading-text">Carregando Lynx...</div>
          <div className="loading-spinner"></div>
        </div>
      </div>
    )
  }

  // Se usuário está logado, mostrar Dashboard
  if (usuario) {
    return <Dashboard user={usuario} onLogout={handleLogout} />
  }

  // Se não está logado, mostrar Login
  return <Login onLoginSuccess={handleLoginSuccess} />
}

export default App
