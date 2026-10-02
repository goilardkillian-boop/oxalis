/* Copie de contenu/produits.json (catalogue fictif Oxalis Homme).
   Exposée en variable globale pour fonctionner sans requête réseau. */
window.OXALIS_PRODUITS = {
  "_note": "Catalogue fictif Oxalis Homme (cas d'école). Prix TTC en centimes d'euro. Tout ce qui est marqué a_valider est une hypothèse à confirmer par la marque.",
  "devise": "EUR",
  "livraison": {
    "frais_centimes": 490,
    "gratuite_des_centimes": 4500,
    "delai": "2 à 4 jours ouvrés en France métropolitaine",
    "retrait_boutique": [
      "Lyon",
      "Annecy"
    ],
    "a_valider": true
  },
  "produits": [
    {
      "slug": "nettoyant-visage-solide",
      "nom": "Le Nettoyant",
      "sous_titre": "Nettoyant visage solide au charbon",
      "geste": 1,
      "geste_nom": "Nettoyer",
      "categorie": "soin",
      "prix_centimes": 1290,
      "poids_g": 60,
      "accroche": "Un pain gris anthracite qui mousse en quelques secondes sous l'eau.",
      "description": "Le premier geste de la routine. Tu le passes sous l'eau, tu fais mousser entre tes mains, tu masses le visage, tu rinces. Pas de flacon, pas de pompe.",
      "utilisation": [
        "Mouille le pain et tes mains.",
        "Fais mousser 5 secondes.",
        "Masse le visage, rince à l'eau claire.",
        "Laisse sécher le pain sur un support aéré."
      ],
      "points_cles": [
        "Format solide de 60 g",
        "Emballage en carton, sans flacon plastique",
        "Se range sur un porte-savon"
      ],
      "image_principale": "p-nettoyant.jpg",
      "image_secours": "01-trio-pierre-4x5.jpg",
      "rechargeable": false,
      "inci": null
    },
    {
      "slug": "pain-de-rasage",
      "nom": "Le Pain de rasage",
      "sous_titre": "Savon de rasage solide",
      "geste": 2,
      "geste_nom": "Raser",
      "categorie": "soin",
      "prix_centimes": 1390,
      "poids_g": 70,
      "accroche": "Une mousse dense, pour un rasoir qui glisse.",
      "description": "Le deuxième geste. Frotte le pain humide du bout des doigts ou avec un blaireau, applique la mousse, rase. Il tient dans son bol en hêtre et sèche entre deux rasages.",
      "utilisation": [
        "Humidifie le pain.",
        "Fais monter la mousse du bout des doigts ou au blaireau.",
        "Applique sur la barbe mouillée, puis rase.",
        "Rince et laisse sécher à l'air."
      ],
      "points_cles": [
        "Format solide de 70 g",
        "Emballage en carton, sans flacon plastique",
        "Compatible avec le Bol en hêtre"
      ],
      "image_principale": "p-pain-rasage.jpg",
      "image_secours": "04-macro-savon-mousse-4x5.jpg",
      "rechargeable": false,
      "inci": null
    },
    {
      "slug": "baume-hydratant-solide",
      "nom": "Le Baume",
      "sous_titre": "Baume hydratant solide, boîte rechargeable",
      "geste": 3,
      "geste_nom": "Hydrater",
      "categorie": "soin",
      "prix_centimes": 1690,
      "poids_g": 40,
      "accroche": "Une noisette suffit. La boîte, tu la gardes.",
      "description": "Le troisième geste. Le baume fond au contact des doigts et s'applique sur le visage après le rasage. Sa boîte en aluminium se recharge : quand elle est vide, tu glisses une recharge dedans.",
      "utilisation": [
        "Chauffe une noisette de baume entre tes doigts.",
        "Applique sur le visage propre et sec.",
        "Referme la boîte."
      ],
      "points_cles": [
        "40 g de baume",
        "Boîte en aluminium rechargeable",
        "Recharge vendue séparément"
      ],
      "image_principale": "p-baume.jpg",
      "image_secours": "02-flatlay-gamme-4x5.jpg",
      "rechargeable": true,
      "recharge_slug": "recharge-baume",
      "inci": null
    },
    {
      "slug": "recharge-baume",
      "nom": "La Recharge Baume",
      "sous_titre": "Recharge de baume hydratant solide",
      "geste": 3,
      "geste_nom": "Hydrater",
      "categorie": "recharge",
      "prix_centimes": 1190,
      "poids_g": 40,
      "accroche": "Même baume, sans la boîte.",
      "description": "Un disque de baume emballé dans du papier kraft. Tu le poses dans ta boîte en aluminium vide et c'est reparti.",
      "utilisation": [
        "Retire le papier.",
        "Place la recharge dans la boîte vide.",
        "Presse légèrement pour la caler."
      ],
      "points_cles": [
        "40 g de baume",
        "Emballage en papier kraft",
        "Pour la boîte du Baume Oxalis Homme"
      ],
      "image_principale": "p-recharge-baume.jpg",
      "image_secours": "02-flatlay-gamme-4x5.jpg",
      "rechargeable": false,
      "inci": null
    },
    {
      "slug": "bol-en-hetre",
      "nom": "Le Bol en hêtre",
      "sous_titre": "Bol à raser en bois tourné",
      "geste": 2,
      "geste_nom": "Raser",
      "categorie": "accessoire",
      "prix_centimes": 1400,
      "poids_g": null,
      "accroche": "Le pain de rasage a trouvé sa place.",
      "description": "Un bol en bois tourné qui accueille le Pain de rasage, le laisse sécher et se pose sur le bord du lavabo.",
      "utilisation": [
        "Pose le pain dans le bol.",
        "Laisse sécher à l'air libre après usage."
      ],
      "points_cles": [
        "Bois de hêtre",
        "Diamètre adapté au Pain de rasage",
        "Sèche à l'air libre"
      ],
      "image_principale": "p-bol-hetre.jpg",
      "image_secours": "01-trio-pierre-4x5.jpg",
      "rechargeable": false,
      "inci": null
    },
    {
      "slug": "coffret-routine-3-gestes",
      "nom": "Le Coffret Routine",
      "sous_titre": "Les 3 soins : nettoyer, raser, hydrater",
      "geste": 0,
      "geste_nom": "Routine complète",
      "categorie": "coffret",
      "prix_centimes": 3990,
      "poids_g": 170,
      "contenu_slugs": [
        "nettoyant-visage-solide",
        "pain-de-rasage",
        "baume-hydratant-solide"
      ],
      "prix_separe_centimes": 4370,
      "accroche": "Toute la routine, dans une seule boîte en carton.",
      "description": "Le Nettoyant, le Pain de rasage et le Baume réunis. 39,90 € le coffret, contre 43,70 € pour les trois soins achetés séparément.",
      "utilisation": [
        "Geste 1 : nettoyer.",
        "Geste 2 : raser.",
        "Geste 3 : hydrater."
      ],
      "points_cles": [
        "3 soins solides",
        "Coffret en carton",
        "Boîte du baume rechargeable"
      ],
      "image_principale": "p-coffret.jpg",
      "image_secours": "01-trio-pierre-4x5.jpg",
      "rechargeable": false,
      "inci": null
    }
  ]
};
