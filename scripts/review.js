const products = [
  { id: "fc-1888", name: "flux capacitor" },
  { id: "fc-2050", name: "power laces" },
  { id: "fs-1987", name: "time circuits" },
  { id: "ac-2000", name: "low voltage reactor" },
  { id: "jj-1969", name: "warp equalizer" }
];

function lookupProductName(id) {
  const p = products.find(x => x.id === id);
  return p ? p.name : id || "unknown product";
}

function renderSummary() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("product");
  const rating = params.get("rating");
  const date = params.get("installDate");

  const productName = lookupProductName(productId);
  const summary = document.getElementById("summary");
  summary.textContent = `Your review for "${productName}" was submitted with a rating of ${rating} and installation date ${date}.`;
}

function bumpCounter() {
  const key = "reviewCount";
  const current = Number(localStorage.getItem(key) || "0") + 1;
  localStorage.setItem(key, String(current));
  const counter = document.getElementById("counter");
  counter.textContent = `Total reviews submitted on this device: ${current}`;
}

function setFooterMeta() {
  document.getElementById("year").textContent = `© ${new Date().getFullYear()}`;
  document.getElementById("modified").textContent = document.lastModified;
}

document.addEventListener("DOMContentLoaded", () => {
  renderSummary();
  bumpCounter();
  setFooterMeta();
});
