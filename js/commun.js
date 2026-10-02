/* ═══════════════════════════════════════════════════════════
   OXALIS HOMME · éléments communs de la boutique
   Bandeau de démonstration, en-tête, menu mobile, pied de page,
   et petits utilitaires partagés (prix, images, pictogrammes).
   Un seul endroit à modifier pour toutes les pages hors accueil.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var CATALOGUE = window.OXALIS_PRODUITS || { produits: [], livraison: {} };

  /* ─── Utilitaires ─── */
  var formatEuro = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

  function prix(centimes) {
    return formatEuro.format(Math.round(centimes) / 100);
  }

  function echapper(texte) {
    return String(texte == null ? '' : texte)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function parSlug(slug) {
    for (var i = 0; i < CATALOGUE.produits.length; i++) {
      if (CATALOGUE.produits[i].slug === slug) return CATALOGUE.produits[i];
    }
    return null;
  }

  /* Prix au kilo, en centimes entiers (null pour le bol, sans poids) */
  function prixKiloCentimes(p) {
    if (!p || !p.poids_g) return null;
    return Math.round(p.prix_centimes * 1000 / p.poids_g);
  }

  /* Étiquette affichée au-dessus du nom : GESTE 01, RECHARGE… */
  function etiquette(p) {
    if (p.categorie === 'recharge') return 'Recharge';
    if (p.categorie === 'accessoire') return 'Accessoire';
    if (p.categorie === 'coffret') return 'Les 3 soins';
    return 'Geste 0' + p.geste;
  }

  /* Images : les packshots portent le nom prévu dans produits.js.
     Dimensions réelles (pas d'agrandissement des photos fournies). */
  var IMAGES = {
    'p-nettoyant.jpg': 560,
    'p-pain-rasage.jpg': 822,
    'p-baume.jpg': 472,
    'p-recharge-baume.jpg': 340,
    'p-bol-hetre.jpg': 460,
    'p-coffret.jpg': 1122
  };
  var ALT = {
    'nettoyant-visage-solide': 'Le Nettoyant : pain solide gris anthracite, perlé de gouttes d’eau, posé sur une pierre.',
    'pain-de-rasage': 'Le Pain de rasage : savon ivoire couvert d’une mousse dense, sur une pierre mouillée.',
    'baume-hydratant-solide': 'Le Baume : boîte ronde en aluminium ouverte, remplie de baume jaune pâle.',
    'recharge-baume': 'Vue du dessus d’une boîte en aluminium remplie de baume jaune pâle, sur fond vert sapin.',
    'bol-en-hetre': 'Le Bol en hêtre : bol en bois tourné, avec le Pain de rasage posé dedans.',
    'coffret-routine-3-gestes': 'Les trois soins de la routine posés sur une pierre : le Nettoyant, le Pain de rasage dans son bol, le Baume.'
  };

  /* Renvoie les attributs d'une balise <img> produit */
  function imageProduit(p, opts) {
    opts = opts || {};
    var fichier = p.image_principale;
    var largeur = IMAGES[fichier] || 800;
    var base = 'images/' + fichier;
    var srcset = '';
    if (largeur > 800) {
      srcset = ' srcset="' + base.replace('.jpg', '-800.jpg') + ' 800w, ' + base + ' ' + largeur + 'w" sizes="' + (opts.sizes || '(max-width: 479px) 100vw, (max-width: 1023px) 50vw, 384px') + '"';
    }
    var alt = opts.decoratif ? '' : (ALT[p.slug] || p.nom);
    return '<img src="' + (largeur > 800 && !opts.grand ? base.replace('.jpg', '-800.jpg') : base) + '"' + srcset +
      ' width="' + largeur + '" height="' + largeur + '" alt="' + echapper(alt) + '"' +
      (opts.prioritaire ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async">';
  }

  /* Pictogrammes au trait (1,5 px, 24 × 24, currentColor) */
  var TRAITS = {
    sac: '<path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    fermer: '<path d="M6 6l12 12M18 6 6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    moins: '<path d="M5 12h14"/>',
    camion: '<path d="M3 6h11v10H3z"/><path d="M14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.5"/><circle cx="17" cy="17.5" r="1.5"/>',
    magasin: '<path d="M4 10v10h16V10"/><path d="M3 10l2-6h14l2 6"/><path d="M10 20v-5h4v5"/>',
    retour: '<path d="M4 9h11a5 5 0 0 1 0 10H9"/><path d="M8 5 4 9l4 4"/>',
    poids: '<path d="M6 9h12l2 11H4L6 9Z"/><circle cx="12" cy="6" r="2"/>',
    boite: '<path d="M4 8l8-4 8 4v8l-8 4-8-4V8Z"/><path d="M4 8l8 4 8-4M12 12v8"/>',
    recharge: '<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v4h-4"/>',
    feuille: '<path d="M5 19c0-8 5-14 14-14 0 9-6 14-14 14Z"/><path d="M5 19 13 11"/>',
    coche: '<path d="M5 12.5 10 17l9-10"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>',
    alerte: '<circle cx="12" cy="12" r="8.5"/><path d="M12 8v5M12 16h.01"/>',
    cadenas: '<rect x="5" y="11" width="14" height="9" rx="1"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    chevron: '<path d="M12 5v14M5 12h14"/>'
  };
  function icone(nom) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (TRAITS[nom] || '') + '</svg>';
  }
  function iconePoint(texte) {
    var t = texte.toLowerCase();
    if (/rechargeable|recharge/.test(t)) return 'recharge';
    if (/carton|kraft|emballage|coffret/.test(t)) return 'boite';
    if (/hêtre|bois|sèche|air/.test(t)) return 'feuille';
    if (/\d+\s?g\b|format|solides?/.test(t)) return 'poids';
    return 'coche';
  }

  window.OX = {
    catalogue: CATALOGUE,
    produits: CATALOGUE.produits,
    parSlug: parSlug,
    prix: prix,
    prixKiloCentimes: prixKiloCentimes,
    etiquette: etiquette,
    imageProduit: imageProduit,
    icone: icone,
    iconePoint: iconePoint,
    echapper: echapper
  };

  /* ─── Page courante (pour aria-current) ─── */
  var fichier = (location.pathname.split('/').pop() || 'index.html');
  var params = new URLSearchParams(location.search);

  var LIENS = [
    { href: 'boutique.html', texte: 'Boutique', actif: fichier === 'boutique.html' && params.get('cat') !== 'recharge' },
    { href: 'routine.html', texte: 'La routine', actif: fichier === 'routine.html' },
    { href: 'boutique.html?cat=recharge', texte: 'Recharges', actif: fichier === 'boutique.html' && params.get('cat') === 'recharge' },
    { href: 'a-propos.html', texte: 'À propos', actif: fichier === 'a-propos.html' }
  ];

  function liens() {
    return LIENS.map(function (l) {
      return '<li><a href="' + l.href + '"' + (l.actif ? ' aria-current="page"' : '') + '>' + l.texte + '</a></li>';
    }).join('');
  }

  /* ─── Bandeau + en-tête ─── */
  var haut = document.createElement('div');
  haut.innerHTML =
    '<p class="bandeau-demo">Site de démonstration : aucune commande réelle n’est enregistrée.</p>' +
    '<header class="entete" id="entete">' +
      '<div class="conteneur entete-interieur">' +
        '<a class="entete-logo" href="index.html"><img src="images/logos/oxalis-homme-ivoire.svg" width="113" height="34" alt="Oxalis Homme, retour à l’accueil"></a>' +
        '<nav class="entete-nav" aria-label="Navigation principale"><ul>' + liens() + '</ul></nav>' +
        '<div class="entete-actions">' +
          '<button type="button" class="bouton-icone bouton-panier" id="boutonPanier" aria-haspopup="dialog" aria-controls="tiroirPanier">' +
            icone('sac') + '<span class="visuellement-cache">Ouvrir le panier, </span><span class="pastille" id="pastillePanier" hidden>0</span>' +
            '<span class="visuellement-cache" id="pastilleTexte">vide</span>' +
          '</button>' +
          '<button type="button" class="bouton-icone bouton-menu" id="boutonMenu" aria-expanded="false" aria-controls="menuMobile">' +
            icone('menu') + '<span class="visuellement-cache">Ouvrir le menu</span>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</header>' +
    '<div class="menu-mobile" id="menuMobile" role="dialog" aria-modal="true" aria-label="Menu" hidden>' +
      '<div class="menu-mobile-haut">' +
        '<img src="images/logos/oxalis-homme-ivoire.svg" width="93" height="28" alt="">' +
        '<button type="button" class="bouton-icone" id="fermerMenu">' + icone('fermer') + '<span class="visuellement-cache">Fermer le menu</span></button>' +
      '</div>' +
      '<nav aria-label="Navigation mobile"><ul>' + liens() + '<li><a href="panier.html"' + (fichier === 'panier.html' ? ' aria-current="page"' : '') + '>Panier</a></li></ul></nav>' +
      '<a class="bouton bouton-principal bouton-pleine-largeur" href="routine.html">Composer ma routine en 3 gestes</a>' +
    '</div>';

  var evitement = document.querySelector('.evitement');
  var ancre = evitement ? evitement.nextSibling : document.body.firstChild;
  while (haut.firstChild) document.body.insertBefore(haut.firstChild, ancre);

  /* ─── Pied de page ─── */
  var pied = document.createElement('footer');
  pied.className = 'pied';
  pied.innerHTML =
    '<div class="conteneur">' +
      '<div class="pied-grille">' +
        '<div class="pied-marque">' +
          '<img src="images/logos/oxalis-homme-ivoire.svg" width="113" height="34" alt="Oxalis Homme">' +
          '<p>Trois soins solides pour une routine en 3 gestes. Une boîte que tu recharges.</p>' +
        '</div>' +
        '<nav aria-labelledby="piedBoutique"><h2 id="piedBoutique">Boutique</h2><ul>' +
          '<li><a href="boutique.html">Toute la gamme</a></li>' +
          '<li><a href="routine.html">Composer ma routine</a></li>' +
          '<li><a href="boutique.html?cat=recharge">Recharges</a></li>' +
          '<li><a href="a-propos.html">À propos</a></li>' +
        '</ul></nav>' +
        '<nav aria-labelledby="piedAide"><h2 id="piedAide">Aide</h2><ul>' +
          '<li><a href="cgv.html#livraison">Livraison</a></li>' +
          '<li><a href="cgv.html#retractation">Retours</a></li>' +
          '<li><a href="mailto:bonjour@oxalis.example">Contact</a></li>' +
        '</ul></nav>' +
        '<nav aria-labelledby="piedLegal"><h2 id="piedLegal">Légal</h2><ul>' +
          '<li><a href="mentions-legales.html">Mentions légales</a></li>' +
          '<li><a href="cgv.html">CGV</a></li>' +
          '<li><a href="confidentialite.html">Confidentialité</a></li>' +
          '<li><a href="accessibilite.html">Accessibilité</a></li>' +
        '</ul></nav>' +
      '</div>' +
      '<div class="pied-bas"><p>© 2026 Oxalis · Lyon</p><p>Site de démonstration : aucune commande réelle n’est enregistrée.</p></div>' +
    '</div>';
  var main = document.querySelector('main');
  if (main && main.parentNode === document.body) {
    document.body.insertBefore(pied, main.nextSibling);
  } else {
    document.body.appendChild(pied);
  }

  /* ─── Menu mobile ─── */
  var menu = document.getElementById('menuMobile');
  var boutonMenu = document.getElementById('boutonMenu');
  var fermerMenu = document.getElementById('fermerMenu');
  var minuteurMenu = null;

  function focusables(conteneur) {
    return Array.prototype.filter.call(
      conteneur.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'),
      function (el) { return el.offsetParent !== null || el === document.activeElement; }
    );
  }
  function pieger(conteneur, e) {
    if (e.key !== 'Tab') return;
    var f = focusables(conteneur);
    if (!f.length) return;
    var premier = f[0], dernier = f[f.length - 1];
    if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus(); }
    else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus(); }
  }
  window.OX.pieger = pieger;
  window.OX.focusables = focusables;

  function ouvrirMenu() {
    clearTimeout(minuteurMenu);
    menu.hidden = false;
    void menu.offsetWidth; // force le rendu avant la transition
    menu.classList.add('ouvert');
    boutonMenu.setAttribute('aria-expanded', 'true');
    document.body.classList.add('sans-defilement');
    fermerMenu.focus();
  }
  function fermerLeMenu() {
    menu.classList.remove('ouvert');
    boutonMenu.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('sans-defilement');
    minuteurMenu = setTimeout(function () { menu.hidden = true; }, 200);
    boutonMenu.focus();
  }
  boutonMenu.addEventListener('click', ouvrirMenu);
  fermerMenu.addEventListener('click', fermerLeMenu);
  menu.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { fermerLeMenu(); return; }
    pieger(menu, e);
  });
  window.addEventListener('resize', function () {
    if (menu.classList.contains('ouvert') && window.innerWidth >= 900) fermerLeMenu();
  });

  /* ─── Message transmis par l'URL ─── */
  var MESSAGES = {
    'panier-vide': 'Ton panier est vide : choisis tes soins avant de passer la commande.'
  };
  var cle = params.get('message');
  if (cle && MESSAGES[cle]) {
    var cible = document.querySelector('[data-message-page]');
    if (cible) {
      var m = document.createElement('p');
      m.className = 'message-page';
      m.setAttribute('role', 'status');
      m.textContent = MESSAGES[cle];
      cible.appendChild(m);
    }
  }
})();
