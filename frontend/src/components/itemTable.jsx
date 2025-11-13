/**
 * Tabel daftar item game:
 * - Klik tombol Edit: lempar data ke parent agar form masuk mode edit.
 * - Hapus: konfirmasi sederhana lalu panggil onDelete(id).
 */
export default function ItemTable({ data, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3">ID</th>
            <th className="text-left p-3">Nama Item</th>
            <th className="text-left p-3">Game</th>
            <th className="text-left p-3">Harga</th>
            <th className="text-left p-3">Kuantitas</th>
            <th className="text-left p-3">Nama Trader</th>
            <th className="text-left p-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className="p-3" colSpan="7">
                Belum ada data.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{item.id}</td>
                <td className="p-3">{item.item_name}</td>
                <td className="p-3">{item.game}</td>
                <td className="p-3">{item.price}</td>
                <td className="p-3">{item.quantity}</td>
                <td className="p-3">{item.trader_name}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="px-3 py-1 rounded bg-amber-500 text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="px-3 py-1 rounded bg-rose-600 text-white"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}