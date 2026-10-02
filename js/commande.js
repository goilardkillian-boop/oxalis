/* ═══════════════════════════════════════════════════════════
   OXALIS HOMME · commande (démonstration)
   Rien n'est envoyé ni enregistré : à la validation, le panier
   est vidé et la page de confirmation s'affiche.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var OX = window.OX;
  var P = window.Panier;
  var envoi = false;

  if (!P.lire().length) {
    location.replace('boutique.html?message=panier-vide');
    return;
  }

  var form = document.getElementById('formCommande');
  var blocAdresse = document.getElementById('blocAdresse');
  var recap = document.getElementById('recapCommande');
  var recapTotaux = document.getElementById('recapTotaux');
  var recapResume = document.getElementById('resumeTotaux');

  /* Prix des modes de livraison, depuis les données */
  function mode() {
    var choisi = form.querySelector('input[name="livraison"]:checked');
    return choisi ? choisi.value : 'domicile';
  }

  function rendreRecap() {
    var lignes = P.lire();
    if (!lignes.length) {
      if (!envoi) location.replace('boutique.html?message=panier-vide');
      return;
    }
    var m = mode();
    var t = P.totaux(lignes, m);
    var html = '<ul class="recap-commande">' + lignes.map(function (l) {
      var p = OX.parSlug(l.slug);
      return '<li><span>' + OX.echapper(p.nom) + ' <span class="q">× ' + l.qte + '</span></span><span class="prix">' + OX.prix(p.prix_centimes * l.qte) + '</span></li>';
    }).join('') + '</ul>';
    recap.innerHTML = html;
    recapResume.innerHTML = html + P.htmlTotaux(t, m);
    recapTotaux.innerHTML = P.htmlTotaux(t, m);
    var domicile = document.getElementById('prixDomicile');
    if (domicile) domicile.textContent = t.sousTotal >= P.SEUIL ? 'Offerte' : OX.prix(P.FRAIS);
    blocAdresse.hidden = m !== 'domicile';
  }

  form.addEventListener('change', function (e) {
    if (e.target.name === 'livraison') rendreRecap();
  });
  document.addEventListener('panier:change', rendreRecap);

  /* ─── Validation ─── */
  var REGLES = {
    prenom: { requis: 'Indique ton prénom.' },
    nom: { requis: 'Indique ton nom.' },
    email: { requis: 'Indique ton adresse e-mail.', format: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, invalide: 'Vérifie ton adresse e-mail : il manque un @ ou un domaine (exemple : prenom@domaine.fr).' },
    tel: { format: /^[+0-9 .()-]{6,20}$/, invalide: 'Ce numéro ne semble pas valide. Il est facultatif : tu peux aussi laisser le champ vide.' },
    adresse: { requis: 'Indique ton adresse (numéro et rue).', siDomicile: true },
    cp: { requis: 'Indique ton code postal.', format: /^\d{5}$/, invalide: 'Le code postal doit contenir 5 chiffres.', siDomicile: true },
    ville: { requis: 'Indique ta ville.', siDomicile: true },
    cgv: { coche: 'Tu dois accepter les conditions générales de vente pour commander.' }
  };

  function poserErreur(champ, message) {
    var id = 'erreur-' + champ.id;
    var existant = document.getElementById(id);
    if (existant) existant.remove();
    var decrit = (champ.getAttribute('aria-describedby') || '').split(' ').filter(function (x) { return x && x !== id; });
    if (message) {
      var p = document.createElement('p');
      p.className = 'erreur-champ';
      p.id = id;
      p.innerHTML = OX.icone('alerte') + '<span>' + OX.echapper(message) + '</span>';
      var conteneur = champ.closest('.champ, .case-cgv');
      conteneur.appendChild(p);
      champ.setAttribute('aria-invalid', 'true');
      decrit.push(id);
    } else {
      champ.removeAttribute('aria-invalid');
    }
    if (decrit.length) champ.setAttribute('aria-describedby', decrit.join(' ')); else champ.removeAttribute('aria-describedby');
  }

  function verifier(champ) {
    var r = REGLES[champ.name];
    if (!r) return true;
    if (r.siDomicile && mode() !== 'domicile') { poserErreur(champ, null); return true; }
    if (r.coche) {
      var ok = champ.checked;
      poserErreur(champ, ok ? null : r.coche);
      return ok;
    }
    var v = champ.value.trim();
    if (!v) {
      poserErreur(champ, r.requis || null);
      return !r.requis;
    }
    if (r.format && !r.format.test(v)) { poserErreur(champ, r.invalide); return false; }
    poserErreur(champ, null);
    return true;
  }

  /* Une fois signalée, l'erreur se corrige en direct */
  form.addEventListener('input', function (e) {
    if (e.target.getAttribute('aria-invalid') === 'true') verifier(e.target);
  });
  form.addEventListener('change', function (e) {
    if (e.target.type === 'checkbox' && e.target.getAttribute('aria-invalid') === 'true') verifier(e.target);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var premier = null;
    Object.keys(REGLES).forEach(function (nom) {
      var champ = form.elements[nom];
      if (champ && !verifier(champ) && !premier) premier = champ;
    });
    if (premier) { premier.focus(); return; }
    // Démonstration : aucune donnée n'est envoyée ni conservée.
    envoi = true;
    form.reset();
    P.vider();
    location.href = 'confirmation.html';
  });

  rendreRecap();
})();
