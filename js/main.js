const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const src = (name) => `img/${name}.jpg`;

/* ---------------------------------------------------------------- header */
const header = $('#header');
const burger = $('#burger');
const nav = $('#nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('header--solid', window.scrollY > 60);
  $('#toTop').classList.toggle('show', window.scrollY > 600);
}, { passive: true });

burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});
nav.addEventListener('click', (e) => {
  if (e.target.closest('a') && nav.classList.contains('open')) burger.click();
});

// underline the menu item of the section on screen
const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    $$('.nav > a').forEach((a) => a.classList.toggle('active', a.hash === `#${entry.target.id}`));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
['home', 'featured', 'works', 'about', 'contact'].forEach((id) => spy.observe(document.getElementById(id)));

/* ---------------------------------------------------------------- typing */
// same idea as the typing plugin on the old site, but without the plugin
const words = ['GRENIEL', 'A DEVELOPER', 'A DESIGNER'];
const typed = $('#typed');

if (!reduceMotion) {
  let w = 0;
  let i = words[0].length;
  let deleting = true;

  const type = () => {
    const word = words[w];
    i += deleting ? -1 : 1;
    typed.textContent = word.slice(0, i);

    let wait = deleting ? 60 : 120;
    if (!deleting && i === word.length) {
      deleting = true;
      wait = 2200;
    } else if (deleting && i === 0) {
      deleting = false;
      w = (w + 1) % words.length;
      wait = 400;
    }
    setTimeout(() => type(), wait);
  };
  setTimeout(type, 3500);
}

/* ---------------------------------------------------------------- icon pattern */
// the dark sections have a faint pattern of icons behind them
const icons = ['fas fa-gamepad', 'fas fa-lightbulb', 'fas fa-paint-brush', 'fas fa-heart', 'fas fa-globe-americas', 'fas fa-music', 'g'];

$$('.pattern').forEach((layer, n) => {
  let html = '';
  for (let i = 0; i < 48; i++) {
    const icon = icons[(i * 3 + n) % icons.length];
    html += icon === 'g'
      ? '<span><svg><use href="#g-mark" /></svg></span>'
      : `<span><i class="${icon}"></i></span>`;
  }
  layer.innerHTML = html;
});

/* ---------------------------------------------------------------- render works */
$('#webDesigns').innerHTML = WEB_DESIGNS.map((d) => `
  <figure class="design ${d.tall ? 'design--tall' : ''} reveal">
    <img src="${src(d.img)}" alt="${d.title}" loading="lazy" data-full data-group="web">
  </figure>`).join('');

$('#apps').innerHTML = APPS.map((a) => `
  <div class="app">
    <div class="sample__text">
      <h3 class="spaced">${a.name}</h3>
      <p class="spaced spaced--small">${a.text}</p>
    </div>
    <div class="app__screens">
      <img src="${src(a.wire)}" alt="${a.name} wireframe" loading="lazy" data-full data-group="${a.wire}">
      <img src="${src(a.ui)}" alt="${a.name} final design" loading="lazy" data-full data-group="${a.wire}">
    </div>
  </div>`).join('');

$('#arts').innerHTML = ARTS.map((title, i) => `
  <img src="${src(`art-${String(i + 1).padStart(2, '0')}`)}" alt="${title}" loading="lazy" data-full data-group="arts" class="reveal">`).join('');

$('#posters').innerHTML = POSTERS.map((p) => `
  <img src="${src(p.img)}" alt="${p.title}" loading="lazy" data-full data-group="posters" class="reveal">`).join('');

$('#others').innerHTML = OTHERS.map((o) => `
  <button class="other" data-open="${o.img}">
    <img src="${src(o.img)}" alt="" loading="lazy">
    <span>${o.title}</span>
  </button>`).join('');

/* ---------------------------------------------------------------- skills */
$$('[data-skills]').forEach((list) => {
  list.innerHTML = SKILLS[list.dataset.skills].map((s) => `
    <li style="--value:${s.value}%;--color:${s.color}">
      <span class="skills__bar"><span>${s.name}</span><b>${s.value}%</b></span>
    </li>`).join('');
});

/* ---------------------------------------------------------------- reveal + counters */
const revealer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    obs.unobserve(entry.target);
  });
}, { threshold: 0.2 });
$$('.reveal, .skills').forEach((el) => revealer.observe(el));

const counter = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const end = Number(el.dataset.count);
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / 1500, 1);
      el.textContent = Math.round(end * t);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    obs.unobserve(el);
  });
}, { threshold: 0.8 });
$$('[data-count]').forEach((el) => counter.observe(el));

/* ---------------------------------------------------------------- lightbox */
// every image with data-full opens here. data-group decides which images the arrows go through
const lightbox = $('#lightbox');
let group = [];
let index = 0;
let lastFocus;

function showImage() {
  const img = group[index];
  $('#lbImg').src = img.src;
  $('#lbImg').alt = img.alt;
  $('#lbCaption').textContent = group.length > 1 ? `${img.alt} (${index + 1} / ${group.length})` : img.alt;
  $('#lbPrev').hidden = group.length < 2;
  $('#lbNext').hidden = group.length < 2;
}

function openLightbox(images, start) {
  group = images;
  index = start;
  lastFocus = document.activeElement;
  showImage();
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  $('#lbClose').focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
  if (lastFocus) lastFocus.focus();
}

function move(step) {
  index = (index + step + group.length) % group.length;
  showImage();
}

// make the images keyboard friendly too
$$('[data-full]').forEach((img) => {
  img.tabIndex = 0;
  img.setAttribute('role', 'button');
});

document.addEventListener('click', (e) => {
  const img = e.target.closest('[data-full]');
  if (img) {
    const images = $$(`[data-full][data-group="${img.dataset.group}"]`);
    openLightbox(images, images.indexOf(img));
    return;
  }

  // "other works" tiles open the whole category as one gallery
  const tile = e.target.closest('[data-open]');
  if (tile) {
    const images = OTHERS.map((o) => ({ src: src(o.img), alt: o.title }));
    openLightbox(images, OTHERS.findIndex((o) => o.img === tile.dataset.open));
  }
});

document.addEventListener('keydown', (e) => {
  if (lightbox.hidden) {
    if (e.key === 'Enter' && e.target.matches('[data-full]')) e.target.click();
    return;
  }
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') move(-1);
  if (e.key === 'ArrowRight') move(1);
});

$('#lbClose').addEventListener('click', closeLightbox);
$('#lbPrev').addEventListener('click', () => move(-1));
$('#lbNext').addEventListener('click', () => move(1));
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target.classList.contains('lightbox__box')) closeLightbox();
});

/* ---------------------------------------------------------------- contact form */
// no backend on a static site, so a valid form opens the visitor's email app with everything filled in
const form = $('#form');
const EMAIL = 'greniel.galinato@gmail.com';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const missing = [];
  if (!data.first.trim()) missing.push('first name');
  if (!form.email.value || !form.email.checkValidity()) missing.push('a valid email');
  if (!data.subject.trim()) missing.push('subject');
  if (!data.message.trim()) missing.push('message');

  const error = $('#formError');
  error.hidden = missing.length === 0;
  if (missing.length) {
    error.textContent = `Please fill in: ${missing.join(', ')}.`;
    return;
  }

  const body = `${data.message}\n\n- ${data.first} ${data.last} (${data.email})`;
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
  $('#formOk').hidden = false;
  form.reset();
});
