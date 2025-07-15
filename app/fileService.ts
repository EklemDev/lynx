import { put } from "@vercel/blob"

export interface UploadResult {
  url: string
  fileName: string
  fileSize: string
  type: "image" | "video" | "file"
}

export const uploadFile = async (file: File): Promise<UploadResult> => {
  try {
    // Gerar nome único para o arquivo
    const timestamp = Date.now()
    const randomId = Math.random().toString(36).substring(2)
    const fileName = `${timestamp}-${randomId}-${file.name}`

    // Upload para Vercel Blob
    const blob = await put(fileName, file, {
      access: "public",
    })

    // Determinar tipo do arquivo
    let type: "image" | "video" | "file" = "file"
    if (file.type.startsWith("image/")) type = "image"
    else if (file.type.startsWith("video/")) type = "video"

    // Calcular tamanho do arquivo
    const fileSize = (file.size / 1024 / 1024).toFixed(2) + " MB"

    return {
      url: blob.url,
      fileName: file.name,
      fileSize,
      type,
    }
  } catch (error) {
    console.error("Erro ao fazer upload do arquivo:", error)
    throw new Error("Falha no upload do arquivo")
  }
}

// Função para validar arquivos
export const validateFile = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 50 * 1024 * 1024 // 50MB
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "video/mp4",
    "video/webm",
    "video/quicktime",
    "application/pdf",
    "text/plain",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]

  if (file.size > maxSize) {
    return { valid: false, error: "Arquivo muito grande. Máximo 50MB." }
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: "Tipo de arquivo não suportado." }
  }

  return { valid: true }
}
