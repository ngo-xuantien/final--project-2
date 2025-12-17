const form = document.getElementById("register-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value.trim();

  if (password.length < 6) {
    alert("Mật khẩu phải ít nhất 6 ký tự");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const existed = users.find((u) => u.email === email);
  if (existed) {
    alert("Email này đã được đăng ký rồi 😢");
    return;
  }

  users.push({
    id: Date.now(),
    name,
    email,
    password,
    role: "user",
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Đăng ký thành công! Mời bạn đăng nhập 💗");
  location.href = "login.html";
});
