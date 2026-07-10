/* ==========================================================================
   Ciki-Ciki Snack — Logika Toko (index.html)
   Catatan: alur checkout, sukses pesanan, dan lacak pesanan sudah dipindah
   ke halaman & file JS sendiri: checkout.html (js/checkout.js),
   order-sukses.html (js/order-sukses.js), lacak-pesanan.html (js/lacak-pesanan.js)
   ========================================================================== */

let state = {
  products: [],
  cart: [],
  activeCategory: "Semua",
  searchTerm: "",
  sortBy: "rekomendasi",
};

document.addEventListener("DOMContentLoaded", () => {
  state.products = getProducts().filter((p) => p.active !== false);
  state.cart = getCart();

  renderCategoryPills();
  renderProductGrid();
  renderCart();

  bindNavToggle();
  bindCatalogControls();
  bindCartDrawer();
});

/* ---------- Nav mobile ---------- */
function bindNavToggle() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  toggle.addEventListener("click", () => links.classList.toggle("open"));
}

/* ---------- Katalog ---------- */
function renderCategoryPills() {
  const categories = ["Semua", ...new Set(state.products.map((p) => p.category))];
  const wrap = document.getElementById("categoryPills");
  wrap.innerHTML = categories
    .map(
      (cat) =>
        `<button class="pill ${cat === state.activeCategory ? "active" : ""}" data-cat="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`
    )
    .join("");
  wrap.querySelectorAll(".pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.activeCategory = btn.dataset.cat;
      renderCategoryPills();
      renderProductGrid();
    });
  });
}

function bindCatalogControls() {
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");
  searchInput.addEventListener("input", () => {
    state.searchTerm = searchInput.value.trim().toLowerCase();
    renderProductGrid();
  });
  sortSelect.addEventListener("change", () => {
    state.sortBy = sortSelect.value;
    renderProductGrid();
  });
}

function getFilteredProducts() {
  let list = state.products.slice();

  if (state.activeCategory !== "Semua") {
    list = list.filter((p) => p.category === state.activeCategory);
  }
  if (state.searchTerm) {
    list = list.filter((p) => p.name.toLowerCase().includes(state.searchTerm));
  }
  if (state.sortBy === "harga-asc") list.sort((a, b) => a.price - b.price);
  else if (state.sortBy === "harga-desc") list.sort((a, b) => b.price - a.price);
  else if (state.sortBy === "nama") list.sort((a, b) => a.name.localeCompare(b.name));

  return list;
}

function renderProductGrid() {
  const grid = document.getElementById("productGrid");
  const list = getFilteredProducts();

  if (list.length === 0) {
    grid.innerHTML = `<div class="empty-state">😕 Tidak ada produk yang cocok. Coba kata kunci atau kategori lain.</div>`;
    return;
  }

  grid.innerHTML = list
    .map((p) => {
      const media = p.image
        ? `<img src="${escapeAttr(p.image)}" alt="${escapeAttr(p.name)}" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'media-fallback',textContent:'${escapeAttr(p.emoji || "🍬")}'}))" />`
        : `${escapeHtml(p.emoji || "🍬")}`;
      const badge = p.badge ? `<span class="badge">${escapeHtml(p.badge)}</span>` : "";
      const oldPrice = p.oldPrice > 0 ? `<span class="price-old">${formatRupiah(p.oldPrice)}</span>` : "";

      return `
        <div class="product-card">
          <div class="product-media">${badge}${media}</div>
          <div class="product-body">
            <div class="product-cat">${escapeHtml(p.category)}</div>
            <div class="product-name">${escapeHtml(p.name)}</div>
            <div class="product-desc">${escapeHtml(p.description || "")}</div>
            <div class="price-row">
              <span class="price-now">${formatRupiah(p.price)}</span>
              ${oldPrice}
            </div>
          </div>
          <div class="product-footer">
            <button class="btn btn-primary btn-block btn-sm" data-add="${p.id}">+ Tambah ke Keranjang</button>
          </div>
        </div>`;
    })
    .join("");

  grid.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(btn.dataset.add));
  });
}

/* ---------- Keranjang ---------- */
function addToCart(productId) {
  const product = state.products.find((p) => p.id === productId);
  if (!product) return;

  const existing = state.cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ id: product.id, qty: 1 });
  }
  saveCart(state.cart);
  renderCart();
  showToast(`${product.name} ditambahkan ke keranjang`);
}

function changeQty(productId, delta) {
  const item = state.cart.find((i) => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter((i) => i.id !== productId);
  }
  saveCart(state.cart);
  renderCart();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((i) => i.id !== productId);
  saveCart(state.cart);
  renderCart();
}

function getCartDetails() {
  return state.cart
    .map((item) => {
      const product = state.products.find((p) => p.id === item.id);
      if (!product) return null;
      return { ...product, qty: item.qty, lineTotal: product.price * item.qty };
    })
    .filter(Boolean);
}

function getCartSubtotal() {
  return getCartDetails().reduce((sum, item) => sum + item.lineTotal, 0);
}

function renderCart() {
  const details = getCartDetails();
  const cartCount = document.getElementById("cartCount");
  const cartBody = document.getElementById("cartBody");
  const cartTotal = document.getElementById("cartTotal");

  cartCount.textContent = details.reduce((sum, i) => sum + i.qty, 0);

  if (details.length === 0) {
    cartBody.innerHTML = `<div class="empty-state">Keranjang kamu masih kosong. Yuk pilih ciki-ciki favoritmu!</div>`;
  } else {
    cartBody.innerHTML = details
      .map((item) => {
        const media = item.image
          ? `<img src="${escapeAttr(item.image)}" alt="${escapeAttr(item.name)}" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'media-fallback',textContent:'${escapeAttr(item.emoji || "🍬")}'}))" />`
          : escapeHtml(item.emoji || "🍬");
        return `
        <div class="cart-line">
          <div class="cart-line-media">${media}</div>
          <div class="cart-line-body">
            <div class="product-name" style="font-size:14px;">${escapeHtml(item.name)}</div>
            <div style="font-size:13px;color:var(--ink-soft);">${formatRupiah(item.price)}</div>
            <div class="qty-control">
              <button data-dec="${item.id}">−</button>
              <span>${item.qty}</span>
              <button data-inc="${item.id}">+</button>
              <button class="cart-line-remove" data-remove="${item.id}">Hapus</button>
            </div>
          </div>
        </div>`;
      })
      .join("");

    cartBody.querySelectorAll("[data-inc]").forEach((b) => b.addEventListener("click", () => changeQty(b.dataset.inc, 1)));
    cartBody.querySelectorAll("[data-dec]").forEach((b) => b.addEventListener("click", () => changeQty(b.dataset.dec, -1)));
    cartBody.querySelectorAll("[data-remove]").forEach((b) => b.addEventListener("click", () => removeFromCart(b.dataset.remove)));
  }

  cartTotal.textContent = formatRupiah(getCartSubtotal());
}

function bindCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  const open = () => { drawer.classList.add("open"); overlay.classList.add("open"); };
  const close = () => { drawer.classList.remove("open"); overlay.classList.remove("open"); };

  document.getElementById("openCartBtn").addEventListener("click", open);
  document.getElementById("closeCartBtn").addEventListener("click", close);
  overlay.addEventListener("click", close);

  document.getElementById("goCheckoutBtn").addEventListener("click", () => {
    if (state.cart.length === 0) {
      showToast("Keranjang masih kosong");
      return;
    }
    window.location.href = "checkout.html";
  });
}

/* ---------- Util UI ---------- */
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function escapeAttr(str) {
  return escapeHtml(str);
}
