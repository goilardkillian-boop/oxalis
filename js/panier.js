/* ═══════════════════════════════════════════════════════════
   OXALIS HOMME · panier
   Stockage local (clé oxalis_panier_v1), calculs en centimes,
   tiroir latéral, pastille synchronisée entre onglets.
   Aucune donnée n'est envoyée : tout reste dans le navigateur.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var OX = window.OX;
  var CLE = 'oxalis_panier_v1';
  var QTE_MAX = 10;
  var LIVRAISON = OX.catalogue.livraison || {};
  var FRAIS = LIVRAISON.frais_centimes || 490;
  var SEUIL = LIVRAISON.gratuite_des_centimes || 4500;
  var memoire = []; // repli si le stockage est bloqué
  var stockageOk = (function () {
    try { window.localStorage.setItem('oxalis_test', '1'); window.localStorage.removeItem('oxalis_test'); return true; }
    catch (e) { return false; }
  })();

  /* ─── Lecture / écriture protégées ─── */
  function lire() {
    if (!stockageOk) return memoire.slice();
    try {
      var brut = window.localStorage.getItem(CLE);
      if (!brut) return [];
      var data = JSON.parse(brut);
      if (!Array.isArray(data)) return [];
      return data.filter(function (l) {
        return l && OX.parSlug(l.slug) && Number.isInteger(l.qte) && l.qte > 0;
      }).map(function (l) { return { slug: l.slug, qte: Math.min(l.qte, QTE_MAX) }; });
    } catch (e) {
      return memoire.slice();
    }
  }
  function ecrire(lignes) {
    memoire = lignes.slice();
    try {
      if (lignes.length) window.localStorage.setItem(CLE, JSON.stringify(lignes));
      else window.localStorage.removeItem(CLE);
    } catch (e) { /* stockage bloqué : le panier vit le temps de la page */ }
    rafraichir(true);
  }

  /* ─── Opérations ─── */
  function ajouter(slug, qte) {
    qte = Math.max(1, Math.min(QTE_MAX, parseInt(qte, 10) || 1));
    var lignes = lire();
    var trouve = false;
    lignes.forEach(function (l) {
      if (l.slug === slug) { l.qte = Math.min(QTE_MAX, l.qte + qte); trouve = true; }
    });
    if (!trouve) lignes.push({ slug: slug, qte: qte });
    ecrire(lignes);
  }
  function definirQte(slug, qte) {
    qte = Math.max(1, Math.min(QTE_MAX, parseInt(qte, 10) || 1));
    ecrire(lire().map(function (l) { return l.slug === slug ? { slug: slug, qte: qte } : l; }));
  }
  function retirer(slug) {
    ecrire(lire().filter(function (l) { return l.slug !== slug; }));
  }
  function vider() { ecrire([]); }

  function nombreArticles(lignes) {
    return (lignes || lire()).reduce(function (s, l) { return s + l.qte; }, 0);
  }

  /* mode : 'domicile' (défaut), 'lyon', 'annecy' */
  function totaux(lignes, mode) {
    lignes = lignes || lire();
    var sousTotal = lignes.reduce(function (s, l) { return s + OX.parSlug(l.slug).prix_centimes * l.qte; }, 0);
    var livraison = 0;
    if (!mode || mode === 'domicile') livraison = (sousTotal >= SEUIL || sousTotal === 0) ? 0 : FRAIS;
    return { sousTotal: sousTotal, livraison: livraison, total: sousTotal + livraison, reste: Math.max(0, SEUIL - sousTotal) };
  }

  /* ─── Rendu partagé (tiroir et page panier) ─── */
  function htmlProgression(t) {
    var pct = Math.min(100, Math.round(t.sousTotal / SEUIL * 100));
    var texte = t.reste > 0
      ? 'Plus que <strong class="prix">' + OX.prix(t.reste) + '</strong> pour la livraison offerte'
      : '<strong>Livraison offerte</strong>';
    return '<div class="progression"><p>' + texte + '</p>' +
      '<div class="progression-barre" role="progressbar" aria-label="Progression vers la livraison offerte" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><span style="width:' + pct + '%"></span></div></div>';
  }

  function htmlLignes(lignes) {
    return '<ul class="lignes">' + lignes.map(function (l) {
      var p = OX.parSlug(l.slug);
      return '<li class="ligne" data-slug="' + p.slug + '">' +
        OX.imageProduit(p, { decoratif: true }) +
        '<div><a class="ligne-nom" href="produit.html?p=' + p.slug + '">' + OX.echapper(p.nom) + '</a>' +
        '<p class="mention">' + OX.prix(p.prix_centimes) + ' l’unité</p>' +
        '<div class="ligne-actions">' +
          '<div class="quantite petite" role="group" aria-label="Quantité pour ' + OX.echapper(p.nom) + '">' +
            '<button type="button" data-action="moins"' + (l.qte <= 1 ? ' disabled' : '') + '>' + OX.icone('moins') + '<span class="visuellement-cache">Retirer un ' + OX.echapper(p.nom) + '</span></button>' +
            '<span class="valeur" aria-live="polite">' + l.qte + '</span>' +
            '<button type="button" data-action="plus"' + (l.qte >= QTE_MAX ? ' disabled' : '') + '>' + OX.icone('plus') + '<span class="visuellement-cache">Ajouter un ' + OX.echapper(p.nom) + '</span></button>' +
          '</div>' +
          '<button type="button" class="retirer" data-action="supprimer">Supprimer<span class="visuellement-cache"> ' + OX.echapper(p.nom) + '</span></button>' +
        '</div></div>' +
        '<p class="ligne-prix">' + OX.prix(p.prix_centimes * l.qte) + '</p>' +
      '</li>';
    }).join('') + '</ul>';
  }

  function htmlTotaux(t, mode) {
    var livraison = t.livraison === 0 ? (t.sousTotal ? 'Offerte' : OX.prix(0)) : OX.prix(t.livraison);
    if (mode && mode !== 'domicile') livraison = 'Gratuite (retrait)';
    return '<div class="totaux">' +
      '<div><span>Sous-total</span><span class="prix">' + OX.prix(t.sousTotal) + '</span></div>' +
      '<div><span>Livraison' + (mode ? '' : ' à domicile') + '</span><span class="prix">' + livraison + '</span></div>' +
      '<div class="total"><span>Total TTC</span><span class="prix">' + OX.prix(t.total) + '</span></div>' +
    '</div>';
  }

  /* Délégation des boutons +, −, supprimer */
  function brancherLignes(conteneur) {
    conteneur.addEventListener('click', function (e) {
      var bouton = e.target.closest('button[data-action]');
      if (!bouton) return;
      var ligne = bouton.closest('.ligne');
      if (!ligne) return;
      var slug = ligne.getAttribute('data-slug');
      var actuelle = lire().filter(function (l) { return l.slug === slug; })[0];
      if (!actuelle) return;
      var action = bouton.getAttribute('data-action');
      var focusApres = { slug: slug, action: action };
      if (action === 'plus') definirQte(slug, actuelle.qte + 1);
      else if (action === 'moins') definirQte(slug, actuelle.qte - 1);
      else if (action === 'supprimer') { retirer(slug); focusApres = null; annoncer(OX.parSlug(slug).nom + ' retiré du panier.'); }
      // rend le focus au même bouton après le nouveau rendu
      var cible = focusApres && conteneur.querySelector('.ligne[data-slug="' + slug + '"] button[data-action="' + action + '"]');
      if (cible && !cible.disabled) cible.focus();
      else if (focusApres) {
        var autre = conteneur.querySelector('.ligne[data-slug="' + slug + '"] button[data-action]:not([disabled])');
        if (autre) autre.focus();
      } else {
        var suivant = conteneur.querySelector('.ligne button[data-action]') || conteneur.querySelector('a, button');
        if (suivant) suivant.focus();
      }
    });
  }

  /* Zone d'annonce pour les lecteurs d'écran */
  var annonceur = document.createElement('p');
  annonceur.className = 'visuellement-cache';
  annonceur.setAttribute('role', 'status');
  annonceur.setAttribute('aria-live', 'polite');
  document.body.appendChild(annonceur);
  function annoncer(texte) {
    annonceur.textContent = '';
    setTimeout(function () { annonceur.textContent = texte; }, 50);
  }

  /* ─── Tiroir ─── */
  var voile = document.createElement('div');
  voile.className = 'voile';
  voile.hidden = true;
  var tiroir = document.createElement('div');
  tiroir.className = 'tiroir';
  tiroir.id = 'tiroirPanier';
  tiroir.setAttribute('role', 'dialog');
  tiroir.setAttribute('aria-modal', 'true');
  tiroir.setAttribute('aria-labelledby', 'tiroirTitre');
  tiroir.hidden = true;
  tiroir.innerHTML =
    '<div class="tiroir-haut"><h2 id="tiroirTitre">Ton panier</h2>' +
    '<button type="button" class="bouton-icone" id="fermerTiroir">' + OX.icone('fermer') + '<span class="visuellement-cache">Fermer le panier</span></button></div>' +
    '<div class="tiroir-corps" id="tiroirCorps"></div>' +
    '<div class="tiroir-bas" id="tiroirBas"></div>';
  document.body.appendChild(voile);
  document.body.appendChild(tiroir);
  var tiroirCorps = tiroir.querySelector('#tiroirCorps');
  var tiroirBas = tiroir.querySelector('#tiroirBas');
  brancherLignes(tiroirCorps);

  var declencheur = null;
  var minuteurTiroir = null;
  var minuteurMessage = null;
  var messageAjout = '';

  function rendreTiroir() {
    var lignes = lire();
    var t = totaux(lignes);
    var message = messageAjout
      ? '<p class="message-ajout entre" role="status">' + OX.icone('coche') + '<span>' + OX.echapper(messageAjout) + '</span></p>'
      : '';
    if (!lignes.length) {
      tiroirCorps.innerHTML = message + '<div class="panier-vide"><p>Ton panier est vide.</p><a class="bouton bouton-principal" href="boutique.html">Découvrir la gamme</a></div>';
      tiroirBas.hidden = true;
      return;
    }
    tiroirBas.hidden = false;
    tiroirCorps.innerHTML = message + htmlProgression(t) + htmlLignes(lignes);
    tiroirBas.innerHTML = htmlTotaux(t) +
      '<a class="bouton bouton-principal bouton-pleine-largeur" href="commande.html">Passer la commande</a>' +
      '<a class="lien" href="panier.html">Voir le panier complet</a>';
  }

  function ouvrirTiroir(origine) {
    clearTimeout(minuteurTiroir);
    declencheur = origine || document.activeElement;
    rendreTiroir();
    voile.hidden = false;
    tiroir.hidden = false;
    void tiroir.offsetWidth;
    voile.classList.add('ouvert');
    tiroir.classList.add('ouvert');
    document.body.classList.add('sans-defilement');
    document.getElementById('fermerTiroir').focus();
  }
  function fermerTiroir() {
    if (tiroir.hidden) return;
    voile.classList.remove('ouvert');
    tiroir.classList.remove('ouvert');
    document.body.classList.remove('sans-defilement');
    minuteurTiroir = setTimeout(function () { tiroir.hidden = true; voile.hidden = true; }, 190);
    messageAjout = '';
    if (declencheur && document.contains(declencheur)) declencheur.focus();
    else { var b = document.getElementById('boutonPanier'); if (b) b.focus(); }
  }
  document.getElementById('fermerTiroir').addEventListener('click', fermerTiroir);
  voile.addEventListener('click', fermerTiroir);
  tiroir.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { fermerTiroir(); return; }
    OX.pieger(tiroir, e);
  });
  var boutonPanier = document.getElementById('boutonPanier');
  if (boutonPanier) boutonPanier.addEventListener('click', function () { messageAjout = ''; ouvrirTiroir(boutonPanier); });

  /* Ajout depuis un bouton : ouvre le tiroir avec le message */
  function ajouterEtMontrer(slugs, origine, message) {
    slugs.forEach(function (s) { ajouter(s.slug || s, s.qte || 1); });
    messageAjout = message || 'Ajouté au panier';
    annoncer(messageAjout);
    clearTimeout(minuteurMessage);
    minuteurMessage = setTimeout(function () {
      messageAjout = '';
      var m = tiroirCorps.querySelector('.message-ajout');
      if (m) m.remove();
    }, 3000);
    // Sur la page panier, pas de tiroir : la page se met à jour.
    if (document.body.hasAttribute('data-sans-tiroir')) return;
    ouvrirTiroir(origine);
  }

  /* Boutons « Ajouter au panier » déclaratifs (data-ajouter="slug") */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-ajouter]');
    if (!b) return;
    e.preventDefault();
    var slug = b.getAttribute('data-ajouter');
    var p = OX.parSlug(slug);
    if (!p) return;
    var champ = b.getAttribute('data-quantite') ? document.querySelector(b.getAttribute('data-quantite')) : null;
    var qte = champ ? parseInt(champ.value || champ.textContent, 10) : 1;
    ajouterEtMontrer([{ slug: slug, qte: qte }], b, (qte > 1 ? qte + ' × ' : '') + p.nom + ' ajouté au panier');
  });

  /* ─── Pastille ─── */
  var dernierNombre = null;
  function rafraichir(local) {
    var n = nombreArticles();
    var pastille = document.getElementById('pastillePanier');
    var texte = document.getElementById('pastilleTexte');
    if (pastille) {
      pastille.hidden = n === 0;
      pastille.textContent = n > 99 ? '99+' : String(n);
      if (texte) texte.textContent = n === 0 ? 'vide' : (n + (n > 1 ? ' articles' : ' article'));
      if (dernierNombre !== null && n !== dernierNombre && local) {
        pastille.classList.remove('pulse');
        void pastille.offsetWidth;
        pastille.classList.add('pulse');
      }
    }
    dernierNombre = n;
    if (!tiroir.hidden) rendreTiroir();
    document.dispatchEvent(new CustomEvent('panier:change'));
  }
  window.addEventListener('storage', function (e) {
    if (e.key === CLE || e.key === null) rafraichir(false);
  });

  window.Panier = {
    lire: lire,
    ajouter: ajouter,
    ajouterEtMontrer: ajouterEtMontrer,
    definirQte: definirQte,
    retirer: retirer,
    vider: vider,
    totaux: totaux,
    nombreArticles: nombreArticles,
    htmlLignes: htmlLignes,
    htmlTotaux: htmlTotaux,
    htmlProgression: htmlProgression,
    brancherLignes: brancherLignes,
    ouvrir: ouvrirTiroir,
    fermer: fermerTiroir,
    annoncer: annoncer,
    SEUIL: SEUIL,
    FRAIS: FRAIS,
    QTE_MAX: QTE_MAX
  };

  /* ─── Page panier.html ─── */
  var page = document.getElementById('pagePanier');
  if (page) {
    var lignesPage = document.getElementById('panierLignes');
    var resumePage = document.getElementById('panierResume');
    brancherLignes(lignesPage);
    var rendrePage = function () {
      var lignes = lire();
      var t = totaux(lignes);
      if (!lignes.length) {
        lignesPage.innerHTML = '<div class="panier-vide"><p>Ton panier est vide.</p><a class="bouton bouton-principal" href="boutique.html">Découvrir la gamme</a></div>';
        resumePage.hidden = true;
        return;
      }
      resumePage.hidden = false;
      lignesPage.innerHTML = htmlLignes(lignes);
      resumePage.innerHTML = '<h2>Récapitulatif</h2>' + htmlProgression(t) + htmlTotaux(t) +
        '<p class="mention">Retrait gratuit en boutique à Lyon ou à Annecy : tu le choisis à l’étape suivante.</p>' +
        '<a class="bouton bouton-principal bouton-pleine-largeur" href="commande.html">Passer la commande</a>' +
        '<a class="lien" href="boutique.html">Continuer mes achats</a>';
    };
    document.addEventListener('panier:change', rendrePage);
    rendrePage();
  }

  rafraichir(false);
})();
