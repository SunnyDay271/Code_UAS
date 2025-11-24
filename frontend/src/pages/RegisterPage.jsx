// src/pages/RegisterPage.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", avatar: "/default-avatar.png" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      alert("Semua field harus diisi!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", formData);
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register gagal!");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      <label className="block mb-2">
        Nama:
        <input type="text" name="name" className="border rounded p-2 w-full mt-1" onChange={handleChange} />
      </label>

      <label className="block mb-2">
        Email:
        <input type="email" name="email" className="border rounded p-2 w-full mt-1" onChange={handleChange} />
      </label>

      <label className="block mb-2">
        Password:
        <input type="password" name="password" className="border rounded p-2 w-full mt-1" onChange={handleChange} />
      </label>

      <button onClick={handleRegister} className="bg-green-500 text-white w-full py-2 rounded mt-4 hover:bg-green-600">
        Daftar
      </button>

      <p className="text-center mt-4">
        Sudah punya akun?{" "}
        <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/login")}>Login</span>
      </p>
    </div>
  );
}
