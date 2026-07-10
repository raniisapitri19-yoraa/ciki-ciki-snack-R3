/* ==========================================================================
   Ciki-Ciki Snack — Shared Data Layer
   Dipakai bersama oleh index.html (toko) dan halaman-halaman di folder
   admin/ (admin panel).
   Semua data disimpan di localStorage supaya toko & admin panel "nyambung"
   walau tanpa backend/database sungguhan (cocok untuk tugas/demo).
   ========================================================================== */

const STORAGE_KEYS = {
  PRODUCTS: "ciki_products_v1",
  PRODUCTS_VERSION: "ciki_products_version_v1",
  ORDERS: "ciki_orders_v1",
  CART: "ciki_cart_v1",
  ADMIN_PASSWORD: "ciki_admin_password_v1",
  ADMIN_SESSION: "ciki_admin_session_v1",
};

/* Naikkan angka ini SETIAP KALI kamu mengubah DEFAULT_PRODUCTS di bawah
   (tambah produk baru, ganti foto, ganti harga, dst). Browser menyimpan
   katalog di localStorage supaya toko & admin tetap "nyambung" tanpa
   database — tapi itu artinya perubahan di file ini TIDAK otomatis
   ke-load kalau versinya sama dengan yang sudah tersimpan. Menaikkan
   angka ini memaksa browser mengambil ulang data terbaru dari file ini. */
const DATA_VERSION = "2";

const DEFAULT_ADMIN_PASSWORD = "admin123";

/* Katalog bawaan. id memakai prefix "p" + angka supaya gampang dibaca.
   Foto produk diambil dari image/produk/ (nama file sama persis dengan
   yang ada di folder OneDrive kamu). */
const DEFAULT_PRODUCTS = [
  {
    id: "p1",
    name: "Stik Kentang Pedas Level 3",
    emoji: "🥔",
    image: "image/produk/stik-kentang-pedas-level-3.jpeg",
    category: "Keripik",
    badge: "Best Seller",
    price: 12000,
    oldPrice: 15000,
    description: "Stik kentang renyah dengan bubuk cabai level 3, gurih dan nagih.",
    active: true,
  },
  {
    id: "p2",
    name: "Kerupuk Bawang Gurih",
    emoji: "🍘",
    image: "image/produk/kerupuk-bawang-gurih.jpeg",
    category: "Kerupuk",
    badge: "",
    price: 8000,
    oldPrice: 0,
    description: "Kerupuk bawang renyah, cocok jadi teman makan atau cemilan santai.",
    active: true,
  },
  {
    id: "p3",
    name: "Wafer Coklat Legit",
    emoji: "🍫",
    image: "image/produk/wafer-coklat-legit.jpeg",
    category: "Coklat",
    badge: "Promo",
    price: 6000,
    oldPrice: 8000,
    description: "Wafer renyah berlapis krim coklat manis legit, favorit segala usia.",
    active: true,
  },
  {
    id: "p4",
    name: "Keripik Singkong Balado",
    emoji: "🍟",
    image: "image/produk/kripik-singkong-balado.jpeg",
    category: "Keripik",
    badge: "",
    price: 10000,
    oldPrice: 0,
    description: "Keripik singkong tipis renyah dibalut bumbu balado pedas manis.",
    active: true,
  },
  {
    id: "p5",
    name: "Permen Jeruk Mint Manis",
    emoji: "🍬",
    image: "image/produk/permen-jeruk-mint-manis.jpeg",
    category: "Permen",
    badge: "Baru",
    price: 5000,
    oldPrice: 0,
    description: "Permen rasa jeruk berpadu mint yang menyegarkan, pas buat cemilan ringan.",
    active: true,
  },
  {
    id: "p6",
    name: "Coklat Batang Susu",
    emoji: "🍫",
    image: "image/produk/coklat-batang-susu.jpeg",
    category: "Coklat",
    badge: "",
    price: 9000,
    oldPrice: 0,
    description: "Coklat batang isi banyak chunk, lumer di mulut dengan rasa susu yang creamy.",
    active: true,
  },
  {
    id: "p7",
    name: "Kacang Atom Pedas Manis",
    emoji: "🥜",
    image: "image/produk/kacang-atom-pedas-manis.jpeg",
    category: "Kacang",
    badge: "Best Seller",
    price: 11000,
    oldPrice: 13000,
    description: "Kacang atom renyah berbalut bumbu pedas manis, cemilan wajib nonton bareng.",
    active: true,
  },
  {
    id: "p8",
    name: "Jagung Manis Caramel",
    emoji: "🌽",
    image: "image/produk/jagung-manis-caramel.jpeg",
    category: "Snack Manis",
    badge: "",
    price: 13000,
    oldPrice: 0,
    description: "Popcorn jagung dibalut karamel manis gurih, renyah di setiap gigitan.",
    active: true,
  },
  {
    id: "p9",
    name: "Kriuk Balls Original",
    emoji: "🟠",
    image: "image/produk/kriuk-balls-original.jpeg",
    category: "Snack Kriuk",
    badge: "",
    price: 7000,
    oldPrice: 0,
    description: "Snack bulat renyah rasa original, gurih ringan cocok buat cemilan kapan saja.",
    active: true,
  },
  {
    id: "p10",
    name: "Biskuit Malkist Krim Vanila",
    emoji: "🍪",
    image: "image/produk/biskuit-malkist-krim-vanila.jpeg",
    category: "Biskuit",
    badge: "Promo",
    price: 8500,
    oldPrice: 10000,
    description: "Biskuit lapis krim vanila yang renyah dan manis pas, cocok temani waktu santai.",
    active: true,
  },
];

/* ---------- Utilitas umum ---------- */

function formatRupiah(value) {
  const number = Math.round(Number(value) || 0);
  return "Rp" + number.toLocaleString("id-ID");
}

function generateOrderCode() {
  const now = new Date();
  const y = now.getFullYear().toString().slice(-2);
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `CK${y}${rand}`;
}

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error("Gagal membaca localStorage:", key, err);
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error("Gagal menyimpan localStorage:", key, err);
    return false;
  }
}

/* ---------- Produk ---------- */

function getProducts() {
  const storedVersion = localStorage.getItem(STORAGE_KEYS.PRODUCTS_VERSION);
  let products = readJSON(STORAGE_KEYS.PRODUCTS, null);

  if (!products || storedVersion !== DATA_VERSION) {
    products = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
    writeJSON(STORAGE_KEYS.PRODUCTS, products);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS_VERSION, DATA_VERSION);
  }
  return products;
}

function saveProducts(products) {
  writeJSON(STORAGE_KEYS.PRODUCTS, products);
}

function resetProductsToDefault() {
  const fresh = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
  writeJSON(STORAGE_KEYS.PRODUCTS, fresh);
  localStorage.setItem(STORAGE_KEYS.PRODUCTS_VERSION, DATA_VERSION);
  return fresh;
}

function upsertProduct(product) {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === product.id);
  if (index >= 0) {
    products[index] = product;
  } else {
    products.push(product);
  }
  saveProducts(products);
  return products;
}

function deleteProduct(id) {
  const products = getProducts().filter((p) => p.id !== id);
  saveProducts(products);
  return products;
}

/* ---------- Pesanan ---------- */

function getOrders() {
  return readJSON(STORAGE_KEYS.ORDERS, []);
}

function saveOrders(orders) {
  writeJSON(STORAGE_KEYS.ORDERS, orders);
}

function addOrder(order) {
  const orders = getOrders();
  orders.unshift(order);
  saveOrders(orders);
  return orders;
}

function updateOrderStatus(code, status) {
  const orders = getOrders();
  const found = orders.find((o) => o.code === code);
  if (found) found.status = status;
  saveOrders(orders);
  return orders;
}

function deleteOrder(code) {
  const orders = getOrders().filter((o) => o.code !== code);
  saveOrders(orders);
  return orders;
}

function clearAllOrders() {
  saveOrders([]);
}

/* ---------- Keranjang (khusus toko) ---------- */

function getCart() {
  return readJSON(STORAGE_KEYS.CART, []);
}

function saveCart(cart) {
  writeJSON(STORAGE_KEYS.CART, cart);
}

function clearCart() {
  saveCart([]);
}

/* ---------- Admin auth ---------- */

function getAdminPassword() {
  return localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD) || DEFAULT_ADMIN_PASSWORD;
}

function setAdminPassword(newPassword) {
  localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, newPassword);
}

function isAdminLoggedIn() {
  return sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === "1";
}

function setAdminLoggedIn(value) {
  if (value) {
    sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, "1");
  } else {
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  }
}
