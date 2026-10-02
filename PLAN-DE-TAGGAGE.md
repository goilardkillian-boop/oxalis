# Plan de taggage · Oxalis Homme

Document de travail pour la campagne de lancement d'Oxalis Homme (semaine du 20 au 26 octobre 2026).
**Aucun script de mesure n'est installé sur ce site de démonstration.** Ce plan décrit ce qu'il faudrait mesurer sur le site réel, avec l'outil prévu par la marque : Matomo Cloud (sans cookie publicitaire, exemption de consentement possible si l'outil est configuré selon les recommandations de la CNIL).

## 1. Les questions auxquelles la mesure doit répondre

| Question | Décision qu'elle éclaire |
|---|---|
| Quel support amène le plus de visites, et les meilleures ? | Où mettre l'effort pendant la semaine de lancement |
| Les visiteurs composent-ils leur routine ? | Garder ou retravailler la page « routine » |
| La règle du coffret pousse-t-elle vers le coffret ? | Garder l'offre coffret à 39,90 € |
| Où les visiteurs abandonnent-ils : fiche, panier ou commande ? | Lever les freins (prix, livraison, formulaire) |

Objectifs de campagne (`.agents/product-marketing.md`) : **500 visites** sur la page Oxalis Homme pendant la semaine de lancement, **taux de conversion d'au moins 2 %**.

## 2. Liens UTM des 3 supports de campagne

Règles de nommage : tout en minuscules, sans accent, mots séparés par `_`. Même `utm_campaign` partout : `lancement_homme`.

Adresse de base : `https://goilardkillian-boop.github.io/oxalis/`

| Support | utm_source | utm_medium | utm_content | Lien complet |
|---|---|---|---|---|
| Instagram Oxalis (publication et story) | `instagram` | `social` | `post_lancement` / `story_lancement` | `https://goilardkillian-boop.github.io/oxalis/?utm_source=instagram&utm_medium=social&utm_campaign=lancement_homme&utm_content=post_lancement` |
| Newsletter Oxalis (environ 3 000 inscrits) | `newsletter` | `email` | `bouton_routine` | `https://goilardkillian-boop.github.io/oxalis/routine.html?utm_source=newsletter&utm_medium=email&utm_campaign=lancement_homme&utm_content=bouton_routine` |
| LinkedIn de la fondatrice | `linkedin` | `social` | `post_fondatrice` | `https://goilardkillian-boop.github.io/oxalis/?utm_source=linkedin&utm_medium=social&utm_campaign=lancement_homme&utm_content=post_fondatrice` |

Pour la story Instagram, remplacer `utm_content=post_lancement` par `utm_content=story_lancement`, afin de comparer les deux formats.

## 3. Événements à mesurer

Format Matomo : catégorie / action / nom (et valeur quand il y a un montant, en euros).

| Événement | Catégorie | Action | Nom / propriétés | Déclencheur | Page |
|---|---|---|---|---|---|
| Clic sur l'appel à l'action principal | `cta` | `clic` | `composer_routine` + emplacement (`accueil_dock`, `accueil_processus`, `boutique_bandeau`, `fiche`, `a_propos`) | Clic sur « Composer ma routine » | toutes |
| Filtre de la boutique | `boutique` | `filtre` | `tout`, `soin`, `recharge`, `accessoire`, `coffret` | Clic sur un filtre | boutique |
| Vue d'une fiche produit | (e-commerce) | `productView` | slug, nom, catégorie, prix | Chargement de la fiche | produit |
| Ajout au panier | (e-commerce) | `addEcommerceItem` | slug, prix, quantité, origine (`carte`, `fiche`, `complete_routine`, `routine`) | Clic sur « Ajouter au panier » | boutique, fiche, routine |
| Routine composée | `routine` | `ajout_panier` | `coffret` ou `unites` · options (`bol`, `recharge`) · valeur totale | Clic sur « Ajouter ma routine au panier » | routine |
| Changement d'un geste | `routine` | `geste_coche` / `geste_decoche` | `geste_1`, `geste_2`, `geste_3`, `option_bol`, `option_recharge` | Case cochée ou décochée | routine |
| Ouverture du panier | `panier` | `ouverture` | `tiroir` ou `page` | Ouverture du tiroir ou de panier.html | toutes |
| Début de commande | `commande` | `debut` | valeur du panier | Chargement de commande.html | commande |
| Choix de livraison | `commande` | `livraison` | `domicile`, `lyon`, `annecy` | Changement de mode | commande |
| Erreur de formulaire | `commande` | `erreur` | nom du champ (`email`, `cp`, `cgv`, …) | Erreur à la validation | commande |
| Commande validée | (e-commerce) | `trackEcommerceOrder` | total, sous-total, livraison, lignes | Affichage de la confirmation | confirmation |

Aucune donnée personnelle (nom, e-mail, adresse) n'est envoyée à l'outil de mesure.

## 4. Objectifs et entonnoir

- **Objectif 1 : visites de lancement.** Visites avec `utm_campaign=lancement_homme`, du 20 au 26 octobre 2026. Cible : 500.
- **Objectif 2 : conversion.** Commandes validées / visites de la campagne. Cible : au moins 2 % (soit 10 commandes pour 500 visites).
- **Entonnoir à suivre :** accueil ou routine → fiche produit → ajout au panier → début de commande → commande validée.

## 5. Vérifications avant la mise en ligne réelle

1. Ouvrir chaque lien UTM et vérifier dans le temps réel de Matomo que la source et la campagne sont bien reconnues.
2. Faire un parcours d'achat complet et vérifier chaque événement du tableau.
3. Vérifier qu'aucune donnée personnelle n'apparaît dans les rapports.
4. Mettre à jour la politique de confidentialité (outil de mesure, durée de conservation).
