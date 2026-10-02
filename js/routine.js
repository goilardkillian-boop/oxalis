/* ═══════════════════════════════════════════════════════════
   OXALIS HOMME · configurateur « Compose ta routine en 3 gestes »
   Règle du coffret : Nettoyant + Pain de rasage + Baume (avec boîte)
   → le Coffret Routine à 39,90 € remplace les trois soins.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var OX = window.OX;
  var form = document.getElementById('formRoutine');
  var g1 = document.getElementById('geste1');
  var g2 = document.getElementById('geste2');
  var g3 = document.getElementById('geste3');
  var optBol = document.getElementById('optionBol');
  var optRecharge = document.getElementById('optionRecharge');
  var liste = document.getElementById('recapListe');
  var total = document.getElementById('recapTotal');
  var annonce = document.getElementById('recapAnnonce');
  var msgCoffret = document.getElementById('messageCoffret');
  var bouton = document.getElementById('ajouterRoutine');
  var aide = document.getElementById('aideRoutine');

  /* Prix affichés dans les cartes, depuis les données */
  document.querySelectorAll('[data-prix]').forEach(function (el) {
    el.textContent = OX.prix(OX.parSlug(el.getAttribute('data-prix')).prix_centimes);
  });

  function selection() {
    var avecCoffret = g1.checked && g2.checked && g3.checked && !optRecharge.checked;
    var items = [];
    if (avecCoffret) {
      items.push('coffret-routine-3-gestes');
    } else {
      if (g1.checked) items.push('nettoyant-visage-solide');
      if (g2.checked) items.push('pain-de-rasage');
      if (g3.checked) items.push(optRecharge.checked ? 'recharge-baume' : 'baume-hydratant-solide');
    }
    if (optBol.checked) items.push('bol-en-hetre');
    return { items: items, coffret: avecCoffret };
  }

  function mettreAJour() {
    optRecharge.disabled = !g3.checked;
    if (!g3.checked) optRecharge.checked = false;
    var s = selection();
    var somme = 0;
    liste.innerHTML = s.items.map(function (slug) {
      var p = OX.parSlug(slug);
      somme += p.prix_centimes;
      return '<li><span>' + OX.echapper(p.nom) + '</span><span class="prix">' + OX.prix(p.prix_centimes) + '</span></li>';
    }).join('') || '<li><span>Aucun geste sélectionné.</span></li>';
    total.textContent = OX.prix(somme);
    msgCoffret.hidden = !s.coffret;
    var vide = s.items.length === 0;
    bouton.setAttribute('aria-disabled', vide ? 'true' : 'false');
    aide.hidden = !vide;
    annonce.textContent = 'Total de ta routine : ' + OX.prix(somme) + (s.coffret ? '. Les 3 soins passent en coffret.' : '.');
  }

  form.addEventListener('change', mettreAJour);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var s = selection();
    if (!s.items.length) { aide.hidden = false; g1.focus(); return; }
    var message = s.coffret
      ? 'Ta routine est dans le panier : le Coffret Routine à ' + OX.prix(OX.parSlug('coffret-routine-3-gestes').prix_centimes) + (optBol.checked ? ' et le Bol en hêtre' : '')
      : 'Ta routine est dans le panier';
    window.Panier.ajouterEtMontrer(s.items.map(function (slug) { return { slug: slug, qte: 1 }; }), bouton, message);
  });

  mettreAJour();
})();
