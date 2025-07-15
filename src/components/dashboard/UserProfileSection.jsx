"use client"
import { FaImage, FaUserEdit, FaUserCircle } from "react-icons/fa"

export default function UserProfileSection({ user, userPhoto, handleAddPhoto, handlePersonalization, handleProfile }) {
  return (
    <div className="user-profile-section">
      <h2 className="user-name">{user?.nome || user?.email || "Usuário"}</h2>
      <div className="user-photo-wrapper" onClick={handleAddPhoto}>
        {userPhoto ? (
          <img src={userPhoto || "/placeholder.svg"} alt="Avatar do Usuário" className="user-photo" />
        ) : (
          <div className="user-photo-placeholder">
            <FaImage />
            <span>Adicionar Foto</span>
          </div>
        )}
      </div>
      <div className="profile-buttons">
        <button className="btn-personalization" onClick={handlePersonalization}>
          <FaUserEdit /> Personalização
        </button>
        <button className="btn-profile" onClick={handleProfile}>
          <FaUserCircle /> Perfil
        </button>
      </div>
    </div>
  )
}
