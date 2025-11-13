import { useEffect, useState } from "react";

/**
 * Form sederhana untuk Tambah/Update Item Game.
 * - Jika `editingItem` terisi, form beralih ke mode edit.
 * - onSuccess dipanggil setelah submit berhasil untuk refresh tabel & reset form.
 */
export default function ItemForm({
  editingItem,
  onCancelEdit,
  onSubmit,
}) {
  const [form, setForm] = useState({
    item_name: "",
    game: "",
    price: "",
    quantity: "",
    trader_name: "",
  });

  useEffect(() => {
    if (editingItem) {
      setForm({
        item_name: editingItem.item_name || "",
        game: editingItem.game || "",
        price: editingItem.price || "",
        quantity: editingItem.quantity || "",
        trader_name: editingItem.trader_name || "",
      });
    } else {
      setForm({ item_name: "", game: "", price: "", quantity: "", trader_name: "" });
    }
  }, [editingItem]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await onSubmit(form);
    setForm({ item_name: "", game: "", price: "", quantity: "", trader_name: "" });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 bg-white p-4 rounded-xl shadow"
    >
      <h2 className="text-lg font-semibold">
        {editingItem ? "Edit Item Game" : "Tambah Item Game"}
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <input
          name="item_name"
          value={form.item_name}
          onChange={handleChange}
          placeholder="Nama Item (mis. Pedang Api)"
          className="border rounded px-3 py-2"
          required
        />
        <input
          name="game"
          value={form.game}
          onChange={handleChange}
          placeholder="Game (mis. Fortnite)"
          className="border rounded px-3 py-2"
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Harga"
          type="number"
          step="0.01"
          className="border rounded px-3 py-2"
          required
        />
        <input
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Kuantitas"
          type="number"
          className="border rounded px-3 py-2"
          required
        />
        <input
          name="trader_name"
          value={form.trader_name}
          onChange={handleChange}
          placeholder="Nama Trader"
          className="border rounded px-3 py-2"
          required
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          {editingItem ? "Simpan Perubahan" : "Tambah"}
        </button>
        {editingItem && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-4 py-2 rounded bg-gray-200"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}