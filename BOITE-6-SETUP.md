# Mise en place — Boîte de 6 cookies

## Ce qui est déjà fait (code)

- `templates/product.box.json` — template de page produit dédié
- `sections/main-box.liquid` — sélecteur interactif avec compteur de progression
- `assets/theme.js` — ouverture du drawer panier après ajout

---

## Ce qu'il reste à faire dans l'admin Shopify

### 1. Créer le produit "Boîte de 6 cookies"

1. Va dans **Produits → Ajouter un produit**
2. Remplis :
   - **Titre** : `Boîte de 6 cookies` (ou ce que tu veux)
   - **Description** (optionnelle) : affichée en haut de la page sélecteur
   - **Prix** : le prix d'une boîte de 6
   - **Type de produit** : `box` (important — permet de l'exclure de la collection cookies si tu veux)
   - **Quantité en stock** : mets une grande quantité ou désactive le suivi de stock
3. Ajoute une photo (la boîte, par exemple)
4. Dans la colonne de droite, section **Modèle de page de thème**, sélectionne **`box`**
5. Clique **Enregistrer**

---

### 2. Créer la collection "cookies" (si pas encore fait)

> Si elle existe déjà, passe à l'étape 3.

1. Va dans **Produits → Collections → Créer une collection**
2. **Titre** : `Cookies`
3. **Type** : Automatisée
4. **Condition** : Type de produit est égal à `cookie`
5. Enregistre

> Tous tes produits avec le type `cookie` s'y ajouteront automatiquement. Le produit "Boîte de 6" a le type `box` donc il n'y apparaîtra pas.

---

### 3. Configurer la section dans le personnalisateur

1. Va dans **Boutique en ligne → Personnaliser**
2. En haut, clique sur le sélecteur de page (qui dit "Page d'accueil") → **Produits** → sélectionne **Boîte de 6 cookies**
3. Dans le panneau de gauche, clique sur la section **Boîte de 6**
4. Dans le champ **Collection de cookies à afficher**, sélectionne la collection `Cookies`
5. Clique **Enregistrer**

---

## Comment ça marche pour le client

1. Le client arrive sur la page de la boîte
2. Il voit tous les cookies disponibles avec un compteur `0 / 6`
3. Il clique `+` sur chaque cookie qu'il veut (il peut prendre plusieurs du même)
4. Le bouton "Ajouter au panier" se débloque uniquement quand exactement 6 sont sélectionnés
5. La boîte s'ajoute au panier avec les choix enregistrés comme propriétés de ligne

---

## Ce que tu vois dans la commande (admin)

Dans **Commandes**, chaque boîte affiche le détail des cookies choisis :

```
Boîte de 6 cookies — 1×
  chocolat noir: 2
  pistache: 1
  caramel beurre salé: 3
```

---

## Notes

- Si un cookie est **épuisé** (`available: false`), il n'apparaît pas dans le sélecteur
- Le prix affiché est celui de la boîte entière, pas des cookies individuels
- Pour changer la taille de la boîte (ex : 4 ou 8), modifie `box_size = 6` dans `sections/main-box.liquid` ligne 3
