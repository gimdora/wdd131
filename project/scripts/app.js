const $ = (sel, ctx=document)=>ctx.querySelector(sel);
const $$ = (sel, ctx=document)=>[...ctx.querySelectorAll(sel)];

function setNow() {
  const y = $('#year'); const m = $('#modified');
  if (y) y.textContent = new Date().getFullYear();
  if (m) m.textContent = document.lastModified;
}

function markCurrentNav() {
  const here = location.pathname.split('/').pop() || 'index.html';
  $$('.nav a').forEach(a=>{
    if (a.getAttribute('href')===here) a.setAttribute('aria-current','page');
  });
}

function updateFbTotals() {
  const n = Number(localStorage.getItem('fbCount')||0);
  const el = $('#fbTotal')||$('#fbCount');
  if (el) el.textContent = String(n);
}

document.addEventListener('DOMContentLoaded', ()=>{
  setNow();
  markCurrentNav();
  updateFbTotals();
});
