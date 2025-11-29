const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "San Diego California",
    location: "San Diego, California, United States",
    dedicated: "1993, April, 25",
    area: 72000,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/san-diego-california/400x250/san-diego-california-temple-1039631-wallpaper.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-2192125.jpg"
  },
  {
    templeName: "Laie Hawaii",
    location: "Laie, Hawaii, United States",
    dedicated: "1919, November, 27",
    area: 42300,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/laie-hawaii/400x250/laie-hawaii-temple-lds-253731-wallpaper.jpg"
  }
];

const gallery = $("#gallery");

const yearOf = (dedicated) => parseInt(dedicated.split(",")[0], 10);
const clear = (el) => (el.innerHTML = "");

function templeCard(t) {
  const fig = document.createElement("figure");

  const h2 = document.createElement("h2");
  h2.textContent = t.templeName;

  const meta = document.createElement("div");
  meta.className = "card-meta";
  meta.innerHTML = `
    <div><b>Location:</b> ${t.location}</div>
    <div><b>Dedicated:</b> ${t.dedicated}</div>
    <div><b>Size:</b> ${t.area.toLocaleString()} sq ft</div>
  `;

  const img = document.createElement("img");
  img.loading = "lazy";
  img.src = t.imageUrl;
  img.alt = t.templeName;

  const cap = document.createElement("figcaption");
  cap.textContent = t.templeName;

  fig.append(h2, meta, img, cap);
  return fig;
}

function render(list) {
  clear(gallery);
  const frag = document.createDocumentFragment();
  list.forEach(t => frag.appendChild(templeCard(t)));
  gallery.appendChild(frag);
}

function applyFilter(kind) {
  let list = temples;
  if (kind === "old") list = temples.filter(t => yearOf(t.dedicated) < 1900);
  if (kind === "new") list = temples.filter(t => yearOf(t.dedicated) > 2000);
  if (kind === "large") list = temples.filter(t => t.area > 90000);
  if (kind === "small") list = temples.filter(t => t.area < 10000);
  render(list);
}

$("#menu").addEventListener("click", () => {
  const links = $("#nav-links");
  const open = links.classList.toggle("open");
  $("#menu").setAttribute("aria-expanded", String(open));
});

$$('.nav a').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    $$('.nav a').forEach(x => x.removeAttribute('aria-current'));
    a.setAttribute('aria-current', 'page');
    applyFilter(a.dataset.filter);
    $("#nav-links").classList.remove("open");
    $("#menu").setAttribute("aria-expanded", "false");
  });
});

$("#year").textContent = `© ${new Date().getFullYear()}`;
$("#lastModified").textContent = document.lastModified;

render(temples);
