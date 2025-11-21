// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { CartProvider, useCart } from "./context/cartContext";
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
function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn) {
      setProfile({
        id: localStorage.getItem("userId"),
        name: localStorage.getItem("userName"),
        email: localStorage.getItem("userEmail"),
        avatar: localStorage.getItem("userAvatar") || "/default-avatar.png",
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userAvatar");
    setProfile(null);
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="flex gap-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/trade" className="hover:underline">Trade Item</Link>
          <Link to="/store" className="hover:underline">Store</Link>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/cart" className="hover:underline">Keranjang ({totalItems})</Link>

          {profile ? (
            <div className="flex items-center gap-2">
              <Link to="/profile" className="hover:underline flex items-center gap-2">
                <img src={profile.avatar} alt="Avatar" className="w-7 h-7 rounded-full border" />
                <span>{profile.name}</span>
              </Link>
              <button onClick={handleLogout} className="bg-red-500 px-2 py-1 rounded hover:bg-red-600">Logout</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

// Protected route
function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />

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
