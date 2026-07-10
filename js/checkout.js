/* ==========================================================================
   Ciki-Ciki Snack — Logika halaman checkout.html
   Membutuhkan js/data.js sudah dimuat sebelumnya.
   ========================================================================== */

const SHIPPING_COST = 10000;

let checkoutState = {
  cart: [],
  selectedPaymentMethod: "Transfer Bank",
};

document.addEventListener("DOMContentLoaded", () => {
  checkoutState.cart = getCart();

  if (getCartDetails().length === 0) {
    document.getElementById("emptyCartNotice").classList.remove("hidden");
    document.getElementById("checkoutForm").classList.add("hidden");
    return;
  }

  renderOrderSummary();
  bindPaymentOptions();
  bindQrisImageFallback();
  bindCheckoutForm();
});

function getCartDetails() {
  const products = getProducts();
  return checkoutState.cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return null;
      return { ...product, qty: item.qty, lineTotal: product.price * item.qty };
    })
    .filter(Boolean);
}

function getCartSubtotal() {
  return getCartDetails().reduce((sum, item) => sum + item.lineTotal, 0);
}

/* ---------- Ringkasan pesanan ---------- */
function renderOrderSummary() {
  const details = getCartDetails();
  const list = document.getElementById("checkoutItemsList");

  list.innerHTML = details
    .map(
      (item) => `<div class="order-line">
        <span>${escapeHtml(item.name)} × ${item.qty}</span>
        <span>${formatRupiah(item.lineTotal)}</span>
      </div>`
    )
    .join("");

  const subtotal = getCartSubtotal();
  document.getElementById("ckSubtotal").textContent = formatRupiah(subtotal);
  document.getElementById("ckShipping").textContent = formatRupiah(SHIPPING_COST);
  document.getElementById("ckTotal").textContent = formatRupiah(subtotal + SHIPPING_COST);
}

/* ---------- Metode pembayaran ---------- */
function bindPaymentOptions() {
  document.querySelectorAll(".payment-option").forEach((opt) => {
    opt.addEventListener("click", () => {
      document.querySelectorAll(".payment-option").forEach((o) => o.classList.remove("selected"));
      opt.classList.add("selected");
      checkoutState.selectedPaymentMethod = opt.dataset.method;

      const qrisBox = document.getElementById("qrisBox");
      qrisBox.classList.toggle("hidden", opt.dataset.method !== "QRIS");
    });
  });
}

/* Kalau foto image/qris/qris-code.png belum ditambahkan, tampilkan placeholder
   supaya halaman tidak terlihat rusak. */
function bindQrisImageFallback() {
  const img = document.getElementById("qrisImage");
  const fallback = document.getElementById("qrisFallback");
  img.addEventListener("error", () => {
    img.style.display = "none";
    fallback.style.display = "flex";
  });
}

/* ---------- Submit ---------- */
function bindCheckoutForm() {
  document.getElementById("checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateCheckoutForm()) submitOrder();
  });
}

function validateCheckoutForm() {
  let valid = true;
  const setError = (fieldId, isValid) => {
    const group = document.getElementById(fieldId);
    group.classList.toggle("invalid", !isValid);
    if (!isValid) valid = false;
  };

  const name = document.getElementById("ck-name").value.trim();
  const phone = document.getElementById("ck-phone").value.trim();
  const email = document.getElementById("ck-email").value.trim();
  const address = document.getElementById("ck-address").value.trim();
  const city = document.getElementById("ck-city").value.trim();
  const zip = document.getElementById("ck-zip").value.trim();

  setError("fg-name", name.length > 0);
  setError("fg-phone", /^[0-9]{10,14}$/.test(phone));
  setError("fg-email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  setError("fg-address", address.length > 0);
  setError("fg-city", city.length > 0);
  setError("fg-zip", /^[0-9]{5}$/.test(zip));

  return valid;
}

function submitOrder() {
  const details = getCartDetails();
  const subtotal = getCartSubtotal();
  const order = {
    code: generateOrderCode(),
    customer: {
      name: document.getElementById("ck-name").value.trim(),
      phone: document.getElementById("ck-phone").value.trim(),
      email: document.getElementById("ck-email").value.trim(),
      address: document.getElementById("ck-address").value.trim(),
      city: document.getElementById("ck-city").value.trim(),
      zip: document.getElementById("ck-zip").value.trim(),
    },
    paymentMethod: checkoutState.selectedPaymentMethod,
    items: details.map((d) => ({ id: d.id, name: d.name, price: d.price, qty: d.qty })),
    subtotal,
    shipping: SHIPPING_COST,
    total: subtotal + SHIPPING_COST,
    status: "Pesanan Diterima",
    createdAt: new Date().toISOString(),
  };

  // Simpan ke localStorage bersama (STORAGE_KEYS.ORDERS) — begitu tersimpan,
  // pesanan ini langsung muncul juga di admin/admin-pesanan.html &
  // admin/admin-dashboard.html karena keduanya baca dari sumber yang sama.
  addOrder(order);
  clearCart();

  window.location.href = "order-sukses.html?code=" + encodeURIComponent(order.code);
}

/* ---------- Util ---------- */
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
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
