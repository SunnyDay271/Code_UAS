const API_BASE = "http://localhost:3000/api/items";

export async function getItems() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Gagal mengambil data item");
  return res.json();
}

export async function createItem(payload) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Gagal menambah item");
  return res.json();
}

export async function updateItem(id, payload) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Gagal memperbarui item");
  return res.json();
}

export async function deleteItem(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Gagal menghapus item");
  return res.json();
}