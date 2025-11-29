const temples = [
  { templeName:"Aba Nigeria", location:"Aba, Nigeria", dedicated:"2005, August, 7", area:11500, imageUrl:"https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg" },
  { templeName:"Manti Utah", location:"Manti, Utah, United States", dedicated:"1888, May, 21", area:74792, imageUrl:"https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg" },
  { templeName:"Payson Utah", location:"Payson, Utah, United States", dedicated:"2015, June, 7", area:96630, imageUrl:"https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg" },
  { templeName:"Yigo Guam", location:"Yigo, Guam", dedicated:"2020, May, 2", area:6861, imageUrl:"https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg" },
  { templeName:"Washington D.C.", location:"Kensington, Maryland, United States", dedicated:"1974, November, 19", area:156558, imageUrl:"https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg" },
  { templeName:"Lima Perú", location:"Lima, Perú", dedicated:"1986, January, 10", area:9600, imageUrl:"https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg" },
  { templeName:"Mexico City Mexico", location:"Mexico City, Mexico", dedicated:"1983, December, 2", area:116642, imageUrl:"https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg" },
  { templeName:"Seoul Korea", location:"Seoul, South Korea", dedicated:"1985, December, 14", area:28057, imageUrl:"https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/seoul-korea/400x250/seoul-korea-temple-lds-1029724-wallpaper.jpg" },
  { templeName:"San Diego California", location:"San Diego, California, United States", dedicated:"1993, April, 25", area:72000, imageUrl:"https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/san-diego-california/400x250/san-diego-california-temple-lds-774252-wallpaper.jpg" },
  { templeName:"Salt Lake Utah", location:"Salt Lake City, Utah, United States", dedicated:"1893, April, 6", area:382000, imageUrl:"https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake/400x250/salt-lake-temple-lds-1028574-wallpaper.jpg" },
  { templeName:"Rome Italy", location:"Rome, Italy", dedicated:"2019, March, 10", area:41010, imageUrl:"https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-lds-2120159-wallpaper.jpg" },
  { templeName:"Paris France", location:"Le Chesnay, France", dedicated:"2017, May, 21", area:44175, imageUrl:"https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/paris-france/400x250/paris-france-temple-2017-lds-1019017-wallpaper.jpg" },
  { templeName:"Tokyo Japan", location:"Tokyo, Japan", dedicated:"1980, October, 27", area:53997, imageUrl:"https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/tokyo-japan/400x250/tokyo-japan-temple-lds-253690-wallpaper.jpg" }
];

const yearOf = t => Number(t.dedicated.split(",")[0].trim());
const gallery = document.getElementById("gallery");

function card(t){
  const article = document.createElement("article");
  article.className = "card";
  const img = document.createElement("img");
  img.src = t.imageUrl;
  img.alt = t.templeName;
  img.loading = "lazy";
  img.width = 400;
  img.height = 250;
  const body = document.createElement("div");
  body.className = "body";
  const h2 = document.createElement("h2");
  h2.textContent = t.templeName;
  const meta = document.createElement("div");
  meta.className = "meta";
  meta.innerHTML = `
    <span class="label">Location</span><span>${t.location}</span>
    <span class="label">Dedicated</span><span>${t.dedicated}</span>
    <span class="label">Size</span><span>${t.area.toLocaleString()} sq ft</span>
  `;
  body.appendChild(h2);
  body.appendChild(meta);
  article.appendChild(img);
  article.appendChild(body);
  return article;
}

function render(list){
  gallery.innerHTML = "";
  list.forEach(t => gallery.appendChild(card(t)));
}

function applyFilter(kind){
  if(kind === "home") return render(temples);
  if(kind === "old") return render(temples.filter(t => yearOf(t) < 1900));
  if(kind === "new") return render(temples.filter(t => yearOf(t) > 2000));
  if(kind === "large") return render(temples.filter(t => t.area > 90000));
  if(kind === "small") return render(temples.filter(t => t.area < 10000));
  render(temples);
}

document.querySelectorAll(".nav-link").forEach(a=>{
  a.addEventListener("click", e=>{
    e.preventDefault();
    document.querySelectorAll(".nav-link").forEach(x=>{x.classList.remove("active"); x.removeAttribute("aria-current");});
    e.currentTarget.classList.add("active");
    e.currentTarget.setAttribute("aria-current","page");
    applyFilter(e.currentTarget.dataset.filter);
  });
});

render(temples);
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;
