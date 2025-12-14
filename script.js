// Commit: Cấu hình URL API cho JSON Server (port 5500)
const API_URL = 'http://localhost:5500';

// Commit: Khởi tạo giỏ hàng từ localStorage (nếu có)
let cart = JSON.parse(localStorage.getItem('momo_cart') || '[]');

// Commit: Lưu giỏ hàng vào localStorage
function saveCart() {
  localStorage.setItem('momo_cart', JSON.stringify(cart));
}

// Commit: Tính tổng số lượng trong giỏ
function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

// Commit: Render số lượng giỏ vào #cart-count
function renderCartCount() {
  const el = document.getElementById('cart-count');
  if (el) el.textContent = getCartCount();
}

// Commit: Thêm sản phẩm vào giỏ
function addToCart(id, name, price, img) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1; // Commit: nếu có rồi thì +1
  } else {
    cart.push({ id, name, price:Number(price), img, qty:1 }); // Commit: nếu chưa có thì thêm mới
  }
  saveCart();
  renderCartCount();
  renderMiniCart();
}

// Commit: Giảm số lượng 1 sản phẩm trong giỏ
function decreaseItem(id) {
  const idx = cart.findIndex(item => item.id === id);
  if (idx === -1) return;
  cart[idx].qty -= 1;
  if (cart[idx].qty <= 0) {
    cart.splice(idx, 1); // Commit: nếu qty về 0 thì xóa khỏi giỏ
  }
  saveCart();
  renderCartCount();
  renderMiniCart();
}

// Commit: Xóa toàn bộ giỏ
function clearCart() {
  cart = [];
  saveCart();
  renderCartCount();
  renderMiniCart();
}

// Commit: Tính tổng tiền giỏ
function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

// Commit: Render popup mini cart
function renderMiniCart() {
  const box = document.getElementById('mini-cart');
  if (!box) return;
  const listEl = box.querySelector('.mini-cart-items');
  const totalEl = box.querySelector('.mini-cart-total');
  listEl.innerHTML = '';

  if (!cart.length) {
    listEl.innerHTML = '<p class="card-sub">Giỏ hàng đang trống nè ~</p>';
  } else {
    cart.forEach(item => {
      const row = document.createElement('div');
      row.className = 'cart-row';
      row.innerHTML = `
        <img src="${item.img}" alt="">
        <div style="flex:1;">
          <div class="cart-row-title">${item.name}</div>
          <div class="cart-row-meta">${item.qty} x ${item.price.toLocaleString()}đ</div>
        </div>
        <button class="btn-text" onclick="decreaseItem('${item.id}')">-</button>
      `;
      listEl.appendChild(row);
    });
  }
  if (totalEl) totalEl.textContent = getCartTotal().toLocaleString() + 'đ';
}

// Commit: Toggle mở/đóng mini cart
function toggleMiniCart() {
  const box = document.getElementById('mini-cart');
  if (!box) return;
  box.style.display = (box.style.display === 'block') ? 'none' : 'block';
  renderMiniCart();
}

// Commit: Gửi đơn hàng lên JSON Server
function checkoutOrder() {
  if (!cart.length) {
    alert('Giỏ hàng đang trống nè bé ơi ~');
    return;
  }
  const total = getCartTotal();
  const order = {
    items: cart,
    total,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  fetch(API_URL + '/orders', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(order)
  })
    .then(res => {
      if (!res.ok) throw new Error('Network');
      return res.json();
    })
    .then(data => {
      alert('Đã tạo đơn #' + data.id + ' thành công nè! 💗');
      clearCart();
    })
    .catch(err => {
      console.error(err);
      alert('Không kết nối được JSON Server. Nhớ chạy: npx json-server --watch db.json --port 5500');
    });
}

// Commit: Khởi tạo khi load trang
document.addEventListener('DOMContentLoaded', () => {
  renderCartCount();
  renderMiniCart();
  const openCartBtn = document.getElementById('open-cart');
  if (openCartBtn) openCartBtn.addEventListener('click', toggleMiniCart);
});
