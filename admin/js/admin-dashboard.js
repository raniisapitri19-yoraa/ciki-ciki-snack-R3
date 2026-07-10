/* ==========================================================================
   Ciki-Ciki Snack — Logika halaman admin-dashboard.html
   Membutuhkan ../js/data.js dan js/admin-common.js sudah dimuat sebelumnya.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  requireAdminLogin();
  initAdminChrome("dashboard");
  renderDashboard();
});

function renderDashboard() {
  const orders = getOrders();
  const products = getProducts();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingCount = orders.filter((o) => o.status === "Pesanan Diterima").length;
  const activeProducts = products.filter((p) => p.active !== false).length;

  document.getElementById("statRevenue").textContent = formatRupiah(totalRevenue);
  document.getElementById("statOrders").textContent = orders.length;
  document.getElementById("statPending").textContent = pendingCount;
  document.getElementById("statProducts").textContent = activeProducts;

  const recentBody = document.getElementById("recentOrdersBody");
  const recent = orders.slice(0, 5);
  recentBody.innerHTML = recent.length
    ? recent
        .map(
          (o) => `<tr>
            <td>${escapeHtml(o.code)}</td>
            <td>${escapeHtml(o.customer.name)}</td>
            <td>${formatRupiah(o.total)}</td>
            <td>${statusTag(o.status)}</td>
          </tr>`
        )
        .join("")
    : `<tr class="empty-row"><td colspan="4">Belum ada pesanan masuk.</td></tr>`;

  const salesByProduct = {};
  orders.forEach((o) => {
    o.items.forEach((item) => {
      salesByProduct[item.id] = (salesByProduct[item.id] || 0) + item.qty;
    });
  });
  const topProducts = Object.entries(salesByProduct)
    .map(([id, qty]) => ({ product: products.find((p) => p.id === id), qty }))
    .filter((x) => x.product)
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);

  const topBody = document.getElementById("topProductsBody");
  topBody.innerHTML = topProducts.length
    ? topProducts
        .map(
          (x) => `<tr>
            <td>${x.product.emoji || "🍬"} ${escapeHtml(x.product.name)}</td>
            <td>${escapeHtml(x.product.category)}</td>
            <td>${x.qty} terjual</td>
          </tr>`
        )
        .join("")
    : `<tr class="empty-row"><td colspan="3">Belum ada data penjualan.</td></tr>`;
}
