function saveInputs(cur, tar, lvl){
  localStorage.setItem('sfInputs', JSON.stringify({cur, tar, lvl}));
}
function loadInputs(){
  try { return JSON.parse(localStorage.getItem('sfInputs')||'{}'); } catch { return {}; }
}
function pretty(n){ return n.toLocaleString(); }

function estimate(cur, tar, lvl){
  const from = Math.min(cur, tar);
  const to = Math.max(cur, tar);
  let tries = 0;
  let mesos = 0;
  for (let s = from; s < to; s++){
    const base = 1000 + lvl*50 + s*800;
    const p = s>=15 ? 0.18 : 0.45;
    tries += Math.ceil(1/p);
    mesos += Math.ceil(base * (1/p));
  }
  return { range:`${from}★ → ${to}★`, tries, mesos };
}

function handleEstimate(e){
  e.preventDefault();
  const cur = Number($('#cur').value);
  const tar = Number($('#tar').value);
  const lvl = Number($('#lvl').value);

  if (Number.isNaN(cur)||Number.isNaN(tar)||Number.isNaN(lvl) || cur<0 || tar<1 || cur>24 || tar>25 || lvl<0){
    $('#range').textContent = '—';
    $('#tries').textContent = '—';
    $('#meso').textContent = '—';
    return;
  }
  const out = estimate(cur, tar, lvl);
  $('#range').textContent = out.range;
  $('#tries').textContent = pretty(out.tries);
  $('#meso').textContent = `${pretty(out.mesos)} meso`;
  saveInputs(cur, tar, lvl);
}

function bumpFeedbackCounter(){
  const k = 'fbCount';
  const n = Number(localStorage.getItem(k)||0) + 1;
  localStorage.setItem(k, String(n));
}

document.addEventListener('DOMContentLoaded', ()=>{
  const f = $('#sfForm');
  if (f){
    const saved = loadInputs();
    if (saved.cur!=null) $('#cur').value = saved.cur;
    if (saved.tar!=null) $('#tar').value = saved.tar;
    if (saved.lvl!=null) $('#lvl').value = saved.lvl;
    f.addEventListener('submit', handleEstimate);
  }

  const fb = $('#fbForm');
  if (fb){
    fb.addEventListener('submit', ()=>bumpFeedbackCounter());
    const count = Number(localStorage.getItem('fbCount')||0);
    const counterEl = $('#fbCount');
    if (counterEl) counterEl.textContent = String(count);
  }
});
