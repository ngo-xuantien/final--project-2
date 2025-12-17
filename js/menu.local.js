document.addEventListener("DOMContentLoaded", () => {
  const allProducts = getProducts();
  let currentProducts = [...allProducts];
  let currentFilter = "all";

  function renderMenu(list) {
    const grid = document.getElementById("menu-grid");
    if (!grid) return;

    grid.innerHTML = "";
    list.forEach((p) => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        ${p.tag ? `<span class="card-tag">${p.tag}</span>` : ""}
        <img src="${p.img}" class="card-img">
        <h3 class="card-title">${p.name}</h3>
        <p class="card-sub">${p.description || ""}</p>
        <div class="card-bottom">
          <span class="price">${p.price.toLocaleString()}đ</span>
          <button class="btn-primary">Thêm</button>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  window.filterMenu = function (cat) {
    currentFilter = cat;
    currentProducts =
      cat === "all"
        ? [...allProducts]
        : allProducts.filter((p) => p.category === cat);
    renderMenu(currentProducts);
  };

  window.sortMenu = function (type) {
    let sorted = [...currentProducts];
    if (type === "asc") sorted.sort((a, b) => a.price - b.price);
    else if (type === "desc") sorted.sort((a, b) => b.price - a.price);
    renderMenu(sorted);
  };

  renderMenu(currentProducts);
});
