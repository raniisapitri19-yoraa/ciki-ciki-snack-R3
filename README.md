# 🍿 Ciki-Ciki Snack

Website toko kelontong online **Ciki-Ciki Snack** lengkap dengan **panel admin**, dibuat dengan HTML, CSS, dan JavaScript murni (tanpa framework/backend). Data produk & pesanan disimpan di `localStorage` browser, jadi toko dan admin panel tetap saling terhubung walau tanpa database sungguhan — cocok untuk tugas kuliah atau demo.

## ✨ Fitur

### Toko (`index.html` + halaman terkait)
- Hero, statistik toko, dan navigasi responsif
- Katalog produk: cari, filter kategori, urutkan (harga/nama)
- Keranjang belanja (drawer) dengan ubah jumlah & hapus item
- **Checkout** (`checkout.html`) — form data pengiriman + pilih metode pembayaran
- Simulasi metode pembayaran: Transfer Bank / E-Wallet / **QRIS** (scan kode QRIS) / COD
- **Sukses pesanan** (`order-sukses.html`) — ringkasan pesanan setelah checkout
- **Lacak pesanan** (`lacak-pesanan.html`) — cek status pengiriman berdasarkan kode pesanan
- Testimoni pelanggan & footer informasi kontak

### Admin (`admin/`)
- Login dengan kata sandi (default: `admin123`, bisa diganti) — `admin-login.html`
- Dashboard: total pendapatan, total pesanan, pesanan menunggu, produk aktif, pesanan terbaru, produk terlaris — `admin-dashboard.html`
- Manajemen produk: tambah/edit/hapus, upload foto produk (opsional, kalau kosong pakai emoji), filter kategori — `admin-produk.html`
- Manajemen pesanan: filter status, detail pesanan, ubah status, hapus pesanan — `admin-pesanan.html`
- Pengaturan: ganti kata sandi admin, reset katalog ke bawaan, hapus semua data pesanan — `admin-pengaturan.html`

### 🔗 Toko ⇄ Admin selalu tersambung
Semua data (produk, pesanan, keranjang, status login admin) disimpan di
`localStorage`/`sessionStorage` lewat helper bersama `js/data.js`. Jadi
begitu pelanggan checkout di `checkout.html`, pesanan itu **langsung**
muncul di `admin/admin-dashboard.html` & `admin/admin-pesanan.html` — dan
begitu admin mengubah status pesanan di panel admin, pelanggan langsung
lihat status terbaru di `lacak-pesanan.html`. Tidak perlu refresh server
atau database terpisah karena semuanya baca/tulis ke sumber yang sama.

## 🗂️ Struktur folder

```
ciki-ciki-snack/
├── index.html            # Halaman toko
├── checkout.html          # Form checkout + metode pembayaran (termasuk QRIS)
├── order-sukses.html      # Halaman sukses setelah checkout
├── lacak-pesanan.html     # Halaman lacak status pesanan
├── css/
│   └── style.css         # Styling bersama (toko + dasar admin: variabel, tombol, form, modal, toast)
├── js/
│   ├── data.js            # Data produk default + helper localStorage (dipakai bersama toko & admin)
│   ├── store.js           # Logika halaman toko (katalog, keranjang)
│   ├── checkout.js        # Logika halaman checkout.html
│   ├── order-sukses.js    # Logika halaman order-sukses.html
│   └── lacak-pesanan.js   # Logika halaman lacak-pesanan.html
├── image/                 # Semua foto/gambar yang dibutuhkan situs
│   ├── produk/             # Foto produk
│   └── qris/               # Foto kode QRIS (taruh sebagai qris-code.png)
├── admin/                  # Panel admin (multi-halaman, terpisah dari toko)
│   ├── admin-login.html      # Halaman login admin
│   ├── admin-dashboard.html  # Ringkasan performa toko
│   ├── admin-produk.html     # Manajemen produk
│   ├── admin-pesanan.html    # Manajemen pesanan
│   ├── admin-pengaturan.html # Ganti password & reset data
│   ├── css/
│   │   └── admin.css         # Styling khusus admin (sidebar, dashboard, panel, tabel, login)
│   └── js/
│       ├── admin-common.js     # Helper bersama: sidebar, logout, toast, penjaga login
│       ├── admin-login.js
│       ├── admin-dashboard.js
│       ├── admin-produk.js
│       ├── admin-pesanan.js
│       └── admin-pengaturan.js
└── README.md
```

## 🔳 Menambahkan foto QRIS

Alur pembayaran QRIS sudah jadi di `checkout.html` (tinggal pilih metode
"QRIS" saat checkout). Supaya kode QRIS-nya muncul:

1. Siapkan foto/screenshot kode QRIS toko kamu.
2. Simpan dengan nama persis **`qris-code.png`** di folder `image/qris/`.
3. Selesai — begitu file itu ada, halaman checkout otomatis menampilkannya.
   Kalau belum ada, halaman checkout menampilkan kotak placeholder supaya
   tetap rapi (tidak ada gambar rusak).

## ▶️ Cara menjalankan di VS Code

1. Buka folder `ciki-ciki-snack` di VS Code.
2. Install extension **Live Server** (by Ritwick Dey).
3. Klik kanan `index.html` → **Open with Live Server**.
4. Untuk membuka panel admin, buka `admin/admin-login.html` dengan cara yang sama, atau klik link **"Masuk Admin"** di footer toko.

> Tanpa Live Server pun bisa, tinggal buka file `index.html` langsung di browser — tapi beberapa browser membatasi fitur upload gambar/localStorage kalau dibuka lewat `file://`, jadi Live Server lebih disarankan.

## 📤 Cara upload ke GitHub (repository baru)

Jalankan perintah berikut di **Terminal VS Code** (folder project ini):

```bash
git init
git add .
git commit -m "Initial commit: Ciki-Ciki Snack toko + admin"
git branch -M main
git remote add origin https://github.com/USERNAME-KAMU/NAMA-REPO.git
git push -u origin main
```

Ganti `USERNAME-KAMU` dan `NAMA-REPO` sesuai akun GitHub kamu, misalnya:

```bash
git remote add origin https://github.com/raniisapitri19-yoraa/ciki-ciki-snack.git
```

Setelah itu, aktifkan **GitHub Pages** supaya bisa diakses online:
1. Buka repo di GitHub → **Settings** → **Pages**
2. Pada **Branch**, pilih `main` dan folder `/ (root)` → **Save**
3. Tunggu 1-2 menit, situs akan aktif di `https://USERNAME-KAMU.github.io/NAMA-REPO/`

## ⚠️ Catatan

- Ini adalah proyek simulasi untuk keperluan tugas/demo. Pembayaran, pengiriman, dan status pesanan bersifat simulasi (tidak ada transaksi nyata).
- Data tersimpan per-browser (localStorage). Jika membuka di browser/perangkat lain, data tidak ikut terbawa.
