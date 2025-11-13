import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider, useCart } from './context/cartContext';
import HomePage from './pages/HomePages';
import TradePage from './pages/TradePages';
import StorePage from './pages/StorePages';
import CartPage from './pages/CartPages';

// Komponen Navbar terpisah untuk menggunakan Context
function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, cartItem) => sum + cartItem.quantity, 0);

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="flex gap-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/trade" className="hover:underline">Trade Item</Link>
          <Link to="/store" className="hover:underline">Store</Link>
        </div>
        <Link to="/cart" className="hover:underline">
          Keranjang ({totalItems})
        </Link>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/trade" element={<TradePage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}