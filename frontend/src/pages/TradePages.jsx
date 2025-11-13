import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { getItems, createItem, updateItem, deleteItem } from "../api";  // Ensure api.js exists in src/
import ItemForm from "../components/itemForm";  // Path should be correct if components/ is in src/
import ItemTable from "../components/ItemTable";

/**
 * Halaman Trade Item: Manajemen CRUD untuk item game.
 */
export default function TradePage() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await getItems();
      setItems(data);
    } catch (err) {
      console.error("Error loading items:", err);
      Swal.fire({
        icon: "error",
        title: "Gagal Memuat Data",
        text: "Periksa koneksi backend atau API.",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  async function handleCreate(payload) {
    try {
      if (editing) {
        await updateItem(editing.id, payload);
        setEditing(null);
        Toast.fire({ icon: "success", title: "Perubahan disimpan" });
      } else {
        await createItem(payload);
        Toast.fire({ icon: "success", title: "Item berhasil ditambahkan" });
      }
      await load();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err?.message || "Terjadi kesalahan",
      });
    }
  }

  async function handleDelete(id) {
    const result = await Swal.fire({
      title: "Hapus item?",
      text: "Data yang dihapus tidak bisa dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await deleteItem(id);
        Toast.fire({ icon: "success", title: "Data berhasil dihapus" });
        await load();
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Gagal menghapus",
          text: err?.message || "Terjadi kesalahan",
        });
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Manajemen Item Game — Trade</h1>
        <p className="text-sm text-gray-600">
          Tempat dimana kamu bisa: tambah, lihat, edit, hapus data item game (tidak disarankan karna akan menghapus item orang lain).
        </p>
      </header>

      <ItemForm
        editingItem={editing}
        onCancelEdit={() => setEditing(null)}
        onSubmit={handleCreate}
      />

      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Daftar Item Game</h2>
        <button
          onClick={load}
          className="px-3 py-1 rounded bg-gray-800 text-white"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-sm">Memuat...</div>
      ) : (
        <ItemTable
          data={items}
          onEdit={setEditing}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}