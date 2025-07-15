"use client"
import { FaTimes, FaMoon, FaSun, FaBell, FaGlobe, FaShieldAlt } from "react-icons/fa"
import dashboardStyles from "../../pages/Dashboard.module.css" // Importa o CSS Module do Dashboard

export default function SettingsModal({ isOpen, onClose, darkMode, toggleDarkMode }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content ${dashboardStyles.settingsModal}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        <div className={dashboardStyles.modalHeader}>
          <h2>Configurações</h2>
          <p>Personalize sua experiência no Lynx</p>
        </div>

        <div className={dashboardStyles.settingsSections}>
          <div className={dashboardStyles.settingsSection}>
            <h3>Aparência</h3>
            <div className={dashboardStyles.settingItem}>
              <div className={dashboardStyles.settingInfo}>
                <span>Modo Escuro</span>
                <small>Alterna entre tema claro e escuro</small>
              </div>
              <button
                className={`${dashboardStyles.toggleBtn} ${darkMode ? dashboardStyles.active : ""}`}
                onClick={toggleDarkMode}
              >
                {darkMode ? <FaMoon /> : <FaSun />}
              </button>
            </div>
          </div>

          <div className={dashboardStyles.settingsSection}>
            <h3>Notificações</h3>
            <div className={dashboardStyles.settingItem}>
              <div className={dashboardStyles.settingInfo}>
                <FaBell />
                <span>Notificações Push</span>
                <small>Receber notificações do sistema</small>
              </div>
              <button className={dashboardStyles.toggleBtn}>
                <input type="checkbox" defaultChecked />
              </button>
            </div>
          </div>

          <div className={dashboardStyles.settingsSection}>
            <h3>Idioma</h3>
            <div className={dashboardStyles.settingItem}>
              <div className={dashboardStyles.settingInfo}>
                <FaGlobe />
                <span>Idioma do Sistema</span>
                <small>Português (Brasil)</small>
              </div>
              <select className={dashboardStyles.settingSelect}>
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Español</option>
              </select>
            </div>
          </div>

          <div className={dashboardStyles.settingsSection}>
            <h3>Privacidade</h3>
            <div className={dashboardStyles.settingItem}>
              <div className={dashboardStyles.settingInfo}>
                <FaShieldAlt />
                <span>Dados de Uso</span>
                <small>Compartilhar dados para melhorar o app</small>
              </div>
              <button className={dashboardStyles.toggleBtn}>
                <input type="checkbox" />
              </button>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-primary" onClick={onClose}>
            Salvar Configurações
          </button>
        </div>
      </div>
    </div>
  )
}
