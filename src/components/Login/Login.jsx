"use client"

import { useState } from "react"
import { FaGoogle, FaEye, FaEyeSlash, FaUserPlus, FaSignInAlt } from "react-icons/fa"
import CreateAccountModal from "./CreateAccountModal"
import { AuthUtils } from "../../utils/auth"
import styles from "./Login.module.css" // Importa como CSS Module

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const user = await AuthUtils.loginWithEmail(email, password)
      onLoginSuccess(user)
    } catch (err) {
      setError("Email ou senha incorretos")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError("")

    try {
      const user = await AuthUtils.loginWithGoogle()
      onLoginSuccess(user)
    } catch (err) {
      setError("Erro ao fazer login com Google")
    } finally {
      setLoading(false)
    }
  }

  const handleGuestLogin = async () => {
    setLoading(true)
    setError("")

    try {
      const user = await AuthUtils.loginAsGuest()
      onLoginSuccess(user)
    } catch (err) {
      setError("Erro ao entrar como convidado")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateAccountSuccess = (user) => {
    setShowCreateModal(false)
    onLoginSuccess(user)
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBackground}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <div className={styles.loginLogo}>
              <img src="/placeholder.svg?height=80&width=80" alt="Lynx Logo" />
            </div>
            <h1>Bem-vindo ao Lynx</h1>
            <p>Faça login para continuar</p>
          </div>

          <form onSubmit={handleEmailLogin} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="input-field" // Mantém classe global
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Senha</label>
              <div className={styles.passwordInput}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  className="input-field" // Mantém classe global
                  required
                />
                <button type="button" className={styles.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <button type="submit" className={`btn-primary ${styles.loginBtn}`} disabled={loading}>
              {loading ? (
                <div className="loading-spinner-small"></div>
              ) : (
                <>
                  <FaSignInAlt />
                  Entrar
                </>
              )}
            </button>
          </form>

          <div className={styles.loginDivider}>
            <span>ou</span>
          </div>

          <div className={styles.socialLogin}>
            <button onClick={handleGoogleLogin} className={styles.btnGoogle} disabled={loading}>
              <FaGoogle />
              Continuar com Google
            </button>
          </div>

          <div className={styles.loginActions}>
            <button onClick={() => setShowCreateModal(true)} className="btn-secondary" disabled={loading}>
              <FaUserPlus />
              Criar Conta
            </button>

            <button onClick={handleGuestLogin} className={styles.btnGuest} disabled={loading}>
              Entrar como Convidado
            </button>
          </div>

          <div className={styles.loginFooter}>
            <p>© 2024 Lynx. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <CreateAccountModal onClose={() => setShowCreateModal(false)} onSuccess={handleCreateAccountSuccess} />
      )}
    </div>
  )
}
