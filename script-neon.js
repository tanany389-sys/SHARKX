// Neon sea background with moving hammerhead + site logic + i18n

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