const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

function populateProducts() {
  const select = document.getElementById("product");
  const frag = document.createDocumentFragment();
  products.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = p.name;
    frag.appendChild(opt);
  });
  select.appendChild(frag);
}

function setFooterMeta() {
  document.getElementById("year").textContent = `© ${new Date().getFullYear()}`;
  document.getElementById("modified").textContent = document.lastModified;
}

document.addEventListener("DOMContentLoaded", () => {
  populateProducts();
  setFooterMeta();
});
