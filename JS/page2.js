const buttons = document.querySelectorAll(".filter-buttons button");
const items = document.querySelectorAll(".gallery .item");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    items.forEach(item => {
      item.style.display = (filter === "all" || item.classList.contains(filter)) ? "block" : "none";
    });
  });
});

const gallery = document.querySelectorAll(".gallery img");
gallery.forEach(img => {
  img.addEventListener("click", () => {
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    lightbox.innerHTML = `<img src="${img.src}" alt=""><span>&times;</span>`;
    document.body.appendChild(lightbox);
    lightbox.querySelector("span").addEventListener("click", () => lightbox.remove());
  });
});

window.addEventListener("load", () => {
  const hash = window.location.hash.replace("#", "");
  if (hash) {
    const btn = document.querySelector(`.filter-buttons button[data-filter="${hash}"]`);
    if (btn) btn.click();
  }
});
