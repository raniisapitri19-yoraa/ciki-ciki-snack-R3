/* ==========================================================================
   Ciki-Ciki Snack — Logika halaman admin-pesanan.html
   Membutuhkan ../js/data.js dan js/admin-common.js sudah dimuat sebelumnya.
   ========================================================================== */

let pesananState = {
  statusFilter: "Semua",
  activeOrderCode: null,
};

document.addEventListener("DOMContentLoaded", () => {
  requireAdminLogin();
  initAdminChrome("orders");
  bindOrderDetail();
  renderOrdersPage();
});

function renderOrdersPage() {
  const orders = getOrders();
  const filterSelect = document.getElementById("orderStatusFilter");
  filterSelect.value = pesananState.statusFilter;

  let list = orders;
  if (pesananState.statusFilter !== "Semua") {
    list = list.filter((o) => o.status === pesananState.statusFilter);
  }

  const body = document.getElementById("ordersBody");
  body.innerHTML = list.length
    ? list
        .map(
          (o) => `<tr>
            <td>${escapeHtml(o.code)}</td>
            <td>${escapeHtml(o.customer.name)}</td>
            <td>${new Date(o.createdAt).toLocaleDateString("id-ID")}</td>
            <td>${formatRupiah(o.total)}</td>
            <td>${statusTag(o.status)}</td>
            <td class="table-actions"><button class="icon-btn" data-detail="${o.code}">🔍 Detail</button></td>
          </tr>`
        )
        .join("")
    : `<tr class="empty-row"><td colspan="6">Belum ada pesanan.</td></tr>`;

  body.querySelectorAll("[data-detail]").forEach((btn) => btn.addEventListener("click", () => openOrderDetail(btn.dataset.detail)));

  filterSelect.onchange = () => {
    pesananState.statusFilter = filterSelect.value;
    renderOrdersPage();
  };
}

function openOrderDetail(code) {
  const order = getOrders().find((o) => o.code === code);
  if (!order) return;
  pesananState.activeOrderCode = code;

  const itemsHtml = order.items
    .map((i) => `<div class="summary-row"><span>${escapeHtml(i.name)} × ${i.qty}</span><span>${formatRupiah(i.price * i.qty)}</span></div>`)
    .join("");

  document.getElementById("orderDetailBody").innerHTML = `
    <p><strong>${escapeHtml(order.customer.name)}</strong><br/>
    ${escapeHtml(order.customer.phone)} · ${escapeHtml(order.customer.email)}<br/>
    ${escapeHtml(order.customer.address)}, ${escapeHtml(order.customer.city)} ${escapeHtml(order.customer.zip)}</p>
    <h4 style="margin-top:16px;">Item Pesanan</h4>
    ${itemsHtml}
    <div class="summary-row"><span>Ongkos Kirim</span><span>${formatRupiah(order.shipping)}</span></div>
    <div class="summary-row total"><span>Total</span><span>${formatRupiah(order.total)}</span></div>
    <p style="margin-top:10px;font-size:13px;color:var(--ink-soft);">Metode Bayar: ${escapeHtml(order.paymentMethod)}</p>
  `;

  document.getElementById("orderStatusSelect").value = order.status;
  document.getElementById("orderDetailOverlay").classList.add("open");
}

function bindOrderDetail() {
  document.getElementById("closeOrderDetailBtn").addEventListener("click", () => {
    document.getElementById("orderDetailOverlay").classList.remove("open");
  });
  document.getElementById("orderDetailOverlay").addEventListener("click", (e) => {
    if (e.target.id === "orderDetailOverlay") document.getElementById("orderDetailOverlay").classList.remove("open");
  });

  document.getElementById("orderStatusSelect").addEventListener("change", (e) => {
    if (!pesananState.activeOrderCode) return;
    updateOrderStatus(pesananState.activeOrderCode, e.target.value);
    renderOrdersPage();
    showToast("Status pesanan diperbarui");
  });

  document.getElementById("deleteOrderBtn").addEventListener("click", () => {
    if (!pesananState.activeOrderCode) return;
    if (confirm("Yakin hapus pesanan ini?")) {
      deleteOrder(pesananState.activeOrderCode);
      document.getElementById("orderDetailOverlay").classList.remove("open");
      renderOrdersPage();
      showToast("Pesanan dihapus");
    }
  });
}
