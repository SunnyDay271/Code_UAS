import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { getItems } from "../api";
import { useCart } from "../context/cartContext";

export default function StorePage() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);  // Data yang difilter
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");  // Untuk search
  const [selectedGame, setSelectedGame] = useState("");  // Filter game
  const [priceRange, setPriceRange] = useState("");  // Filter harga
  const { cart, addToCart } = useCart();

  async function load() {
    setLoading(true);
    const data = await getItems();
    setItems(data);
    setFilteredItems(data);  // Set awal tanpa filter
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  // Fungsi untuk apply filter dan search
  useEffect(() => {
    let filtered = items;

    // Filter berdasarkan search query (nama item atau game)
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.game.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter berdasarkan game
    if (selectedGame) {
      filtered = filtered.filter(item => item.game === selectedGame);
    }

    // Filter berdasarkan harga
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter(item => item.price >= min && item.price <= max);
    }

    setFilteredItems(filtered);
  }, [searchQuery, selectedGame, priceRange, items]);

  // Fungsi reset filter
  function resetFilters() {
    setSearchQuery("");
    setSelectedGame("");
    setPriceRange("");
  }

  // Dapatkan list game unik untuk dropdown
  const uniqueGames = [...new Set(items.map(item => item.game))];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Store — Item Game Tersedia</h1>
        <p className="text-sm text-gray-600">
          Cari dan filter item favorit Anda.
        </p>
      </header>

      {/* Search dan Filter Controls */}
      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <div className="flex flex-wrap gap-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Cari nama item atau game..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
          />

          {/* Filter Game */}
          <select
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">Semua Game</option>
            {uniqueGames.map(game => (
              <option key={game} value={game}>{game}</option>
            ))}
          </select>

          {/* Filter Harga */}
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">Semua Harga</option>
            <option value="0-50">0 - 50</option>
            <option value="50-100">50 - 100</option>
            <option value="100-200">100 - 200</option>
            <option value="200-9999">200+</option>
          </select>

          {/* Reset Button */}
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
          >
            Reset
          </button>

          {/* Refresh Button */}
          <button
            onClick={load}
            className="px-4 py-2 rounded bg-gray-800 text-white"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Daftar Item */}
      {loading ? (
        <div className="text-sm">Memuat...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.length === 0 ? (
            <p className="col-span-full text-center">Tidak ada item yang cocok dengan filter.</p>
          ) : (
            filteredItems.map((item) => {
              const inCart = cart.some(cartItem => cartItem.item.id === item.id);
              return (
                <div key={item.id} className="bg-white p-4 rounded-xl shadow space-y-2">
                  <h3 className="font-semibold">{item.item_name}</h3>
                  <p className="text-sm text-gray-600">Game: {item.game}</p>
                  <p className="text-sm text-gray-600">Harga: {item.price}</p>
                  <p className="text-sm text-gray-600">Kuantitas Tersedia: {item.quantity}</p>
                  <p className="text-sm text-gray-600">Trader: {item.trader_name}</p>
                  <button
                    onClick={() => addToCart(item)}
                    disabled={inCart}
                    className={`w-full px-4 py-2 rounded ${
                      inCart
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {inCart ? "Sudah di Keranjang" : "Masukkan ke Keranjang"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}