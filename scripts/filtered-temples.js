const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Seoul Korea",
    location: "Seoul, South Korea",
    dedicated: "1985, December, 14",
    area: 28057,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/seoul-korea-temple/seoul-korea-temple-64140.jpg",
    infoUrl: "https://churchofjesuschristtemples.org/seoul-korea-temple/photographs/"
  },
  {
    templeName: "San Diego California",
    location: "San Diego, California, United States",
    dedicated: "1993, April, 25",
    area: 72000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/san-diego-california-temple/san-diego-california-temple-9060-main.jpg",
    infoUrl: "https://churchofjesuschristtemples.org/san-diego-california-temple/photographs/"
  },
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg",
    infoUrl: "https://churchofjesuschristtemples.org/salt-lake-temple/photographs/"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg",
    infoUrl: "https://churchofjesuschristtemples.org/rome-italy-temple/photographs/"
  },
  {
    templeName: "Paris France",
    location: "Le Chesnay, France",
    dedicated: "2017, May, 21",
    area: 44175,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/paris-france-temple/paris-france-temple-2056-main.jpg",
    infoUrl: "https://churchofjesuschristtemples.org/paris-france-temple/photographs/"
  },
  {
    templeName: "Tokyo Japan",
    location: "Tokyo, Japan",
    dedicated: "1980, October, 27",
    area: 52590,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/tokyo-japan-temple/tokyo-japan-temple-26340-main.jpg",
    infoUrl: "https://churchofjesuschristtemples.org/tokyo-japan-temple/photographs/"
  }
];

const gallery = document.querySelector(".gallery");
function clearGallery() {
  while (gallery.firstChild) gallery.removeChild(gallery.firstChild);
}
function createCard(t) {
  const card = document.createElement("article");
  card.className = "card";
  const img = document.createElement("img");
  img.src = t.imageUrl;
  img.alt = t.templeName;
  img.loading = "lazy";
  const name = document.createElement("h3");
  name.textContent = t.templeName;
  const loc = document.createElement("p");
  loc.innerHTML = `<strong>Location</strong>: ${t.location}`;
  const ded = document.createElement("p");
  ded.innerHTML = `<strong>Dedicated</strong>: ${t.dedicated}`;
  const area = document.createElement("p");
  area.innerHTML = `<strong>Size</strong>: ${Number(t.area).toLocaleString()} sq ft`;
  const text = document.createElement("div");
  text.className = "card-text";
  text.append(name, loc, ded, area);
  card.append(img, text);
  return card;
}
function renderTemples(list) {
  clearGallery();
  list.forEach(t => gallery.appendChild(createCard(t)));
}
function yearOf(t) {
  return Number(String(t.dedicated).split(",")[0]);
}
function applyFilter(type) {
  let list = temples.slice();
  if (type === "old") list = list.filter(t => yearOf(t) < 1900);
  if (type === "new") list = list.filter(t => yearOf(t) > 2000);
  if (type === "large") list = list.filter(t => Number(t.area) > 90000);
  if (type === "small") list = list.filter(t => Number(t.area) < 10000);
  renderTemples(list);
}
renderTemples(temples);

document.querySelectorAll("nav a").forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    const id = (a.dataset.filter || a.id || a.textContent).toLowerCase().trim();
    if (id.includes("home")) applyFilter("home");
    else if (id.includes("old")) applyFilter("old");
    else if (id.includes("new")) applyFilter("new");
    else if (id.includes("large")) applyFilter("large");
    else if (id.includes("small")) applyFilter("small");
    else applyFilter("home");
  });
});

const yearSpan = document.getElementById("currentyear");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
const lm = document.getElementById("lastModified");
if (lm) lm.textContent = document.lastModified;
