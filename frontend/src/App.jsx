// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/cartContext";
import { useState, useEffect } from "react";

// Pages
import HomePage from "./pages/HomePages";
import TradePage from "./pages/TradePages";
import StorePage from "./pages/StorePages";
import CartPage from "./pages/CartPages";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

// Navbar
import Navbar from "./components/navbar";

// Protected route
function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Load preferensi dari localStorage saat mount
  useEffect(() => {
    const savedDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDark);
  }, []);

  // Toggle dan simpan ke localStorage
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem("darkMode", !prev);
      return !prev;
    });
  };

  return (
    <CartProvider>
      <Router>
        {/* Wrapper div untuk seluruh halaman */}
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"} min-h-screen transition-colors duration-300`}>
          {/* Kirim props darkMode & toggleDarkMode ke Navbar */}
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          <Routes>
            {/* Public */}
            <Route path="/" element={<HomePage />} />
            <Route path="/trade" element={<TradePage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected */}
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}
