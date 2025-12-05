function getParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.getAll(name);
}

const product = getParam("product")[0] || "";
const rating = getParam("rating")[0] || "";
const installed = getParam("installed")[0] || "";
const features = getParam("features").join(", ") || "None selected";
const user = getParam("userName")[0] || "Anonymous";
const written = getParam("review")[0] || "";

document.getElementById("out-product").textContent = product || "N/A";
document.getElementById("out-rating").textContent = rating || "N/A";
document.getElementById("out-installed").textContent = installed || "N/A";
document.getElementById("out-features").textContent = features;
document.getElementById("out-user").textContent = user;

const key = "reviewCount";
const current = parseInt(localStorage.getItem(key) || "0", 10);
const next = current + 1;
localStorage.setItem(key, String(next));
document.getElementById("reviewCount").textContent = String(next);

if (written && !document.getElementById("writtenBlock")) {
  const container = document.querySelector(".container");
  const block = document.createElement("section");
  block.className = "card";
  block.id = "writtenBlock";
  const h = document.createElement("h2");
  h.textContent = "Written Review";
  const p = document.createElement("p");
  p.textContent = written;
  block.appendChild(h);
  block.appendChild(p);
  container.insertBefore(block, container.children[1]);
}
