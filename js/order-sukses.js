/* ==========================================================================
   Ciki-Ciki Snack — Logika halaman order-sukses.html
   Membaca kode pesanan dari query string (?code=...) lalu mengambil
   datanya dari localStorage (STORAGE_KEYS.ORDERS) yang tadi ditulis oleh
   checkout.js — jadi data ini juga langsung terlihat di admin panel.
   Membutuhkan js/data.js sudah dimuat sebelumnya.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const code = (params.get("code") || "").trim().toUpperCase();
  const order = getOrders().find((o) => o.code.toUpperCase() === code);

  if (!order) {
    document.querySelector(".success-box").classList.add("hidden");
    document.getElementById("orderNotFoundNotice").classList.remove("hidden");
    return;
  }

  document.getElementById("successOrderCode").textContent = "Kode Pesanan: " + order.code;
  document.getElementById("successTrackBtn").href = "lacak-pesanan.html?code=" + encodeURIComponent(order.code);

  const itemsHtml = order.items
    .map((i) => `<div class="order-line"><span>${escapeHtml(i.name)} × ${i.qty}</span><span>${formatRupiah(i.price * i.qty)}</span></div>`)
    .join("");

  document.getElementById("successOrderSummary").innerHTML = `
    <div class="panel">
      ${itemsHtml}
      <div class="summary-row" style="margin-top:8px;"><span>Ongkos Kirim</span><span>${formatRupiah(order.shipping)}</span></div>
      <div class="summary-row total"><span>Total</span><span>${formatRupiah(order.total)}</span></div>
      <p style="margin-top:10px;font-size:13px;color:var(--ink-soft);">Metode Bayar: ${escapeHtml(order.paymentMethod)}</p>
    </div>`;
});

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
