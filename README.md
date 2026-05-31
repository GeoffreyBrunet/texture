# thème texture — Shopify (Online Store 2.0)

Thème Liquid sur-mesure qui reprend le design du prototype : palette Y2K orange,
typo bas-de-casse, étiquettes « dymo », visuels cookies en disques dégradés
(remplacés par les vraies photos dès qu'elles sont ajoutées).

---

## 1. Installer le thème

1. Zippe le **contenu** du dossier `texture-shopify/` (les dossiers `layout`,
   `templates`, `sections`, `snippets`, `assets`, `config`, `locales` doivent être
   à la racine du zip — **pas** un dossier parent `texture-shopify/`).
2. Admin Shopify → **Boutique en ligne → Thèmes → Ajouter un thème → Importer**.
3. **Publier** le thème (ou le laisser en aperçu le temps des réglages).

> Astuce dev : avec le Shopify CLI, `shopify theme dev` depuis ce dossier permet
> de prévisualiser en live et `shopify theme push` de déployer.

---

## 2. Créer les définitions de metafields (avant l'import)

Admin → **Paramètres → Métachamps → Produits → Ajouter une définition**.
Crée ces 4 metafields (espace de noms `custom`) :

| Nom / clé              | Type                         |
|------------------------|------------------------------|
| `custom.flavor_base`   | Couleur                      |
| `custom.flavor_top`    | Couleur                      |
| `custom.speck`         | Couleur                      |
| `custom.allergenes`    | Liste de · texte court (1 ligne) |

Les 3 couleurs servent au visuel dégradé tant qu'il n'y a pas de photo.
`allergenes` alimente les pastilles d'allergènes (règl. INCO 1169/2011).

---

## 3. Importer les cookies

Admin → **Produits → Importer** → choisis `cookies-import.csv`.
Les 6 cookies sont créés avec prix, description, couleurs de visuel et allergènes.

Ensuite, pour chaque produit : ajoute une **vraie photo** (carrée, ~1200 px).
Dès qu'une photo existe, elle remplace automatiquement le disque dégradé.

---

## 4. Créer la collection « cookies »

Admin → **Produits → Collections → Créer**.
- Titre : `cookies`
- Type : **automatisée**, condition « Type de produit = cookie ».

Puis branche-la dans la home : **Personnaliser → section « Rayon produits » → Collection**.
Et dans le Hero, choisis le cookie mis en avant (visuel).

---

## 5. Menus & pages

- **Contenu → Menus** : `main-menu` (la carte, le lieu, mon compte) et `footer`.
- **Contenu → Pages** : crée « le lieu » (modèle `page`).
- **Paramètres → Politiques** : CGV, confidentialité, remboursement —
  liées automatiquement dans le menu et le pied de page.

---

## 6. Retrait sur place (click & collect)

Admin → **Paramètres → Expédition et livraison → Retrait en magasin** →
active le retrait à l'adresse de la boutique (Limoges). Le checkout natif Shopify
gère le reste.

---

## Structure du thème

```
layout/theme.liquid            base HTML, fonts, réglages couleur
templates/                     index.json, product.json, collection.json,
                               page.json, cart.json, 404.liquid
sections/                      header, footer, hero, manifesto,
                               featured-collection, lieu-band,
                               main-product, main-collection, main-page, main-cart
snippets/                      product-card, product-media, cart-drawer
assets/                        theme.css, theme.js (tiroir panier AJAX)
config/                        settings_schema.json, settings_data.json
locales/                       fr.default.json
```

Réglages globaux dans **Personnaliser → Réglages du thème → Identité** :
orange signature, rondeur des coins, étiquettes dymo, étincelles.
