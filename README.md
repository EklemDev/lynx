<<<<<<< HEAD
# Lynx Chat-Bits v1.0

Um sistema de chat em tempo real com interface pixelizada, construído com Next.js, Firebase e Vercel Blob Store.

## 🚀 Funcionalidades

### Chat em Tempo Real
- ✅ Mensagens sincronizadas instantaneamente via Firebase
- ✅ Upload de arquivos (imagens, vídeos, documentos) via Vercel Blob Store
- ✅ Limpeza automática de mensagens após 4 dias
- ✅ Suporte a múltiplos tipos de arquivo (até 50MB)
- ✅ Visualização de imagens e vídeos inline

### Gerenciamento de Servidores
- ✅ Criação de servidores com códigos únicos ($LYNX0001)
- ✅ Proteção por senha opcional
- ✅ Persistência local de servidores criados

### Interface Pixelizada
- ✅ Design retrô inspirado em jogos 8-bit
- ✅ Paleta de cores vermelho/laranja quente
- ✅ Animações e efeitos visuais
- ✅ Totalmente responsivo

## 🛠️ Tecnologias

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Firebase Firestore (tempo real)
- **Storage**: Vercel Blob Store
- **Estilização**: CSS3 com variáveis customizadas
- **Fontes**: Press Start 2P, Orbitron

## 📦 Instalação

1. **Clone o repositório**
\`\`\`bash
git clone <seu-repositorio>
cd lynx-chat-bits
\`\`\`

2. **Instale as dependências**
\`\`\`bash
npm install
\`\`\`

3. **Configure as variáveis de ambiente**
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edite o arquivo `.env.local` com suas credenciais:
- Firebase: Crie um projeto no [Firebase Console](https://console.firebase.google.com)
- Vercel Blob: Configure no [Vercel Dashboard](https://vercel.com/dashboard)

4. **Configure o Firebase**
- Ative o Firestore Database
- Configure as regras de segurança:
\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{document} {
      allow read, write: if true;
    }
  }
}
\`\`\`

5. **Execute o projeto**
\`\`\`bash
npm run dev
\`\`\`

## 🔧 Configuração do Firebase

### Firestore Rules
\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{document} {
      allow read, write: if true;
    }
  }
}
\`\`\`

### Estrutura de Dados
\`\`\`typescript
interface Message {
  serverCode: string
  user: string
  content: string
  timestamp: Timestamp
  type: 'text' | 'file' | 'image' | 'video'
  fileName?: string
  fileSize?: string
  fileUrl?: string
  createdAt: Timestamp
}
\`\`\`

## 📁 Estrutura do Projeto

\`\`\`
app/
├── components/
│   ├── LynxChatBits.tsx      # Componente principal
│   ├── HomeScreen.tsx        # Tela inicial
│   ├── ChatScreen.tsx        # Interface de chat
│   ├── JoinServerModal.tsx   # Modal para entrar em servidor
│   ├── CreateServerModal.tsx # Modal para criar servidor
│   ├── DraftScreen.tsx       # Área de rascunho
│   └── globals.css           # Estilos globais
├── lib/
│   ├── firebase.ts           # Configuração Firebase
│   ├── messageService.ts     # Serviços de mensagem
│   └── fileService.ts        # Serviços de arquivo
└── page.tsx                  # Página principal
\`\`\`

## 🎮 Como Usar

### Criar um Servidor
1. Clique em "CRIAR SERVIDOR"
2. Digite o nome do servidor e seu nome
3. Opcionalmente, defina uma senha
4. Compartilhe o código gerado ($LYNX0001)

### Entrar em um Servidor
1. Clique em "ENTRAR EM SERVIDOR"
2. Digite o código do servidor
3. Digite seu nome
4. Se necessário, digite a senha

### Chat
- Digite mensagens no campo inferior
- Use 📎 para anexar arquivos
- Use 🖼️ para enviar fotos/vídeos
- Mensagens são sincronizadas em tempo real
- Arquivos são armazenados no Vercel Blob Store

## 🗑️ Limpeza Automática

O sistema automaticamente:
- Remove mensagens com mais de 4 dias
- Executa limpeza a cada 6 horas
- Mantém o banco de dados otimizado

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Variáveis de Ambiente Necessárias
\`\`\`
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
BLOB_READ_WRITE_TOKEN
\`\`\`

## 📱 Recursos Mobile

- Interface totalmente responsiva
- Suporte a upload via câmera
- Otimizado para touch
- Carregamento lazy de imagens

## 🔒 Segurança

- Validação de tipos de arquivo
- Limite de 50MB por arquivo
- Limpeza automática de dados antigos
- URLs seguras para arquivos

## 🎨 Personalização

O projeto usa variáveis CSS para fácil customização:

\`\`\`css
:root {
  --primary-red: #dc2626;
  --primary-orange: #ff4500;
  --hot-orange: #ff6b35;
  --warm-red: #e53e3e;
  /* ... mais variáveis */
}
\`\`\`

## 📄 Licença

Este projeto está sob a licença MIT.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

---

**Lynx Chat-Bits** - Sistema de chat pixelizado em tempo real 🎮
=======
# lynx
Hub administrativo de conta e transferência com chat.
>>>>>>> 12accef801d0b0eb149f374688af68d697611e35
