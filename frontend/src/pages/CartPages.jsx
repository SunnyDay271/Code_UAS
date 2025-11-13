import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useCart } from "../context/cartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce((sum, cartItem) => sum + (cartItem.item.price * cartItem.quantity), 0);

  async function buyCart() {
    if (cart.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Keranjang Kosong",
        text: "Tambahkan item ke keranjang terlebih dahulu.",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Beli Item di Keranjang?",
      text: `Total: ${totalPrice.toFixed(2)} | Item: ${cart.length}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, beli",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Pembelian Berhasil!",
        text: `Anda telah membeli ${cart.length} item. Total: ${totalPrice.toFixed(2)}. (Ini simulasi)`,
      });
      clearCart();
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Keranjang Belanja</h1>
        <p className="text-sm text-gray-600">
          Lihat item yang Anda pilih sebelum membeli.
        </p>
      </header>

      {cart.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-600">Keranjang kosong. Kunjungi Store untuk menambahkan item.</p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="font-semibold">Item di Keranjang</h2>
          {cart.map((cartItem) => (
            <div key={cartItem.item.id} className="flex justify-between items-center border-b pb-4">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="font-medium">{cartItem.item.item_name}</h3>
                  <p className="text-sm text-gray-600">Game: {cartItem.item.game}</p>
                  <p className="text-sm text-gray-600">Trader: {cartItem.item.trader_name}</p>
                  <p className="text-sm text-gray-600">Qty: {cartItem.quantity}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{(cartItem.item.price * cartItem.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(cartItem.item.id)}
                  className="mt-2 px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center font-semibold text-lg">
            <span>Total: {totalPrice.toFixed(2)}</span>
            <div className="space-x-2">
              <button
                onClick={clearCart}
                className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
              >
                Kosongkan Keranjang
              </button>
              <button
                onClick={buyCart}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}