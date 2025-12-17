requireAdmin();

const products = getProducts();
const form = document.getElementById("product-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newProduct = {
    id: Date.now(),
    name: document.getElementById("product-name").value,
    price: Number(document.getElementById("product-price").value),
    img:
      document.getElementById("product-img").value ||
      "assets/img/momo_signature.svg",
    category: document.getElementById("product-cat").value,
    description: document.getElementById("product-desc").value,
    tag: document.getElementById("product-tag").value || "",
  };

  products.push(newProduct);
  saveProducts(products);

  alert("Đã thêm món mới!");
  form.reset();
});
