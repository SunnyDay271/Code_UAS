// src/pages/ProfilePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  // Ambil data dari localStorage
  const [profile, setProfile] = useState({
    id: localStorage.getItem("userId"),
    name: localStorage.getItem("userName"),
    email: localStorage.getItem("userEmail"),
    avatar: localStorage.getItem("userAvatar") || "/default-avatar.png",
  });

  // Cek apakah user sudah login
  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/login"); // redirect ke login jika belum login
    }
  }, [navigate]);

  // Jika profile tidak ditemukan, tampilkan pesan loading atau kosong
  if (!profile.name) {
    return (
      <div className="p-8 max-w-md mx-auto bg-white rounded shadow mt-10 text-center">
        <h2>Loading...</h2>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userAvatar");
    navigate("/login");
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded shadow mt-10 text-center">
      <img src={profile.avatar} alt="Avatar" className="w-24 h-24 rounded-full mx-auto mb-4" />
      <h2 className="text-2xl font-bold">{profile.name}</h2>
      <p className="text-gray-600">{profile.email}</p>

      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600">
        Logout
      </button>
    </div>
  );
}
