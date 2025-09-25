// Neon sea background with moving hammerhead + site logic + i18n
(function(){
  const c = document.getElementById('bg'); if(!c) return;
  const ctx = c.getContext('2d'); let w,h,t=0;
  function resize(){ w=c.width=innerWidth; h=c.height=innerHeight; }
  function wave(y,amp,spd,off){ const p=[]; for(let x=0;x<=w;x+=8){ p.push(y+Math.sin((x+off+t*spd)/180*Math.PI)*amp); } return p; }
  function hammerhead(x,y,s,rot){
    ctx.save(); ctx.translate(x,y); ctx.rotate(rot);
    ctx.fillStyle='rgba(180,220,255,.08)';
    ctx.beginPath();
    ctx.moveTo(-30*s,0);
    ctx.quadraticCurveTo(-50*s,-18*s,-70*s,-10*s);
    ctx.lineTo(-70*s,10*s);
    ctx.quadraticCurveTo(-50*s,18*s,-30*s,0);
    ctx.quadraticCurveTo(-10*s,15*s,20*s,10*s);
    ctx.quadraticCurveTo(35*s,8*s,42*s,0);
    ctx.quadraticCurveTo(35*s,-8*s,20*s,-10*s);
    ctx.quadraticCurveTo(-10*s,-15*s,-30*s,0);
    ctx.closePath(); ctx.fill();
    ctx.restore();
  }
  function draw(){
    ctx.clearRect(0,0,w,h);
    const g = ctx.createLinearGradient(0,0,0,h);
    g.addColorStop(0,'#01050f'); g.addColorStop(.6,'#02142c'); g.addColorStop(1,'#000');
    ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
    ctx.strokeStyle='rgba(80,150,255,.08)'; ctx.lineWidth=1.2;
    [h*0.2,h*0.35,h*0.5].forEach((y,i)=>{
      ctx.beginPath(); const p=wave(y,8+i*4,1+i*0.6,i*120); ctx.moveTo(0,p[0]);
      for(let x=0,k=0;x<=w;x+=8,k++){ ctx.lineTo(x,p[k]); } ctx.stroke();
    });
    const X = (t*0.6)%(w+200)-100; const Y=h*0.35+Math.sin(t/50)*30;
    hammerhead(X,Y,2,Math.sin(t/180)*0.1);
    t+=1; requestAnimationFrame(draw);
  }
  addEventListener('resize', resize); resize(); draw();
})();

// Nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
if (toggle && nav){ toggle.addEventListener('click', () => { nav.classList.toggle('show'); toggle.setAttribute('aria-expanded', nav.classList.contains('show')); }); }

// Dynamic year
const yearEl = document.getElementById('year'); if (yearEl) yearEl.textContent = new Date().getFullYear();

// Cards -> dialogs
document.querySelectorAll('.card[data-modal]').forEach(card => {
  card.addEventListener('click', () => {
    const dlg = document.getElementById(card.getAttribute('data-modal'));
    if (dlg) dlg.showModal();
  });
});
document.querySelectorAll('[data-close]').forEach(btn => btn.addEventListener('click', () => btn.closest('dialog')?.close?.()));

// Gallery lightbox
const lightbox = document.getElementById('lightbox'), lightboxImg = document.getElementById('lightboxImg');
document.querySelectorAll('.glink').forEach(el => el.addEventListener('click', () => { const src = el.getAttribute('data-img'); if (src){ lightboxImg.src = src; lightbox.showModal(); } }));
addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox?.open) lightbox.close(); });

// Languages
(function(){
  const dict = {
    en:{ "nav.sites":"Dive Sites","nav.gallery":"Gallery","nav.contact":"Contact","hero.title":"Neon Black • Red Sea Magic.","hero.cta1":"Explore Dive Sites","hero.cta2":"Plan Your Dive","section.sites":"Dive Sites","section.gallery":"Gallery","section.contact":"Contact"},
    ru:{ "nav.sites":"Места для дайвинга","nav.gallery":"Галерея","nav.contact":"Контакты","hero.title":"Неоновый Чёрный • Магия Красного моря.","hero.cta1":"Смотреть локации","hero.cta2":"Планировать дайв","section.sites":"Места для дайвинга","section.gallery":"Галерея","section.contact":"Контакты"},
    de:{ "nav.sites":"Tauchplätze","nav.gallery":"Galerie","nav.contact":"Kontakt","hero.title":"Neon Black • Rotes Meer Magie.","hero.cta1":"Tauchplätze ansehen","hero.cta2":"Tauchgang planen","section.sites":"Tauchplätze","section.gallery":"Galerie","section.contact":"Kontakt"}
  };
  const lang = document.querySelector('.lang');
  function setLang(code){ document.documentElement.lang=code; const t=dict[code]||dict.en; document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.getAttribute('data-i18n'); if(t[k]) el.textContent=t[k];}); }
  if (lang){ lang.addEventListener('click', e => { const b=e.target.closest('button[data-lang]'); if(!b) return; lang.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed', x===b?'true':'false')); setLang(b.getAttribute('data-lang')); }); }
  setLang('en');
})();