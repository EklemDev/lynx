import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  where,
  getDocs,
  deleteDoc,
  Timestamp,
} from "firebase/firestore"
import { db } from "./firebase"

export interface FirebaseMessage {
  id?: string
  serverCode: string
  user: string
  content: string
  timestamp: any
  type: "text" | "file" | "image" | "video"
  fileName?: string
  fileSize?: string
  fileUrl?: string
  createdAt: any
}

// Adicionar mensagem
export const addMessage = async (message: Omit<FirebaseMessage, "id" | "timestamp" | "createdAt">) => {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      ...message,
      timestamp: serverTimestamp(),
      createdAt: serverTimestamp(),
    })
    return docRef.id
  } catch (error) {
    console.error("Erro ao adicionar mensagem:", error)
    throw error
  }
}

// Escutar mensagens em tempo real
export const subscribeToMessages = (serverCode: string, callback: (messages: FirebaseMessage[]) => void) => {
  const q = query(collection(db, "messages"), where("serverCode", "==", serverCode), orderBy("timestamp", "asc"))

  return onSnapshot(q, (snapshot) => {
    const messages: FirebaseMessage[] = []
    snapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        ...doc.data(),
      } as FirebaseMessage)
    })
    callback(messages)
  })
}

// Limpar mensagens antigas (mais de 4 dias)
export const cleanOldMessages = async () => {
  try {
    const fourDaysAgo = new Date()
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 4)

    const q = query(collection(db, "messages"), where("createdAt", "<", Timestamp.fromDate(fourDaysAgo)))

    const snapshot = await getDocs(q)
    const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref))

    await Promise.all(deletePromises)
    console.log(`${snapshot.docs.length} mensagens antigas foram removidas`)
  } catch (error) {
    console.error("Erro ao limpar mensagens antigas:", error)
  }
}

// Executar limpeza automática
export const startAutoCleanup = () => {
  // Executar limpeza a cada 6 horas
  const interval = setInterval(cleanOldMessages, 6 * 60 * 60 * 1000)

  // Executar uma vez ao iniciar
  cleanOldMessages()

  return () => clearInterval(interval)
}
