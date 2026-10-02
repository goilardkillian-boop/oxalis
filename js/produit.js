/* ═══════════════════════════════════════════════════════════
   OXALIS HOMME · fiche produit (produit.html?p=slug)
   Construit la fiche depuis data/produits.js, met à jour le titre,
   la description et les données structurées.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var OX = window.OX;
  var zone = document.getElementById('fiche');
  var slug = new URLSearchParams(location.search).get('p');
  var p = slug ? OX.parSlug(slug) : null;

  if (!p) {
    document.title = 'Produit introuvable · Oxalis Homme';
    zone.innerHTML =
      '<div class="conteneur"><div class="vide">' +
        '<h1>Ce produit n’existe pas.</h1>' +
        '<p>Le lien est peut-être incomplet. Toute la gamme t’attend dans la boutique.</p>' +
        '<a class="bouton bouton-principal" href="boutique.html">Voir la boutique</a>' +
      '</div></div>';
    return;
  }

  /* ─── Titre, description, JSON-LD ─── */
  // Gabarit « [Nom] : [sous-titre] · Oxalis Homme », raccourci si plus de 60 caractères
  var sousTitre = p.sous_titre.charAt(0).toLowerCase() + p.sous_titre.slice(1).replace(' : ', ', ');
  var titre = p.nom + ' : ' + sousTitre + ' · Oxalis Homme';
  document.title = titre.length <= 60 ? titre : p.nom + ' : ' + sousTitre;
  var md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute('content', p.accroche);
  var ogt = document.querySelector('meta[property="og:title"]');
  if (ogt) ogt.setAttribute('content', document.title);
  var ogd = document.querySelector('meta[property="og:description"]');
  if (ogd) ogd.setAttribute('content', p.accroche);
  var can = document.querySelector('link[rel="canonical"]');
  if (can) can.setAttribute('href', 'produit.html?p=' + p.slug);

  function absolu(chemin) { return new URL(chemin, location.href).href; }
  var ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: p.nom,
        description: p.description,
        image: absolu('images/' + p.image_principale),
        sku: p.slug,
        category: p.categorie,
        brand: { '@type': 'Brand', name: 'Oxalis Homme' },
        offers: {
          '@type': 'Offer',
          url: absolu('produit.html?p=' + p.slug),
          priceCurrency: 'EUR',
          price: (p.prix_centimes / 100).toFixed(2),
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition'
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: absolu('index.html') },
          { '@type': 'ListItem', position: 2, name: 'Boutique', item: absolu('boutique.html') },
          { '@type': 'ListItem', position: 3, name: p.nom, item: absolu('produit.html?p=' + p.slug) }
        ]
      }
    ]
  };
  if (p.poids_g) ld['@graph'][0].weight = { '@type': 'QuantitativeValue', value: p.poids_g, unitCode: 'GRM' };
  var script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(ld);
  document.head.appendChild(script);

  /* ─── Construction de la fiche ─── */
  var kilo = OX.prixKiloCentimes(p);
  var mentionKilo = kilo ? '<p class="mention">soit ' + OX.prix(kilo) + ' le kilo</p>' : '';
  var economie = p.prix_separe_centimes
    ? '<p class="mention">Au lieu de ' + OX.prix(p.prix_separe_centimes) + ' pour les trois soins achetés séparément.</p>'
    : '';

  var encart = '';
  if (p.slug === 'baume-hydratant-solide') {
    encart = '<div class="encart"><p>Déjà la boîte ? Prends la recharge : ' + OX.prix(OX.parSlug('recharge-baume').prix_centimes) + '.</p>' +
      '<a class="lien" href="produit.html?p=recharge-baume">Voir la recharge</a></div>';
  } else if (p.slug === 'recharge-baume') {
    encart = '<div class="encart"><p>Il te faut la boîte ? Le Baume est vendu dans sa boîte en aluminium : ' + OX.prix(OX.parSlug('baume-hydratant-solide').prix_centimes) + '.</p>' +
      '<a class="lien" href="produit.html?p=baume-hydratant-solide">Voir le Baume</a></div>';
  } else if (p.slug === 'pain-de-rasage') {
    encart = '<div class="encart"><p>Le Bol en hêtre est vendu séparément : ' + OX.prix(OX.parSlug('bol-en-hetre').prix_centimes) + '.</p>' +
      '<a class="lien" href="produit.html?p=bol-en-hetre">Voir le bol</a></div>';
  }

  var contenuCoffret = '';
  if (p.contenu_slugs) {
    contenuCoffret = '<p class="mention">Contient : ' + p.contenu_slugs.map(function (s) { return OX.parSlug(s).nom; }).join(', ') + '.</p>';
  }

  var plus = OX.icone('plus');

  zone.innerHTML =
    '<div class="conteneur">' +
      '<nav class="ariane" aria-label="Fil d’Ariane"><ol>' +
        '<li><a href="index.html">Accueil</a></li>' +
        '<li><a href="boutique.html">Boutique</a></li>' +
        '<li><span aria-current="page">' + OX.echapper(p.nom) + '</span></li>' +
      '</ol></nav>' +
      '<div class="fiche">' +
        '<div class="fiche-image">' + OX.imageProduit(p, { prioritaire: true, grand: true, sizes: '(max-width: 1023px) 100vw, 660px' }) + '</div>' +
        '<div class="fiche-infos">' +
          '<p class="etiquette">' + OX.etiquette(p) + '</p>' +
          '<h1>' + OX.echapper(p.nom) + '</h1>' +
          '<p class="sous-titre">' + OX.echapper(p.sous_titre) + '</p>' +
          '<div class="fiche-prix"><p class="prix">' + OX.prix(p.prix_centimes) + '</p>' + mentionKilo + economie + '<p class="mention">Prix TTC. Livraison 4,90 €, offerte dès 45 €.</p></div>' +
          '<div class="fiche-achat">' +
            '<div class="quantite" role="group" aria-label="Quantité">' +
              '<button type="button" id="qteMoins" disabled>' + OX.icone('moins') + '<span class="visuellement-cache">Diminuer la quantité</span></button>' +
              '<output id="qteValeur" aria-live="polite" aria-label="Quantité">1</output>' +
              '<button type="button" id="qtePlus">' + OX.icone('plus') + '<span class="visuellement-cache">Augmenter la quantité</span></button>' +
            '</div>' +
            '<button type="button" class="bouton bouton-principal" data-ajouter="' + p.slug + '" data-quantite="#qteValeur">Ajouter au panier</button>' +
          '</div>' +
          encart +
          '<p class="fiche-description">' + OX.echapper(p.description) + '</p>' +
          contenuCoffret +
          '<ul class="points-cles">' + p.points_cles.map(function (pt) {
            return '<li>' + OX.icone(OX.iconePoint(pt)) + '<span>' + OX.echapper(pt) + '</span></li>';
          }).join('') + '</ul>' +
          '<div class="accordeons">' +
            '<details><summary>Comment l’utiliser' + plus + '</summary><div class="accordeon-contenu"><ol>' +
              p.utilisation.map(function (u) { return '<li>' + OX.echapper(u) + '</li>'; }).join('') +
            '</ol></div></details>' +
            '<details><summary>Composition' + plus + '</summary><div class="accordeon-contenu"><p>' +
              (p.inci ? OX.echapper(p.inci) : 'La liste complète des ingrédients (INCI) sera affichée ici. Elle n’est pas disponible sur ce site de démonstration.') +
            '</p></div></details>' +
            '<details><summary>Livraison et retours' + plus + '</summary><div class="accordeon-contenu">' +
              '<p>Livraison à domicile en 2 à 4 jours ouvrés en France métropolitaine : 4,90 €, offerte dès 45 € d’achat. Retrait gratuit dans nos boutiques de Lyon et d’Annecy.</p>' +
              '<p>Tu as 14 jours après réception pour changer d’avis. Le retour est possible si le produit n’a pas été ouvert. <a class="lien" href="cgv.html#retractation">Lire les conditions</a></p>' +
            '</div></details>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<section class="section" aria-labelledby="titreComplete"><div class="conteneur">' +
      '<div class="titre-section"><div><h2 id="titreComplete">Complète ta routine</h2><p>Trois gestes le matin : nettoyer, raser, hydrater.</p></div>' +
      '<a class="lien" href="routine.html">Composer ma routine en 3 gestes</a></div>' +
      '<ul class="grille-produits" id="grilleComplete"></ul>' +
    '</div></section>';

  /* Bloc « Complète ta routine » : les autres gestes et le coffret */
  var suggestions = ['nettoyant-visage-solide', 'pain-de-rasage', 'baume-hydratant-solide', 'coffret-routine-3-gestes']
    .filter(function (s) {
      if (s === p.slug) return false;
      if (p.slug === 'recharge-baume' && s === 'baume-hydratant-solide') return false;
      return true;
    });
  if (p.categorie === 'coffret') suggestions = ['recharge-baume', 'bol-en-hetre'];
  suggestions = suggestions.slice(0, 3);
  document.getElementById('grilleComplete').innerHTML = suggestions.map(function (s) {
    var q = OX.parSlug(s);
    return '<li><article class="carte">' +
      '<div class="carte-image">' + OX.imageProduit(q, { decoratif: true }) + '</div>' +
      '<div class="carte-corps"><p class="etiquette">' + OX.etiquette(q) + '</p>' +
      '<h3><a href="produit.html?p=' + q.slug + '">' + OX.echapper(q.nom) + '</a></h3>' +
      '<p class="carte-sous-titre">' + OX.echapper(q.sous_titre) + '</p>' +
      '<div class="carte-bas"><p><span class="prix">' + OX.prix(q.prix_centimes) + '</span></p>' +
      '<button type="button" class="bouton bouton-principal" data-ajouter="' + q.slug + '">Ajouter au panier<span class="visuellement-cache"> : ' + OX.echapper(q.nom) + '</span></button></div>' +
      '</div></article></li>';
  }).join('');

  /* ─── Sélecteur de quantité (1 à 10) ─── */
  var valeur = document.getElementById('qteValeur');
  var moins = document.getElementById('qteMoins');
  var plusB = document.getElementById('qtePlus');
  function fixer(n) {
    n = Math.max(1, Math.min(window.Panier.QTE_MAX, n));
    valeur.value = String(n);
    valeur.textContent = String(n);
    moins.disabled = n <= 1;
    plusB.disabled = n >= window.Panier.QTE_MAX;
  }
  moins.addEventListener('click', function () { fixer(parseInt(valeur.textContent, 10) - 1); if (moins.disabled) plusB.focus(); });
  plusB.addEventListener('click', function () { fixer(parseInt(valeur.textContent, 10) + 1); if (plusB.disabled) moins.focus(); });
})();
