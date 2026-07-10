/* ==========================================================================
   Ciki-Ciki Snack — Logika halaman admin-produk.html
   Membutuhkan ../js/data.js dan js/admin-common.js sudah dimuat sebelumnya.
   ========================================================================== */

let produkState = {
  categoryFilter: "Semua",
};

document.addEventListener("DOMContentLoaded", () => {
  requireAdminLogin();
  initAdminChrome("products");
  bindProductForm();
  renderProductsPage();
});

function renderProductsPage() {
  const products = getProducts();
  const filterSelect = document.getElementById("productCategoryFilter");

  const categories = ["Semua", ...new Set(products.map((p) => p.category))];
  filterSelect.innerHTML = categories.map((c) => `<option value="${escapeAttr(c)}">${c === "Semua" ? "Semua Kategori" : escapeHtml(c)}</option>`).join("");
  filterSelect.value = produkState.categoryFilter;

  let list = products;
  if (produkState.categoryFilter !== "Semua") {
    list = list.filter((p) => p.category === produkState.categoryFilter);
  }

  const body = document.getElementById("productsBody");
  body.innerHTML = list.length
    ? list
        .map(
          (p) => `<tr>
            <td>${p.emoji || "🍬"} ${escapeHtml(p.name)}</td>
            <td>${escapeHtml(p.category)}</td>
            <td>${formatRupiah(p.price)}</td>
            <td>${p.badge ? `<span class="status-tag status-dikemas">${escapeHtml(p.badge)}</span>` : "-"}</td>
            <td class="table-actions">
              <button class="icon-btn" data-edit="${p.id}">✏️ Edit</button>
              <button class="icon-btn" data-delete="${p.id}">🗑️ Hapus</button>
            </td>
          </tr>`
        )
        .join("")
    : `<tr class="empty-row"><td colspan="5">Tidak ada produk pada kategori ini.</td></tr>`;

  body.querySelectorAll("[data-edit]").forEach((btn) => btn.addEventListener("click", () => openProductModal(btn.dataset.edit)));
  body.querySelectorAll("[data-delete]").forEach((btn) =>
    btn.addEventListener("click", () => {
      if (confirm("Yakin hapus produk ini?")) {
        deleteProduct(btn.dataset.delete);
        renderProductsPage();
        showToast("Produk dihapus");
      }
    })
  );

  filterSelect.onchange = () => {
    produkState.categoryFilter = filterSelect.value;
    renderProductsPage();
  };
}

function openProductModal(productId) {
  const form = document.getElementById("productForm");
  form.reset();
  document.getElementById("p-id").value = "";
  document.getElementById("productModalTitle").textContent = "Tambah Produk";

  if (productId) {
    const product = getProducts().find((p) => p.id === productId);
    if (product) {
      document.getElementById("productModalTitle").textContent = "Edit Produk";
      document.getElementById("p-id").value = product.id;
      document.getElementById("p-name").value = product.name;
      document.getElementById("p-emoji").value = product.emoji || "";
      document.getElementById("p-category").value = product.category;
      document.getElementById("p-badge").value = product.badge || "";
      document.getElementById("p-price").value = product.price;
      document.getElementById("p-oldprice").value = product.oldPrice || "";
      document.getElementById("p-desc").value = product.description || "";
      form.dataset.existingImage = product.image || "";
    }
  } else {
    form.dataset.existingImage = "";
  }

  document.getElementById("productOverlay").classList.add("open");
}

function closeProductModal() {
  document.getElementById("productOverlay").classList.remove("open");
}

function bindProductForm() {
  document.getElementById("addProductBtn").addEventListener("click", () => openProductModal(null));
  document.getElementById("closeProductModalBtn").addEventListener("click", closeProductModal);
  document.getElementById("cancelProductBtn").addEventListener("click", closeProductModal);
  document.getElementById("productOverlay").addEventListener("click", (e) => {
    if (e.target.id === "productOverlay") closeProductModal();
  });

  document.getElementById("productForm").addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;
    const name = document.getElementById("p-name").value.trim();
    const category = document.getElementById("p-category").value.trim();
    const price = document.getElementById("p-price").value;

    document.getElementById("fg-p-name").classList.toggle("invalid", !name);
    document.getElementById("fg-p-category").classList.toggle("invalid", !category);
    document.getElementById("fg-p-price").classList.toggle("invalid", price === "" || Number(price) < 0);
    if (!name || !category || price === "") valid = false;
    if (!valid) return;

    const form = document.getElementById("productForm");
    const fileInput = document.getElementById("p-imageFile");
    const id = document.getElementById("p-id").value || "p" + Date.now();

    const buildProduct = (imageDataUrl) => {
      const product = {
        id,
        name,
        emoji: document.getElementById("p-emoji").value.trim() || "🍬",
        image: imageDataUrl || "",
        category,
        badge: document.getElementById("p-badge").value,
        price: Number(price),
        oldPrice: Number(document.getElementById("p-oldprice").value) || 0,
        description: document.getElementById("p-desc").value.trim(),
        active: true,
      };
      upsertProduct(product);
      closeProductModal();
      renderProductsPage();
      showToast("Produk disimpan");
    };

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = () => buildProduct(reader.result);
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      buildProduct(form.dataset.existingImage || "");
    }
  });
}
