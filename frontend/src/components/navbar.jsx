import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";

export default function Navbar({ darkMode, toggleDarkMode }) {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, cartItem) => sum + cartItem.quantity, 0);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState("/default-avatar.jpg"); // default avatar

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    const profileAvatar = localStorage.getItem("profileAvatar");
    setIsLoggedIn(!!loginStatus);
    if (profileAvatar) setAvatar(profileAvatar);
  }, []);

  return (
    <nav
      className={`p-4`}
      style={{
        backgroundColor: darkMode ? "#1e293b" : "#2563eb",
        color: "white",
      }}
    >
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="flex gap-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/trade" className="hover:underline">Trade Item</Link>
          <Link to="/store" className="hover:underline">Store</Link>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/cart" className="hover:underline">
            Keranjang ({totalItems})
          </Link>

          {isLoggedIn ? (
            <Link to="/profile" className="flex items-center gap-1">
              <img
                src={avatar}
                alt="Profil"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            </Link>
          ) : (
            <Link to="/login" className="hover:underline">Login</Link>
          )}

          {/* Tombol toggle dark mode */}
          <button
            onClick={toggleDarkMode}
            className={`ml-4 px-3 py-1 rounded ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
            }`}
          >
            {darkMode ? "Light🌞" : "Dark🌜"}
          </button>
        </div>
      </div>
    </nav>
  );
}
