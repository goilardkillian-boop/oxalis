/* ═══════════════════════════════════════════════════════════
   OXALIS HOMME · boutique : cartes produit et filtres
   L'état du filtre se lit et s'écrit dans l'URL (?cat=recharge).
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var OX = window.OX;
  var ORDRE = ['coffret-routine-3-gestes', 'nettoyant-visage-solide', 'pain-de-rasage', 'baume-hydratant-solide', 'recharge-baume', 'bol-en-hetre'];
  var FILTRES = { tout: null, soin: 'soin', recharge: 'recharge', accessoire: 'accessoire', coffret: 'coffret' };

  var grille = document.getElementById('grilleProduits');
  var boutons = document.querySelectorAll('[data-filtre]');
  var compte = document.getElementById('compteProduits');

  function carte(p, i) {
    var barre = p.prix_separe_centimes
      ? '<span class="visuellement-cache">au lieu de </span><span class="prix-barre">' + OX.prix(p.prix_separe_centimes) + '</span>'
      : '';
    return '<li data-cat="' + p.categorie + '"><article class="carte">' +
      '<div class="carte-image">' + OX.imageProduit(p, { prioritaire: i < 3, decoratif: true }) + '</div>' +
      '<div class="carte-corps">' +
        '<p class="etiquette">' + OX.etiquette(p) + '</p>' +
        '<h3><a href="produit.html?p=' + p.slug + '">' + OX.echapper(p.nom) + '</a></h3>' +
        '<p class="carte-sous-titre">' + OX.echapper(p.sous_titre) + '</p>' +
        '<div class="carte-bas">' +
          '<p><span class="prix">' + OX.prix(p.prix_centimes) + '</span>' + barre + '</p>' +
          '<button type="button" class="bouton bouton-principal" data-ajouter="' + p.slug + '">Ajouter au panier<span class="visuellement-cache"> : ' + OX.echapper(p.nom) + '</span></button>' +
        '</div>' +
      '</div>' +
    '</article></li>';
  }

  grille.innerHTML = ORDRE.map(function (slug, i) { return carte(OX.parSlug(slug), i); }).join('');

  function appliquer(cle, animer) {
    if (!(cle in FILTRES)) cle = 'tout';
    var cat = FILTRES[cle];
    var visibles = 0;
    Array.prototype.forEach.call(grille.children, function (li) {
      var montrer = !cat || li.getAttribute('data-cat') === cat;
      li.hidden = !montrer;
      li.classList.remove('apparait');
      if (montrer) {
        visibles++;
        if (animer) { void li.offsetWidth; li.classList.add('apparait'); }
      }
    });
    Array.prototype.forEach.call(boutons, function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-filtre') === cle ? 'true' : 'false');
    });
    if (compte) compte.textContent = visibles + (visibles > 1 ? ' produits affichés' : ' produit affiché');
  }

  Array.prototype.forEach.call(boutons, function (b) {
    b.addEventListener('click', function () {
      var cle = b.getAttribute('data-filtre');
      var url = new URL(location.href);
      if (cle === 'tout') url.searchParams.delete('cat'); else url.searchParams.set('cat', cle);
      url.searchParams.delete('message');
      history.replaceState(null, '', url.pathname.split('/').pop() + url.search);
      appliquer(cle, true);
      // met à jour le lien actif de l'en-tête (Boutique / Recharges)
      document.querySelectorAll('.entete-nav a, .menu-mobile ul a').forEach(function (a) {
        var href = a.getAttribute('href');
        var actif = (cle === 'recharge' && href === 'boutique.html?cat=recharge') || (cle !== 'recharge' && href === 'boutique.html');
        if (actif) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
      });
    });
  });

  appliquer(new URLSearchParams(location.search).get('cat') || 'tout', false);
})();
