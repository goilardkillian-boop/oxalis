/* ═══════════════════════════════════════════════════════════
   OXALIS HOMME · content.js de l'accueil (moteur Site Immersif)
   Seule la moitié haute (window.SITE_CONTENT) est propre à Oxalis.
   Textes : contenu/textes.md, section 1. Images : recadrages des
   photos de assets/images (voir JOURNAL.md, tableau des images).
   La partie « INJECTION » en bas de fichier est celle du skill,
   copiée telle quelle.
   ═══════════════════════════════════════════════════════════ */

window.SITE_CONTENT = {

  brand: {
    name: 'Oxalis Homme',
    title: 'Oxalis Homme : soins solides et rechargeables',
    description: 'Trois soins solides pour une routine en 3 gestes : nettoyer, raser, hydrater. Sans flacon plastique.',
    kicker: 'OXALIS HOMME · SOINS SOLIDES, LYON',
    copyright: '© 2026 · LYON, FRANCE',
    signature: 'SITE DE DÉMONSTRATION',
    socials: [
      { label: 'INSTAGRAM ↗', url: 'https://www.instagram.com/' },
      { label: 'MENTIONS LÉGALES ↗', url: 'mentions-legales.html' }
    ]
  },

  nav: { proof: 'GAMME', universes: 'ROUTINE', cta: 'BOUTIQUE' },

  hook: {
    line1: 'Trois gestes,',
    line2a: 'zéro',
    line2b: 'flacon.',
    image: 'images/hero.jpg',
    imageAlt: 'Trois soins solides Oxalis Homme posés sur une pierre : un pain nettoyant gris, un savon de rasage dans un bol en bois et un baume dans une boîte en aluminium.',
    floaters: [
      'images/d01-pain-gris.jpg',
      'images/d13-argile.jpg',
      'images/d02-boite-baume.jpg',
      'images/d10-mousse.jpg',
      'images/d15-spatule.jpg',
      'images/d03-serviette.jpg',
      'images/d16-mains.jpg',
      'images/d19-cube-boite.jpg',
      'images/d14-beurre.jpg',
      'images/d04-trefle.jpg'
    ]
  },

  positioning: 'Soins solides pour hommes, nés à Lyon',

  manifesto: {
    text: 'Ta salle de bain n’a pas besoin de douze flacons. Trois soins solides suffisent : nettoyer, raser, hydrater. Et quand la boîte du baume est vide, [[tu la recharges]].'
  },

  proof: {
    layout: 'masonry',
    kicker: 'LA GAMME',
    title: 'Six essentiels, pas un de plus',
    sub: 'Des soins solides pensés pour aller droit au but.',
    meta: 'SIX PRODUITS · 2026',
    projects: [
      { img: 'images/g1-nettoyant.jpg',   title: 'Le Nettoyant',        meta: 'GESTE 01 · 12,90 €' },
      { img: 'images/g2-pain-rasage.jpg', title: 'Le Pain de rasage',   meta: 'GESTE 02 · 13,90 €' },
      { img: 'images/g3-baume.jpg',       title: 'Le Baume',            meta: 'GESTE 03 · 16,90 €' },
      { img: 'images/g4-recharge.jpg',    title: 'La Recharge Baume',   meta: 'RECHARGE · 11,90 €' },
      { img: 'images/g5-bol.jpg',         title: 'Le Bol en hêtre',     meta: 'ACCESSOIRE · 14,00 €' },
      { img: 'images/g6-coffret.jpg',     title: 'Le Coffret Routine',  meta: 'LES 3 SOINS · 39,90 €' },
      { img: 'images/g7-mousse.jpg',      title: 'La mousse',           meta: 'EN SITUATION' },
      { img: 'images/g8-matin.jpg',       title: 'Le matin',            meta: 'EN SITUATION' }
    ]
  },

  motto: {
    kicker: 'CE QUI GUIDE LA GAMME',
    words: [
      { word: 'Solide',       hint: 'Pas de flacon, pas de pompe, pas d’eau transportée.' },
      { word: 'Simple',       hint: 'Trois gestes le matin, rien de plus.' },
      { word: 'Rechargeable', hint: 'La boîte du baume se garde, seule la recharge change.' }
    ]
  },

  universes: {
    introA: 'Une',
    introB: 'routine,',
    introC: '3 gestes.',
    cta: 'Composer ma routine →',
    image: 'images/processus.jpg',
    items: [
      { name: 'Nettoyer', meta: 'GESTE · 01', desc: 'Le pain nettoyant mousse en quelques secondes sous l’eau. Tu masses, tu rinces.' },
      { name: 'Raser',    meta: 'GESTE · 02', desc: 'Le pain de rasage donne une mousse dense. Le rasoir glisse, le bol en hêtre le garde au sec.' },
      { name: 'Hydrater', meta: 'GESTE · 03', desc: 'Une noisette de baume, chauffée entre les doigts. La boîte en aluminium, tu la recharges.' }
    ]
  },

  /* Pas de faux avis client : une phrase de la marque, sans chiffre
     (la scène se replie toute seule). */
  testimonial: {
    kicker: 'LE PARTI PRIS OXALIS',
    figure: '',
    unit: '',
    quote: 'Nous avons retiré tout ce qui n’était pas nécessaire. Il reste trois soins, et une boîte que tu gardes.',
    author: 'L’ÉQUIPE OXALIS · LYON'
  },

  objections: {
    items: ['Pas de flacon à jeter.', 'Pas de routine en dix étapes.', 'Pas de promesse miracle.'],
    finale: 'Juste trois soins,',
    pill: 'solides.'
  },

  contact: {
    kicker: 'UNE QUESTION SUR LA GAMME ?',
    email: 'bonjour@oxalis.example',
    reassurance: 'RÉPONSE SOUS 48 H · BOUTIQUES À LYON ET ANNECY'
  },

  /* traînée sous la souris : 20 détails recadrés */
  trail: [
    'images/d11-dos-lavabo.jpg', 'images/d06-baume-dessus.jpg',
    'images/d17-robinet.jpg', 'images/d08-ombres.jpg',
    'images/d05-savon-dessus.jpg', 'images/d20-pierre-eau.jpg',
    'images/d18-serviette-lin.jpg', 'images/d09-pierre.jpg',
    'images/d07-lin-trefle.jpg', 'images/d12-rebord.jpg',
    'images/d01-pain-gris.jpg', 'images/d13-argile.jpg',
    'images/d16-mains.jpg', 'images/d03-serviette.jpg',
    'images/d15-spatule.jpg', 'images/d10-mousse.jpg',
    'images/d19-cube-boite.jpg', 'images/d14-beurre.jpg',
    'images/d02-boite-baume.jpg', 'images/d04-trefle.jpg'
  ]
};

/* ═══════════════════════════════════════════════════════════
   INJECTION — NE PAS MODIFIER (remplit le DOM avant app.js)
   ═══════════════════════════════════════════════════════════ */
(() => {
  const C = window.SITE_CONTENT;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const set = (sel, txt) => { const el = $(sel); if (el) el.textContent = txt; };

  document.title = C.brand.title;
  const md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute('content', C.brand.description);

  // chrome
  set('.loader-wordmark', C.brand.name);
  set('.dock-wordmark', C.brand.name);
  set('.dock-link[href="#travaux"]', C.nav.proof);
  set('.dock-link[href="#explorer"]', C.nav.universes);
  set('.dock-cta', C.nav.cta);

  // 1 · accroche
  set('#heroKicker', C.brand.kicker);
  set('#heroLine1', C.hook.line1);
  const hls = $$('#heroLine2 .hl');
  if (hls.length === 2) { hls[0].textContent = C.hook.line2a; hls[1].textContent = C.hook.line2b; }
  const g1 = $('#grow1 img');
  if (g1) { g1.src = C.hook.image; g1.alt = C.hook.imageAlt; }
  $$('.floaters .fl img').forEach((img, i) => { if (C.hook.floaters[i]) img.src = C.hook.floaters[i]; });

  // 2 · positionnement (un span par mot)
  const intro = $('#spotIntro');
  if (intro) intro.innerHTML = C.positioning.split(' ').map((w) => `<span>${w}</span>`).join(' ');

  // 3 · démarche
  const fill = $('#fillText');
  if (fill) {
    fill.innerHTML = C.manifesto.text.replace(
      /\[\[(.+?)\]\]/,
      '<span class="boxed" id="boxedPhrase">$1<svg class="box-svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path id="boxPath" d="M50,6 C88,4 98,22 97,50 C96,82 76,96 49,95 C16,94 3,76 4,48 C5,18 20,7 50,6 Z"/></svg></span>'
    );
  }

  // 4 · preuve : masonry (8 photos) ou bento (4 features big/tall/tall/big)
  const head = $$('.coll-head > *');
  if (head.length === 4) {
    head[0].textContent = C.proof.kicker;
    head[1].textContent = C.proof.title;
    head[2].textContent = C.proof.sub;
    head[3].textContent = C.proof.meta;
  }
  const grid = $('#collGrid');
  if (grid && C.proof.layout === 'bento') {
    grid.className = 'bento-grid';
    grid.innerHTML = C.proof.features.map((f) =>
      `<figure class="card${f.size ? ' b-' + f.size : ''}"><div class="card-img"><img src="${f.illu}" alt="${f.title}"></div><figcaption>${f.title}<span class="mono">${f.meta}</span></figcaption></figure>`
    ).join('');
  } else if (grid) {
    grid.className = 'coll-grid';
    const SPEEDS = [-0.05, 0.06, -0.028, 0.085];
    grid.innerHTML = SPEEDS.map((s, ci) =>
      `<div class="col" data-pspeed="${s}">` +
      C.proof.projects.slice(ci * 2, ci * 2 + 2).map((p) =>
        `<figure class="card"><div class="card-img"><img src="${p.img}" alt="${p.title} · ${p.meta}"></div><figcaption>${p.title}<span class="mono">${p.meta}</span></figcaption></figure>`
      ).join('') + '</div>'
    ).join('');
  }

  // 5 · devise (train de mots-clés)
  set('#mottoKicker', C.motto.kicker);
  const mtrack = $('#mottoTrack');
  if (mtrack) mtrack.innerHTML = C.motto.words.map((w) => `<span class="mw">${w.word}</span>`).join('');

  // 6-7 · processus immersif (visuels posés un à un)
  set('#nw1', C.universes.introA);
  set('#nw2', C.universes.introB);
  set('#nw3', C.universes.introC);
  const g2 = $('#grow2 img');
  if (g2) g2.src = C.universes.image || (C.universes.items[0] || {}).img || g2.src;
  const psteps = $('#psteps');
  if (psteps) {
    psteps.innerHTML = C.universes.items.map((u) =>
      `<div class="pstep"><span class="pstep-meta mono ash">${u.meta}</span><h3>${u.name}</h3><p>${u.desc || ''}</p></div>`
    ).join('');
  }
  const sCta = $('#stepsCtaLink');
  if (sCta) sCta.childNodes[0].textContent = C.universes.cta;

  // 8 · preuve sociale — le chiffre qui frappe
  set('#figKicker', C.testimonial.kicker || '');
  const figM = String(C.testimonial.figure || '').trim().match(/^([^\d.,+-]*[+\u2212-]?)\s*(-?[\d.,]+)/);
  set('#figPre', figM ? figM[1] : '');
  set('#figVal', figM ? figM[2] : '');
  set('#figUnit', C.testimonial.unit || '');
  set('#quoteText', C.testimonial.quote);
  set('#quoteAuthor', C.testimonial.author);

  // 9 · objections
  C.objections.items.forEach((t, i) => set('#fs' + (i + 1), t));
  const fs4 = $('#fs4');
  if (fs4) {
    fs4.innerHTML = `${C.objections.finale} <span class="pill" id="pillPhrase">${C.objections.pill}<svg class="pill-svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path id="pillPath" d="M50,6 C88,4 98,22 97,50 C96,82 76,96 49,95 C16,94 3,76 4,48 C5,18 20,7 50,6 Z"/></svg></span>`;
  }
  $$('#trail img').forEach((img, i) => { img.src = C.trail[i % C.trail.length]; });

  // 10 · conversion
  set('.footer-kicker', C.contact.kicker);
  const mail = $('.footer-mail');
  if (mail) { mail.href = 'mailto:' + C.contact.email; mail.querySelector('.footer-mail-text').textContent = C.contact.email; }
  set('.footer-reassurance', C.contact.reassurance);
  const fname = $('#footerName');
  if (fname) { fname.textContent = C.brand.name; fname.setAttribute('aria-label', C.brand.name); }
  const bottom = $$('.footer-bottom > p');
  if (bottom.length === 3) {
    bottom[0].textContent = C.brand.copyright;
    bottom[1].innerHTML = C.brand.socials.map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`).join('&nbsp;&nbsp;&nbsp;');
    bottom[2].textContent = C.brand.signature;
  }
})();
