// src/pages/LoginPage.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      alert("Email dan password harus diisi!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", formData);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", res.data.user.id);

      alert("Login berhasil!");
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Login gagal!");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      <label className="block mb-2">
        Email:
        <input type="email" name="email" className="border rounded p-2 w-full mt-1" onChange={handleChange} />
      </label>

      <label className="block mb-2">
        Password:
        <input type="password" name="password" className="border rounded p-2 w-full mt-1" onChange={handleChange} />
      </label>

      <button onClick={handleLogin} className="bg-blue-500 text-white w-full py-2 rounded mt-4 hover:bg-blue-600">
        Login
      </button>

      <p className="text-center mt-4">
        Belum punya akun?{" "}
        <span className="text-green-600 cursor-pointer" onClick={() => navigate("/register")}>Daftar</span>
      </p>
    </div>
  );
}
