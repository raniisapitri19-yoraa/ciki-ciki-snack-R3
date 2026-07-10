# 📷 Folder `image/`

Tempat menyimpan semua foto yang dipakai website Ciki-Ciki Snack.

```
image/
├── produk/   # Foto 10 produk asli (sudah terisi)
└── qris/     # Foto kode QRIS untuk pembayaran di checkout (belum terisi)
```

## Foto produk (sudah terpasang ✅)

10 foto berikut sudah ada di `image/produk/` dan sudah otomatis dirujuk
oleh katalog bawaan di `js/data.js`:

| File | Dipakai untuk produk |
|---|---|
| `stik-kentang-pedas-level-3.jpeg` | Stik Kentang Pedas Level 3 |
| `kerupuk-bawang-gurih.jpeg` | Kerupuk Bawang Gurih |
| `wafer-coklat-legit.jpeg` | Wafer Coklat Legit |
| `kripik-singkong-balado.jpeg` | Keripik Singkong Balado |
| `permen-jeruk-mint-manis.jpeg` | Permen Jeruk Mint Manis |
| `coklat-batang-susu.jpeg` | Coklat Batang Susu |
| `kacang-atom-pedas-manis.jpeg` | Kacang Atom Pedas Manis |
| `jagung-manis-caramel.jpeg` | Jagung Manis Caramel |
| `kriuk-balls-original.jpeg` | Kriuk Balls Original |
| `biskuit-malkist-krim-vanila.jpeg` | Biskuit Malkist Krim Vanila |

Mau ganti foto atau tambah produk baru? Paling gampang lewat Admin Panel:
buka `admin/admin-produk.html` → tambah/edit produk → upload foto di field
"Foto Produk". Bisa juga taruh file manual di folder ini lalu tulis
path-nya langsung di `js/data.js` (field `image`).

> **Penting:** kalau browser kamu sebelumnya sudah pernah membuka toko ini
> (produk lama sempat tersimpan di localStorage), produk baru ini tidak
> otomatis muncul. Buka `admin/admin-pengaturan.html` → klik **"Pulihkan
> Katalog Bawaan"** supaya katalog di-refresh pakai 10 produk baru ini.

## Foto QRIS (belum terisi ⏳)

Taruh gambar kode QRIS toko kamu di:
```
image/qris/qris-code.png
```
Nama file **harus persis** `qris-code.png` karena sudah dirujuk langsung
oleh `checkout.html`. Kalau belum ada filenya, halaman checkout otomatis
menampilkan kotak placeholder supaya tidak terlihat rusak — begitu file
ini ditambahkan, foto QRIS akan otomatis muncul saat pelanggan memilih
metode pembayaran "QRIS".

Gunakan format `.png`/`.jpg`, dan usahakan ukuran file tidak terlalu besar
(idealnya di bawah 300 KB) supaya halaman tetap ringan.
