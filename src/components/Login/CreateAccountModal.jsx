"use client"

import { useState } from "react"
import { FaTimes, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"
import { AuthUtils } from "../../utils/auth"
import styles from "./CreateAccountModal.module.css" // Importa como CSS Module

export default function CreateAccountModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validações
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem")
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      setLoading(false)
      return
    }

    try {
      const user = await AuthUtils.createAccount(formData.email, formData.password, formData.nome)
      onSuccess(user)
    } catch (err) {
      setError("Erro ao criar conta. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        <div className={styles.modalHeader}>
          <h2>Criar Nova Conta</h2>
          <p>Preencha os dados para criar sua conta no Lynx</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.createAccountForm}>
          <div className={styles.formGroup}>
            <label htmlFor="nome">
              <FaUser /> Nome Completo
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Seu nome completo"
              className="input-field" // Mantém classe global
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">
              <FaEnvelope /> Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="seu@email.com"
              className="input-field" // Mantém classe global
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">
              <FaLock /> Senha
            </label>
            <div className={styles.passwordInput}>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Mínimo 6 caracteres"
                className="input-field" // Mantém classe global
                required
              />
              <button type="button" className={styles.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">
              <FaLock /> Confirmar Senha
            </label>
            <div className={styles.passwordInput}>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirme sua senha"
                className="input-field" // Mantém classe global
                required
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? <div className="loading-spinner-small"></div> : "Criar Conta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
