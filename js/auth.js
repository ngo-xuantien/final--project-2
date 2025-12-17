// ============================
// AUTH COMMON
// ============================

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function logout() {
  localStorage.removeItem("currentUser");
  alert("Đã đăng xuất 👋");
  location.href = "index.html";
}

// ============================
// LOGIN (ADMIN + USER)
// ============================
document.getElementById("login-form")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // ADMIN CỐ ĐỊNH
  if (email === "admin@gmail.com" && password === "admin123") {
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        name: "Admin",
        email: "admin",
        role: "admin",
      })
    );
    alert("Đăng nhập Admin thành công");
    location.href = "admin-products.html";
    return;
  }

  // USER THƯỜNG
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    alert("Sai email hoặc mật khẩu");
    return;
  }

  localStorage.setItem(
    "currentUser",
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      role: "user",
    })
  );

  alert("Đăng nhập thành công 💗");
  location.href = "index.html";
});

// ============================
// BẢO VỆ ADMIN
// ============================
function requireAdmin() {
  const user = getCurrentUser();
  if (!user || user.role !== "admin") {
    alert("Bạn không có quyền truy cập Admin");
    location.href = "login.html";
  }
}

// ============================
// TOGGLE LOGIN / LOGOUT UI
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const user = getCurrentUser();
  const nameEl = document.getElementById("user-name");
  const logoutBtn = document.getElementById("logout-btn");

  if (user && nameEl && logoutBtn) {
    nameEl.textContent = `Xin chào, ${user.name}`;
    logoutBtn.style.display = "inline";
  }
});
