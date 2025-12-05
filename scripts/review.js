const params = new URLSearchParams(location.search);
const productId = params.get("product");
const rating = params.get("rating");
const installDate = params.get("installDate");
const features = params.getAll("features");
const reviewText = params.get("reviewText");
const userName = params.get("userName");

const summary = document.querySelector("#summary");
if (summary) {
  const items = [
    productId ? `Product: ${productId}` : "",
    rating ? `Rating: ${rating}` : "",
    installDate ? `Installed: ${installDate}` : "",
    features.length ? `Features: ${features.join(", ")}` : "",
    reviewText ? `Review: ${reviewText}` : "",
    userName ? `Name: ${userName}` : ""
  ].filter(Boolean);
  summary.textContent = items.join(" • ");
}

const key = "reviewCount";
const current = Number(localStorage.getItem(key) || "0");
const next = current + 1;
localStorage.setItem(key, String(next));

const countEl = document.querySelector("#reviewCount");
if (countEl) countEl.textContent = String(next);

const yearEl = document.querySelector("#copyrightYear");
const modEl = document.querySelector("#lastModified");
if (yearEl) yearEl.textContent = `© ${new Date().getFullYear()}`;
if (modEl) modEl.textContent = `Last Modified: ${document.lastModified}`;
