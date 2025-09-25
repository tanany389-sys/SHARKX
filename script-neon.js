// Neon sea background with moving hammerhead + site logic + i18n

(function(){
  const c = document.getElementById('bg'); if(!c) return;
  const ctx = c.getContext('2d'); let w,h,t=0;
  function resize(){ w=c.width=innerWidth; h=c.height=innerHeight; }
  function hammerheadPath(s=1){
    const p = new Path2D();
    // stylized hammerhead silhouette (top view)
    p.moveTo(-30*s,0);
    p.quadraticCurveTo(-54*s,-18*s,-82*s,-10*s);
    p.lineTo(-82*s,10*s);
    p.quadraticCurveTo(-54*s,18*s,-30*s,0);
    p.quadraticCurveTo(-8*s,16*s,20*s,11*s);
    p.quadraticCurveTo(36*s,8*s,46*s,0);
    p.quadraticCurveTo(36*s,-8*s,20*s,-11*s);
    p.quadraticCurveTo(-8*s,-16*s,-30*s,0);
    return p;
  }
  const path = hammerheadPath(2.1);
  function draw(){
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,w,h);
    // pure black base
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,w,h);

    // hologram grid shimmer (very subtle)
    ctx.save();
    ctx.globalAlpha = 0.05;
    ctx.strokeStyle = "#0ff";
    ctx.lineWidth = 1;
    for(let y=0;y<h;y+=60){
      ctx.beginPath(); ctx.moveTo(0,y+ (Math.sin((t+y)/120)*6)); ctx.lineTo(w,y+ (Math.sin((t+y)/120)*6)); ctx.stroke();
    }
    ctx.restore();

    // move hammerhead
    const x = (t*0.45)%(w+300)-150;
    const y = h*0.35 + Math.sin(t/120)*50;
    const rot = Math.sin(t/220)*0.12;

    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(rot);

    // glow back layer
    const grd = ctx.createLinearGradient(-120, -40, 120, 40);
    grd.addColorStop(0, "rgba(0,255,255,0.06)");
    grd.addColorStop(1, "rgba(0,140,255,0.18)");
    ctx.fillStyle = grd;
    ctx.shadowColor = "rgba(0, 200, 255, 0.35)";
    ctx.shadowBlur = 22;
    ctx.fill(path);

    // neon outline
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(0, 255, 255, 0.9)";
    ctx.shadowColor = "rgba(0, 255, 255, 0.8)";
    ctx.shadowBlur = 12;
    ctx.stroke(path);

    // inner scanline
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 0.35 + Math.sin(t/30)*0.15;
    ctx.strokeStyle = "rgba(0,180,255,0.7)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-90,0); ctx.lineTo(90,0); ctx.stroke();

    ctx.restore();

    t+=1;
    requestAnimationFrame(draw);
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