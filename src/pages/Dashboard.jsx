"use client"

import { useState, useEffect } from "react"
import styles from "./Dashboard.module.css" // Importa como CSS Module
import { UserProfileSection, WidgetsSection, InstalledAppsPanel, SettingsModal } from "../components/dashboard"

import {
  FaCloudSun,
  FaEllipsisV,
  FaHome,
  FaSun,
  FaMoon,
  FaAddressBook,
  FaUsers,
  FaServer,
  FaChartBar,
  FaSignOutAlt,
  FaCog,
  FaSearch,
} from "react-icons/fa"

import DashboardLayout from "../components/dashboard/DashboardLayout" // Novo componente de layout

const Dashboard = ({ user, onLogout }) => {
  const [userPhoto, setUserPhoto] = useState(user?.photoURL || null)
  const [serverCode, setServerCode] = useState("")
  const [darkMode, setDarkMode] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  const [weatherData] = useState({
    temperature: "22°",
    city: "São Paulo",
    condition: "Parcialmente Nublado",
    icon: <FaCloudSun />,
  })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    const updateTime = () => setCurrentTime(new Date())

    checkMobile()
    window.addEventListener("resize", checkMobile)
    const timeInterval = setInterval(updateTime, 1000)

    // Carregar foto do usuário se disponível
    if (user?.photoURL) {
      setUserPhoto(user.photoURL)
    }

    return () => {
      window.removeEventListener("resize", checkMobile)
      clearInterval(timeInterval)
    }
  }, [user])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode")
    } else {
      document.documentElement.classList.remove("dark-mode")
    }
  }, [darkMode])

  const handleAddPhoto = () => {
    console.log("Adicionar/Mudar foto do usuário")
    // Implementar lógica de upload de imagem
  }

  const handlePersonalization = () => {
    console.log("Abrir tela de Personalização")
    // Implementar modal de personalização
  }

  const handleProfile = () => {
    console.log("Abrir informações completas do Perfil")
    // Implementar modal de perfil
  }

  const handleSearchServer = () => {
    if (serverCode.trim()) {
      console.log("Buscar servidor com código:", serverCode)
      // Implementar lógica de busca de servidor
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleOpenSettings = () => {
    setShowSettingsModal(true)
  }

  const handleCloseSettings = () => {
    setShowSettingsModal(false)
  }

  // Renderização para Mobile
  if (isMobile) {
    return (
      <div className={`${styles.dashboardMobile} ${darkMode ? "dark" : "light"}`}>
        <div className={styles.mobileHeader}>
          <div className={styles.mobileHeaderLeft}>
            <img src="/placeholder.svg?height=35&width=35" alt="Lynx" className={styles.mobileLogo} />
            <div className={styles.mobileUserInfo}>
              <h2>Olá, {user?.nome?.split(" ")[0] || "Usuário"}!</h2>
              <p>{currentTime.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</p>
            </div>
          </div>
          <div className={styles.mobileHeaderRight}>
            <button className={styles.mobileMenuBtn} onClick={() => setShowMobileMenu(!showMobileMenu)}>
              <FaEllipsisV />
            </button>
          </div>
        </div>

        <div className={styles.mobileContent}>
          <UserProfileSection
            user={user}
            userPhoto={userPhoto}
            handleAddPhoto={handleAddPhoto}
            handlePersonalization={handlePersonalization}
            handleProfile={handleProfile}
          />
          <WidgetsSection weatherData={weatherData} />
          <InstalledAppsPanel />
        </div>

        <div className={styles.mobileBottomNav}>
          <button className={`${styles.navItem} ${styles.active}`}>
            <FaHome />
            <span>Início</span>
          </button>
          <button className={styles.navItem} onClick={() => console.log("Contatos")}>
            <FaAddressBook />
            <span>Contatos</span>
          </button>
          <button className={styles.navItem} onClick={() => console.log("Abrir tela de Sessões")}>
            <FaUsers />
            <span>Sessões</span>
          </button>
          <button className={styles.navItem} onClick={() => console.log("Servidores")}>
            <FaServer />
            <span>Servidores</span>
          </button>
          <button className={styles.navItem} onClick={() => console.log("Estatísticas")}>
            <FaChartBar />
            <span>Estatísticas</span>
          </button>
          <button className={styles.navItem} onClick={onLogout}>
            <FaSignOutAlt />
            <span>Sair</span>
          </button>
        </div>

        {showMobileMenu && (
          <div className={styles.mobileMenuOverlay} onClick={() => setShowMobileMenu(false)}>
            <div className={styles.mobileMenu}>
              <button onClick={toggleDarkMode}>
                {darkMode ? <FaSun /> : <FaMoon />}
                {darkMode ? "Modo Claro" : "Modo Escuro"}
              </button>
              <button onClick={handleOpenSettings}>
                <FaCog />
                Configurações
              </button>
              <div className={styles.serverSearchMobile}>
                <input
                  type="text"
                  placeholder="Código do servidor"
                  value={serverCode}
                  onChange={(e) => setServerCode(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearchServer()}
                />
                <button onClick={handleSearchServer}>
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>
        )}

        <SettingsModal
          isOpen={showSettingsModal}
          onClose={handleCloseSettings}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      </div>
    )
  }

  // Renderização para Desktop
  return (
    <>
      <DashboardLayout user={user} onLogout={onLogout} onOpenSettings={handleOpenSettings} />
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={handleCloseSettings}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </>
  )
}

export default Dashboard
