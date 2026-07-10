/* ==========================================================================
   Ciki-Ciki Snack — Admin Common
   Helper yang dipakai bersama oleh semua halaman admin:
   admin-dashboard.html, admin-produk.html, admin-pesanan.html,
   admin-pengaturan.html (tidak dipakai di admin-login.html).
   Membutuhkan ../js/data.js sudah dimuat sebelumnya.
   ========================================================================== */

/* ---------- Penjaga login ----------
   Panggil di awal setiap halaman admin (selain login). Kalau belum login,
   langsung lempar ke admin-login.html. */
function requireAdminLogin() {
  if (!isAdminLoggedIn()) {
    window.location.href = "admin-login.html";
  }
}

/* ---------- Sidebar & topbar ---------- */
function initAdminChrome(activePage) {
  document.querySelectorAll(".admin-nav-link[data-page]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.page === activePage);
  });

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      setAdminLoggedIn(false);
      window.location.href = "admin-login.html";
    });
  }

  const mobileBtn = document.getElementById("mobileMenuBtn");
  const sidebar = document.getElementById("adminSidebar");
  if (mobileBtn && sidebar) {
    mobileBtn.addEventListener("click", () => sidebar.classList.toggle("open"));
  }
}

/* ---------- Status pesanan (badge berwarna) ---------- */
function statusTag(status) {
  const map = {
    "Pesanan Diterima": "status-diterima",
    Dikemas: "status-dikemas",
    Dikirim: "status-dikirim",
    Selesai: "status-selesai",
  };
  return `<span class="status-tag ${map[status] || ""}">${escapeHtml(status)}</span>`;
}

/* ---------- Toast ---------- */
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ---------- Escaping ---------- */
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function escapeAttr(str) {
  return escapeHtml(str);
}
