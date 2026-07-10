/* ==========================================================================
   Ciki-Ciki Snack — Logika halaman lacak-pesanan.html
   Membaca data pesanan langsung dari localStorage (STORAGE_KEYS.ORDERS),
   sumber data yang sama dipakai admin/admin-pesanan.html — jadi begitu
   admin mengubah status pesanan, pelanggan langsung lihat update terbaru
   di halaman ini.
   Membutuhkan js/data.js sudah dimuat sebelumnya.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("trackSubmitBtn").addEventListener("click", runTrackSearch);
  document.getElementById("trackCodeInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") runTrackSearch();
  });

  // Kalau dibuka dari tombol "Lacak Pesanan" di halaman sukses, kode pesanan
  // sudah terisi lewat query string (?code=...) dan langsung dicek.
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  if (code) {
    document.getElementById("trackCodeInput").value = code;
    runTrackSearch();
  }
});

function runTrackSearch() {
  const code = document.getElementById("trackCodeInput").value.trim().toUpperCase();
  const resultBox = document.getElementById("trackResult");

  if (!code) {
    resultBox.innerHTML = `<div class="empty-state">Masukkan kode pesanan terlebih dahulu.</div>`;
    return;
  }

  const orders = getOrders();
  const order = orders.find((o) => o.code.toUpperCase() === code);

  if (!order) {
    resultBox.innerHTML = `<div class="empty-state">Kode pesanan tidak ditemukan. Periksa kembali kode kamu.</div>`;
    return;
  }

  const steps = ["Pesanan Diterima", "Dikemas", "Dikirim", "Selesai"];
  const currentIndex = steps.indexOf(order.status);

  resultBox.innerHTML = `
    <div class="panel" style="padding:16px;">
      <p><strong>${escapeHtml(order.code)}</strong> — ${escapeHtml(order.customer.name)}</p>
      <p style="font-size:13px;color:var(--ink-soft);">Total: ${formatRupiah(order.total)} · ${escapeHtml(order.paymentMethod)}</p>
      <div class="tracker-steps">
        ${steps
          .map(
            (s, i) =>
              `<span class="status-tag ${i <= currentIndex ? "status-selesai" : ""}" style="${i > currentIndex ? "opacity:.4;" : ""}">${escapeHtml(s)}</span>`
          )
          .join("")}
      </div>
    </div>`;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
