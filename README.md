**Deskripsi**

🎮 GameHeaven

Platform lengkap untuk trading item game dengan frontend React dan backend Express.js menggunakan MySQL. GameHeaven memungkinkan pengguna menjelajahi, membeli, dan menjual item game dengan mudah dan aman.

✨ Fitur Utama
| Fitur                    | Deskripsi                                                                                                  |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| **Autentikasi Pengguna** | Registrasi, login, dan profil pengguna. Data disimpan di `localStorage` (frontend) dan database (backend). |
| **Manajemen Item Trade** | Tambah, edit, hapus item game (CRUD) di halaman Trade.                                                     |
| **Toko (Store)**         | Jelajahi item game dengan pencarian dan filter berdasarkan nama, game, dan harga.                          |
| **Keranjang Belanja**    | Tambahkan item, lihat total, dan simulasi pembelian.                                                       |
| **Notifikasi**           | SweetAlert2 untuk konfirmasi dan toast.                                                                    |
| **Responsive Design**    | UI responsif dengan Tailwind CSS.                                                                          |
| **API Backend**          | Endpoint untuk autentikasi dan item game dengan error handling.                                            |

**CORS – Cross-origin requests**
**Fitur Utama**
- Autentikasi Pengguna: Registrasi, login, dan profil dengan penyimpanan di localStorage (frontend) dan database (backend).
- Manajemen Item Trade: Tambah, edit, hapus item game (CRUD) di halaman Trade.
- Toko (Store): Jelajahi item game dengan pencarian dan filter berdasarkan nama, game, dan harga.
- Keranjang Belanja: Tambahkan item, lihat total, dan simulasi pembelian.
- Notifikasi: Menggunakan SweetAlert2 untuk konfirmasi dan toast.
- Responsive Design: UI responsif dengan Tailwind CSS.
- API Backend: Endpoint untuk autentikasi dan item game dengan error handling.


🛠️ Teknologi yang Digunakan

**-Frontend**

- React – Library utama untuk UI
- Vite – Build tool & dev server
- React Router DOM – Routing halaman
- Axios – HTTP requests ke backend
- SweetAlert2 – Dialog & notifikasi
- Tailwind CSS – Styling modern
- Context API – Manajemen state keranjang

**-Backend**

- Express.js – Framework web Node.js
- MySQL2 – Driver koneksi database MySQL
- dotenv – Environment variables

**⚡ Prasyarat**

- Node.js ≥ 16
- MySQL Server (XAMPP, MySQL Workbench, dll)
- Database MySQL bernama game_trade

- Setup Database
Buat database MySQL bernama game_trade.

Jalankan query berikut untuk membuat tabel:

Tabel **users**:
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar VARCHAR(255) DEFAULT '/default-avatar.png'
);

Tabel **game_items**:
CREATE TABLE game_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_name VARCHAR(255) NOT NULL,
  game VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL,
  trader_name VARCHAR(255) NOT NULL
);

**Instalasi**
Frontend
Buka folder frontend.
Jalankan: npm install.

Backend
Buka folder backend.
Jalankan: npm install.
Buat file .env di folder backend dan isi:
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=  # Isi password MySQL Anda jika ada
DB_NAME=game_trade

**Menjalankan Aplikasi**
- Backend: Jalankan node index.js di folder backend. Server berjalan di http://localhost:3000.
- Frontend: Jalankan npm run dev di folder frontend. Aplikasi berjalan di http://localhost:5173.
Akses frontend di browser. Pastikan backend aktif untuk API calls.

**Struktur Proyek**

Code_UAS/

├── frontend/

│   ├── public/                 # File statis (mis. gambar avatar)

│   ├── src/

│   │   ├── api.js             # Fungsi API untuk CRUD item

│   │   ├── components/        # Komponen reusable (ItemForm, ItemTable)

│   │   ├── context/

│   │   │   └── cartContext.jsx # Context keranjang

│   │   ├── pages/             # Halaman (Home, Trade, Store, dll.)

│   │   ├── App.jsx            # Routing utama

│   │   └── main.jsx           # Entry point React

│   ├── package.json           # Dependensi frontend

│   └── vite.config.js         # Konfigurasi Vite

├── backend/

│   ├── .env                   # Environment variables

│   ├── index.js               # Entry point server Express

│   ├── config/

│   │   └── db.js              # Konfigurasi database MySQL

│   ├── routes/

│   │   ├── auth.js            # Router autentikasi

│   │   └── items.js           # Router CRUD item

│   └── package.json           # Dependensi backend

└── README.md                  # File ini

**API Endpoints (Backend)**
Autentikasi (/api/auth)
POST /api/auth/register: Registrasi. Body: { name, email, password, avatar }.
POST /api/auth/login: Login. Body: { email, password }.
GET /api/auth/profile/:id: Profil pengguna.

**Item Game (/api/items)**
GET /api/items: Ambil semua item.
GET /api/items/:id: Detail item.
POST /api/items: Tambah item. Body: { item_name, game, price, quantity, trader_name }.
PUT /api/items/:id: Update item.
DELETE /api/items/:id: Hapus item.

**Catatan**
Keamanan: Password backend disimpan plain text; gunakan hashing untuk production.
Frontend: Data disimpan di localStorage; pembelian simulasi.
Error Handling: Backend dan frontend memiliki error handling dasar.
CORS: Backend mengizinkan origin http://localhost:5173.
Jika error koneksi, periksa .env dan database.

**Kontribusi**
Fork repository, buat branch baru, dan ajukan pull request.

**Lisensi**
Proyek edukasi. © 2025 GameHeaven. Lisensi MIT.
