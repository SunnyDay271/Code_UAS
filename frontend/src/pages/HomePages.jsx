export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 text-center">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold text-blue-600">Selamat Datang di GameHeaven</h1>
        <p className="text-lg text-gray-700">
          Platform untuk menukar, menjual, dan membeli item game favorit Anda. Jelajahi toko, kelola item trade Anda, dan temukan deal terbaik!
        </p>
      </header>
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-2xl font-semibold">Fitur Utama</h2>
        <ul className="list-disc list-inside text-left space-y-2">
          <li><strong>Trade Item:</strong> Tambah, edit, dan hapus item game Anda untuk ditukar.</li>
          <li><strong>Store:</strong> Lihat dan beli item game dari trader lain.</li>
          <li><strong>Mudah Digunakan:</strong> Interface sederhana dengan notifikasi real-time.</li>
        </ul>
      </div>
      <footer className="text-sm text-gray-500">
        Dibuat dengan React dan Express.js. © 2025 GameHeaven
      </footer>
    </div>
  );
}