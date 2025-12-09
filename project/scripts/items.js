const itemsData = [
  { id:'sw-140', name:'Eternal Claymore', job:'Warrior', level:140, rarity:'Epic', img:'images/item-sword.jpg' },
  { id:'st-150', name:'Arcane Staff', job:'Mage', level:150, rarity:'Unique', img:'images/item-staff.jpg' },
  { id:'bw-160', name:'Gale Bow', job:'Archer', level:160, rarity:'Legendary', img:'images/item-bow.jpg' },
  { id:'dg-150', name:'Shade Dagger', job:'Thief', level:150, rarity:'Epic', img:'images/item-dagger.jpg' },
  { id:'gn-160', name:'Aqua Pistol', job:'Pirate', level:160, rarity:'Rare', img:'images/item-gun.jpg' }
];

const favKey = 'favorites';

function getFavs(){
  try { return JSON.parse(localStorage.getItem(favKey)||'[]'); } catch { return []; }
}
function setFavs(list){ localStorage.setItem(favKey, JSON.stringify(list)); }

function toggleFav(id){
  const f = new Set(getFavs());
  f.has(id) ? f.delete(id) : f.add(id);
  setFavs([...f]);
  render($('#items'));
}

function cardTemplate(it, pressed){
  return `
  <article class="card item-card" data-id="${it.id}">
    <img src="${it.img}" alt="${it.name} icon" width="86" height="86" loading="lazy">
    <div class="item-meta">
      <h3>${it.name}</h3>
      <p><strong>${it.job}</strong> • Lv. ${it.level} • <span class="badge">${it.rarity}</span></p>
      <button class="btn fav" aria-pressed="${pressed}" aria-label="Favorite ${it.name}" data-fav="${it.id}">★ Favorite</button>
    </div>
  </article>`;
}

function render(root){
  const q = ($('#q')?.value||'').toLowerCase().trim();
  const job = $('#job')?.value||'all';
  const rarity = $('#rarity')?.value||'all';
  const favs = new Set(getFavs());

  const list = itemsData
    .filter(it => job==='all' ? true : it.job===job)
    .filter(it => rarity==='all' ? true : it.rarity===rarity)
    .filter(it => q ? (it.name.toLowerCase().includes(q) || String(it.level).includes(q)) : true);

  root.innerHTML = list.map(it => cardTemplate(it, favs.has(it.id))).join('');
  $$('.fav', root).forEach(b => b.addEventListener('click', e => toggleFav(e.currentTarget.dataset.fav)));
}

document.addEventListener('DOMContentLoaded', ()=>{
  const root = $('#items');
  if (root){
    ['q','job','rarity'].forEach(id => $('#'+id).addEventListener('input', ()=>render(root)));
    render(root);
  }
});
