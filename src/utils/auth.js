// Simulação de autenticação - substitua pela implementação real do Firebase
export const AuthUtils = {
  // Login com email e senha
  loginWithEmail: async (email, password) => {
    // Simula delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simula validação
    if (email && password) {
      return {
        uid: "user_" + Date.now(),
        email: email,
        nome: email.split("@")[0],
        photoURL: null,
        isGuest: false,
      }
    }
    throw new Error("Credenciais inválidas")
  },

  // Login com Google
  loginWithGoogle: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      uid: "google_" + Date.now(),
      email: "usuario@gmail.com",
      nome: "Usuário Google",
      photoURL: "/placeholder.svg?height=150&width=150",
      isGuest: false,
    }
  },

  // Criar conta
  createAccount: async (email, password, nome) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email && password && nome) {
      return {
        uid: "new_" + Date.now(),
        email: email,
        nome: nome,
        photoURL: null,
        isGuest: false,
      }
    }
    throw new Error("Dados inválidos")
  },

  // Entrar como convidado
  loginAsGuest: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      uid: "guest_" + Date.now(),
      email: null,
      nome: "Convidado",
      photoURL: null,
      isGuest: true,
    }
  },

  // Logout
  logout: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    // Implementar logout do Firebase aqui
  },
}
