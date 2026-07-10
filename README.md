[README (1).md](https://github.com/user-attachments/files/29881653/README.1.md)
# 🍿 CIKI-CIKI SNACK
> Proyek Pengembangan Platform E-Commerce Toko Kelontong Terintegrasi

---

### 👤 IDENTITAS MAHASISWA
* **Nama:** [Isi Nama Kamu]
* **NIM:** [Isi NIM Kamu]
* **Mata Kuliah:** [Isi Nama Mata Kuliah]
* **Program Studi:** [Isi Program Studi]
* **Semester:** Genap 2025/2026

---

## 🔗 LINK AKSES UTAMA
* **Link Live Website (Customer):** [Isi link GitHub Pages / hosting kamu di sini] untuk mengakses toko utama pelanggan.
* **Link Halaman Admin:** [Isi link yang sama]/admin/admin-login.html untuk masuk ke panel pengelolaan admin.
* **Link Repository GitHub:** [Isi link repository GitHub kamu di sini] untuk melihat *source code* repositori.

---

## 📝 DESKRIPSI & STRATEGI BISNIS

### 1. Judul Proyek
"Membangun Website E-Commerce Fungsional dengan Integrasi Strategi Bisnis Modern"

### 2. Business Overview & Analisis Manajemen Strategis

*   **Visi, Nama, & Konsep Bisnis:**
    **Ciki-Ciki Snack** didirikan sebagai platform *smart e-commerce* yang mengurasi jajanan kelontong sehari-hari mencakup kategori *keripik, kerupuk, coklat, permen, kacang, snack manis, snack kriuk,* hingga *biskuit* dari pilihan rasa yang akrab di lidah orang Indonesia. Bisnis ini tidak sekadar bertindak sebagai toko kelontong daring biasa, melainkan sebuah wadah kurasi (*curated marketplace*) yang menghadirkan pengalaman "belanja di warung sebelah rumah" secara digital — praktis, murah, dan tanpa antre.

*   **Proposisi Nilai Keunggulan (*Value Proposition*):**
    Kami mengusung tiga pilar nilai utama: *Harga Bersahabat, Transparansi Harga (harga coret untuk item promo),* dan *Kemudahan Pelacakan Pesanan*. Seluruh produk yang tersedia dipilih dari kategori jajanan yang paling dicari — mulai dari keripik pedas level, kerupuk gurih, sampai coklat dan biskuit. Di tengah maraknya toko daring yang penuh sesak dan sulit dinavigasi, Ciki-Ciki Snack menjamin pengalaman belanja yang ringkas — mulai dari eksplorasi katalog dengan filter kategori & pencarian, checkout dengan pilihan metode pembayaran, hingga pelacakan status pesanan — semuanya dalam satu alur yang intuitif.

*   **Segmentasi & Analisis Pasar Sasaran (*Target Market*):**
    Segmentasi pasar difokuskan pada demografi remaja hingga dewasa muda berusia 13–30 tahun, yang didominasi oleh pelajar, mahasiswa, dan pekerja muda (*early jobbers*) yang gemar ngemil saat belajar, kerja, atau nonton bareng. Berdasarkan analisis perilaku konsumen, segmen ini memiliki karakteristik sensitif terhadap harga, menyukai promo/diskon, dan lebih memilih belanja jajanan dalam jumlah kecil-menengah secara rutin dibanding sekali beli banyak.

*   **Analisis Lanskap Kompetitif (*Competitor Analysis*):**
    Di tengah ketatnya persaingan dengan *marketplace* besar dan warung kelontong konvensional, Ciki-Ciki Snack mengambil ceruk pasar (*niche market*) melalui strategi diferensiasi fokus pada kurasi jajanan lokal populer dengan kategori yang jelas dan halaman lacak pesanan mandiri. Kelemahan utama kompetitor massal adalah katalog yang terlalu luas dan tidak fokus (bercampur dengan ribuan kategori lain) serta proses cek status pesanan yang berbelit. Kami mengantisipasi hal tersebut dengan menghadirkan katalog yang benar-benar fokus pada jajanan kelontong saja, plus halaman **Lacak Pesanan** mandiri berbasis kode pesanan tanpa perlu login.

*   **Arsitektur Model Bisnis & Aliran Pendapatan (*Revenue Stream*):**
    Bisnis ini beroperasi dengan model **B2C (Business-to-Consumer) Online Retailer** murni, mengadopsi rantai pasok langsung dari distributor/produsen jajanan mitra guna memotong margin perantara yang tidak perlu. Aliran pendapatan utama (*primary revenue stream*) diperoleh secara langsung melalui selisih harga jual produk (*direct retail margin*) kepada konsumen akhir. Di masa mendatang, model ini dirancang untuk dapat berkembang ke arah paket langganan (*subscription snack box*) bulanan.

*   **Strategi Penetapan Harga & Manajemen Promosi (*Pricing & Promotion*):**
    Penetapan harga menggunakan pendekatan campuran antara *value-based pricing* (menyelaraskan harga dengan persepsi rasa & popularitas produk, contoh badge "Best Seller") dan *competitive pricing* untuk item-item dasar (*basic snacks*) yang populer. Untuk memicu keputusan pembelian, strategi promosi dirancang secara berkala menggunakan stimulus psikologis:
    *   **Label Harga Coret & Badge Promo:** Menampilkan harga lama vs harga sekarang (`oldPrice` vs `price`) beserta badge **Promo**, **Best Seller**, dan **Baru** pada kartu produk untuk mendorong urgensi beli.
    *   **Kurasi Kategori:** Mengelompokkan produk ke 8 kategori (Keripik, Kerupuk, Coklat, Permen, Kacang, Snack Manis, Snack Kriuk, Biskuit) demi mengoptimalkan *discoverability* dan nilai rata-rata transaksi per konsumen (*Average Order Value*) lewat cross-category browsing.

*   **Alur Checkout & Simulasi Arsitektur Transaksi (*Payment Workflow*):**
    Guna meminimalkan hambatan psikologis saat memproses pembayaran, alur transaksi dirancang seringkas mungkin (dari keranjang belanja hingga halaman sukses hanya lewat satu halaman `checkout.html`). Pengguna diarahkan untuk mengisi form pengiriman yang ringkas, diikuti dengan simulasi integrasi gerbang pembayaran otomatis (*dummy payment gateway*) untuk metode **Transfer Bank (simulasi Midtrans)**, **E-Wallet (simulasi Xendit)**, **QRIS** (lengkap dengan tampilan kode QRIS asli & fallback placeholder), maupun **COD**. Arsitektur ini mengadopsi standardisasi industri seperti sistem API Midtrans/Xendit, memastikan alur validasi data dan pencatatan status pesanan berjalan presisi dari sisi pengguna maupun panel admin.

*   **Rencana Optimasi Mesin Pencari & Analisis Metrik (*SEO & Analytics Plan*):**
    Implementasi teknis pada kode sumber menyertakan optimasi komponen *On-Page SEO*, seperti penggunaan struktur tag semantik (`<header>`, `<nav>`, `<section>`, `<footer>`), meta viewport untuk responsivitas, serta optimasi atribut `alt` pada seluruh aset gambar produk agar mudah diindeks oleh Google. Dari sisi operasional bisnis, keberhasilan performa digital web diukur menggunakan tiga metrik utama:
    1.  *Conversion Rate* (mengukur persentase pengunjung yang sukses melakukan *checkout*).
    2.  *Bounce Rate* (menganalisis relevansi konten halaman terhadap ekspektasi pengunjung).
    3.  *Cart Abandonment Rate* (memantau persentase pengguna yang menambahkan produk ke keranjang namun tidak menyelesaikan checkout, untuk kemudian dioptimalkan melalui perbaikan alur JavaScript).

---

## 🛠️ FITUR TEKNIS & DOKUMENTASI

### 1. Fitur Utama Website (Pure Vanilla HTML, CSS, JS)
* **Responsive Layout:** Implementasi penuh CSS Flexbox dan Grid untuk memastikan tampilan web tetap presisi baik di layar Desktop, Tablet, maupun *Smartphone*.
* **Katalog & Pencarian Produk:** Fitur pencarian produk secara *real-time*, filter berdasarkan 8 kategori jajanan, serta pengurutan (rekomendasi/harga naik-turun/nama) berbasis JavaScript.
* **Manajemen Keranjang Belanja:** Sistem penyimpanan keranjang belanja interaktif (drawer) dengan ubah jumlah & hapus item, sinkron otomatis menggunakan fitur `localStorage` pada browser.
* **Checkout Multi-Metode Pembayaran:** Form data pengiriman ringkas dengan simulasi 4 metode pembayaran — Transfer Bank, E-Wallet, **QRIS** (scan kode QRIS asli), dan COD.
* **Halaman Sukses Pesanan:** Ringkasan pesanan otomatis setelah checkout berhasil.
* **Pelacakan Pesanan (Order Tracking):** Halaman pencarian nomor pesanan mandiri (tanpa perlu akun/login) dengan visualisasi linimasa status (*Pesanan Diterima → Dikemas → Dikirim → Selesai*).
* **Panel Admin Terpisah:** Login khusus admin dengan proteksi sesi, dashboard ringkasan performa, manajemen produk (CRUD + upload foto), manajemen pesanan (ubah status, hapus), dan pengaturan (ganti password, reset katalog).
* **Auto-Sync Data Terbaru:** Mekanisme versi data (`DATA_VERSION`) di `js/data.js` yang memastikan perubahan katalog produk langsung terbaca browser tanpa perlu hapus cache manual.
* **Arsitektur Multi-Halaman:** Pemisahan halaman yang terstruktur antara katalog utama pelanggan, checkout, lacak pesanan, hingga panel login dan pengelolaan back-end untuk admin.

### 2. Struktur File Proyek
```text
ciki-ciki-snack/
├── index.html                   # Halaman Utama Toko (Katalog, Keranjang)
├── checkout.html                 # Form Pengisian Data & Simulasi Pembayaran (termasuk QRIS)
├── order-sukses.html             # Halaman Konfirmasi Transaksi Berhasil
├── lacak-pesanan.html            # Halaman Pelacakan Status Pesanan
│
├── admin/
│   ├── admin-login.html           # Halaman Autentikasi Keamanan Admin
│   ├── admin-dashboard.html       # Panel Monitoring & Ringkasan Data Admin
│   ├── admin-produk.html          # Manajemen Inventori Produk (Tambah/Edit/Hapus)
│   ├── admin-pesanan.html         # Panel Pemantauan & Pengelolaan Status Transaksi Masuk
│   ├── admin-pengaturan.html      # Ganti Password & Reset Data Katalog
│   ├── css/
│   │   └── admin.css               # Desain Tata Letak & Estetika Panel Admin
│   └── js/
│       ├── admin-common.js          # Kerangka Bersama: Sidebar, Logout, Toast, Proteksi Sesi
│       ├── admin-login.js
│       ├── admin-dashboard.js
│       ├── admin-produk.js
│       ├── admin-pesanan.js
│       └── admin-pengaturan.js
│
├── css/
│   └── style.css                  # Desain Visual & Responsivitas Halaman Utama/Customer
│
├── js/
│   ├── data.js                     # Data Produk Default (DEFAULT_PRODUCTS) + Helper localStorage bersama Toko & Admin
│   ├── store.js                    # Logika Halaman Utama: Katalog, Pencarian, Filter, Keranjang
│   ├── checkout.js                 # Logika Halaman checkout.html (form + metode pembayaran)
│   ├── order-sukses.js             # Logika Halaman order-sukses.html
│   └── lacak-pesanan.js            # Logika Halaman lacak-pesanan.html
│
├── image/                          # Direktori Aset Foto
│   ├── produk/                      # Foto produk jajanan
│   └── qris/                        # Foto kode QRIS (qris-code.png)
│
└── README.md                       # Dokumentasi Resmi Proyek
```

### 3. Kredensial Demo
| Peran    | Cara Akses                                                          |
|----------|----------------------------------------------------------------------|
| Customer | Buka `index.html`, langsung bisa belanja tanpa perlu daftar/masuk akun |
| Admin    | `admin/admin-login.html` — password default `admin123` (bisa diganti lewat halaman Pengaturan) |

### 4. Catatan Arsitektur Data
Karena proyek ini murni HTML/CSS/JS tanpa server sungguhan, seluruh "database" (produk & pesanan) disimpan di `localStorage`/`sessionStorage` browser lewat satu pusat logika bersama di `js/data.js`. Ini membuat data selalu konsisten antara sisi customer dan admin selama diakses dari browser yang sama (boleh beda tab): begitu pelanggan checkout, pesanan langsung muncul di `admin-dashboard.html` & `admin-pesanan.html`, dan begitu admin mengubah status pesanan, pelanggan langsung melihat status terbaru di `lacak-pesanan.html`. Untuk kebutuhan produksi sungguhan, seluruh fungsi helper di `js/data.js` cukup diganti dengan pemanggilan REST API ke server & database asli — struktur fungsinya sudah mengikuti pola CRUD backend supaya migrasinya mudah.

## 🔳 Menambahkan Foto QRIS
1. Siapkan foto/screenshot kode QRIS toko kamu.
2. Simpan dengan nama persis **`qris-code.png`** di folder `image/qris/`.
3. Selesai — begitu file itu ada, halaman checkout otomatis menampilkannya. Kalau belum ada, halaman checkout menampilkan kotak placeholder supaya tetap rapi (tidak ada gambar rusak).

## ▶️ Cara Menjalankan di VS Code
1. Buka folder `ciki-ciki-snack` di VS Code.
2. Install extension **Live Server** (by Ritwick Dey).
3. Klik kanan `index.html` → **Open with Live Server**.
4. Untuk membuka panel admin, buka `admin/admin-login.html` dengan cara yang sama, atau klik link **"Masuk Admin"** di footer toko.

> Tanpa Live Server pun bisa, tinggal buka file `index.html` langsung di browser — tapi beberapa browser membatasi fitur `localStorage`/upload gambar kalau dibuka lewat `file://`, jadi Live Server lebih disarankan.

## 📤 Cara Upload ke GitHub (repository baru)
```bash
git init
git add .
git commit -m "Initial commit: Ciki-Ciki Snack toko + admin"
git branch -M main
git remote add origin https://github.com/USERNAME-KAMU/NAMA-REPO.git
git push -u origin main
```
Ganti `USERNAME-KAMU` dan `NAMA-REPO` sesuai akun GitHub kamu.

Setelah itu, aktifkan **GitHub Pages** supaya bisa diakses online:
1. Buka repo di GitHub → **Settings** → **Pages**
2. Pada **Branch**, pilih `main` dan folder `/ (root)` → **Save**
3. Tunggu 1-2 menit, situs akan aktif di `https://USERNAME-KAMU.github.io/NAMA-REPO/`

## ⚠️ Catatan
- Ini adalah proyek simulasi untuk keperluan tugas/demo. Pembayaran, pengiriman, dan status pesanan bersifat simulasi (tidak ada transaksi nyata).
- Data tersimpan per-browser (`localStorage`). Jika membuka di browser/perangkat lain, data tidak ikut terbawa.
