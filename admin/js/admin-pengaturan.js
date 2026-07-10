/* ==========================================================================
   Ciki-Ciki Snack — Logika halaman admin-pengaturan.html
   Membutuhkan ../js/data.js dan js/admin-common.js sudah dimuat sebelumnya.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  requireAdminLogin();
  initAdminChrome("settings");
  bindSettings();
});

function bindSettings() {
  document.getElementById("changePasswordForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const current = document.getElementById("currentPassword").value;
    const next = document.getElementById("newPassword").value;
    const confirmVal = document.getElementById("confirmPassword").value;

    let valid = true;
    const currentOk = current === getAdminPassword();
    const newOk = next.length >= 4;
    const confirmOk = next === confirmVal;

    document.getElementById("fg-current-pass").classList.toggle("invalid", !currentOk);
    document.getElementById("fg-new-pass").classList.toggle("invalid", !newOk);
    document.getElementById("fg-confirm-pass").classList.toggle("invalid", !confirmOk);
    if (!currentOk || !newOk || !confirmOk) valid = false;
    if (!valid) return;

    setAdminPassword(next);
    document.getElementById("changePasswordForm").reset();
    showToast("Kata sandi berhasil diganti");
  });

  document.getElementById("resetCatalogBtn").addEventListener("click", () => {
    if (confirm("Kembalikan katalog ke produk bawaan? Perubahan produk kustom akan hilang.")) {
      resetProductsToDefault();
      showToast("Katalog dikembalikan ke bawaan");
    }
  });

  document.getElementById("clearOrdersBtn").addEventListener("click", () => {
    if (confirm("Hapus SEMUA data pesanan? Tindakan ini tidak bisa dibatalkan.")) {
      clearAllOrders();
      showToast("Semua data pesanan dihapus");
    }
  });
}
