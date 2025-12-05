const params = new URLSearchParams(location.search);
const summary = document.getElementById("summary");

const productId = params.get("product");
const rating = params.get("rating");
const installed = params.get("installDate");
const username = params.get("username") || "Anonymous";

let features = params.getAll("features");
if (features.length === 0) features = ["None selected"];

summary.textContent = `Product: ${productId} • Rating: ${rating} • Installed: ${installed} • Features: ${features.join(", ")} • By: ${username}`;

const key = "reviewCount";
const current = Number(localStorage.getItem(key) || "0") + 1;
localStorage.setItem(key, String(current));
document.getElementById("reviewCount").textContent = String(current);
