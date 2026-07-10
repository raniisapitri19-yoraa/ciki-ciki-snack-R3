/* ==========================================================================
   Ciki-Ciki Snack — Logika halaman admin-login.html
   Membutuhkan ../js/data.js sudah dimuat sebelumnya.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Kalau sesi masih aktif, langsung lempar ke dashboard.
  if (isAdminLoggedIn()) {
    window.location.href = "admin-dashboard.html";
    return;
  }

  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("loginPassword");
    const group = document.getElementById("fg-login-password");

    if (input.value === getAdminPassword()) {
      setAdminLoggedIn(true);
      group.classList.remove("invalid");
      window.location.href = "admin-dashboard.html";
    } else {
      group.classList.add("invalid");
    }
  });
});
