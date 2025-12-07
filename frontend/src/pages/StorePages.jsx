// src/pages/StorePages.jsx
import { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";
import Swal from "sweetalert2";

export default function StorePage({ darkMode = false }) {  // tambah props darkMode, default false
  const [storeItems, setStoreItems] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadItems() {
      try {
        const res = await fetch("http://localhost:3000/api/items");
        if (!res.ok) throw new Error("Gagal memuat data");

        const data = await res.json();
        setStoreItems(data);
      } catch (err) {
        console.error("Error memuat toko:", err);
        Swal.fire("Error", "Gagal memuat data store", "error");
      }
    }

    loadItems();
  }, []);

  // 🔔 Soft Alert Toast
  const toast = Swal.mixin({
    toast: true,
    position: "top-end",
    iconColor: "white",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    customClass: {
      popup: "colored-toast",
    },
  });

  return (
    <div className={`max-w-5xl mx-auto p-6 ${darkMode ? "bg-gray-900 text-white" : ""}`}>
      <h1 className="text-2xl font-bold mb-4">Store Item</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {storeItems.map((item) => (
          <div
            key={item.id}
            className={`border p-4 rounded shadow flex flex-col justify-between
              ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
          >
            <div>
              <h2 className="text-lg font-semibold">{item.item_name}</h2>
              <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                Game: {item.game}
              </p>
              <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                Harga: Rp {item.price}
              </p>

              <p
                className={`mt-1 font-semibold ${
                  item.quantity === 0
                    ? (darkMode ? "text-red-400" : "text-red-500")
                    : (darkMode ? "text-green-400" : "text-green-600")
                }`}
              >
                Stok: {item.quantity}
              </p>

              <p className={darkMode ? "text-gray-400 text-sm mt-1" : "text-gray-500 text-sm mt-1"}>
                Trader: {item.trader_name}
              </p>
            </div>

            <button
              onClick={() => {
                addToCart(item);

                // 🎉 Soft alert ketika item ditambahkan
                toast.fire({
                  icon: "success",
                  title: `${item.item_name} ditambahkan ke keranjang`,
                });
              }}
              disabled={item.quantity === 0}
              className={`mt-4 px-3 py-2 rounded text-center transition font-semibold
                ${
                  item.quantity === 0
                    ? (darkMode
                      ? "bg-gray-600 cursor-not-allowed text-gray-400"
                      : "bg-gray-400 cursor-not-allowed text-gray-700")
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }
              `}
            >
              {item.quantity === 0 ? "Stok Habis" : "Tambah ke Keranjang"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
