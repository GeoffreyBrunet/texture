# Mise en place — Livraison à domicile

## Ce qui est déjà fait (thème)

- Panier et drawer : mention "Retrait à Limoges ou livraison 24–48h · 6 € (gratuit dès 50 €)"
- Page d'accueil : pill "Retrait ou livraison ↗"

---

## Configuration dans l'admin Shopify

### 1. Activer la livraison + le retrait sur place

1. Va dans **Paramètres → Expédition et livraison**
2. Dans la section **Expédition**, clique sur **Gérer les tarifs**

---

### 2. Créer la zone France métropolitaine

1. Clique sur **Créer une zone d'expédition**
2. **Nom** : `France métropolitaine`
3. **Pays** : sélectionne **France** (ne coche pas les DOM-TOM si tu ne livres pas là-bas)
4. Clique **Enregistrer**

---

### 3. Ajouter les tarifs dans cette zone

Toujours dans la zone "France métropolitaine", clique **Ajouter un tarif** deux fois :

**Tarif 1 — Standard payant**
- Nom : `Livraison standard`
- Prix : `6,00 €`
- Condition de prix : **Aucune** (s'applique à toutes les commandes)

**Tarif 2 — Gratuit dès 50 €**
- Nom : `Livraison offerte`
- Prix : `0,00 €`
- Condition de prix : cocher **Basé sur le prix de la commande** → minimum `50,00 €`

> Shopify affiche automatiquement le tarif le moins cher applicable. En dessous de 50 €, le client voit 6 €. Au-dessus, il voit "Gratuit".

---

### 4. Activer le retrait sur place (Limoges)

1. Retourne dans **Paramètres → Expédition et livraison**
2. Fais défiler jusqu'à la section **Retrait local**
3. Clique **Configurer** (ou **Activer le retrait local**)
4. Clique sur l'adresse de ta boutique (ou ajoute-la si elle n'apparaît pas) :
   - Adresse : 4 rue Adrien Dubouché, 87000 Limoges
5. Active l'option **Proposer le retrait local à cette adresse**
6. **Délai de préparation** : `15 minutes` (ou ce que tu veux afficher)
7. **Instructions au client** (optionnel) : `Venez récupérer votre commande au bar, nous vous attendons.`
8. Enregistre

---

### 5. Vérifier en conditions réelles

1. Va sur ta boutique en navigation privée
2. Ajoute un produit au panier
3. Passe à la caisse
4. À l'étape "Livraison", tu dois voir :
   - **Retrait en magasin** — 0,00 € (avec l'adresse)
   - **Livraison standard** — 6,00 € (ou gratuit si commande ≥ 50 €)

---

## Transporteurs recommandés (juin 2026)

Pour connecter un vrai transporteur avec suivi, va dans **Paramètres → Expédition et livraison → Transporteurs et emballage** :

- **Colissimo** (La Poste) — intégration native Shopify, abonnement mensuel ou à l'acte
- **Chronopost** — pour du 24h garanti, tarif plus élevé
- **Mondial Relay** — pour du point relais (moins cher, ~4 €), à activer si tu veux cette option plus tard

Sans intégration transporteur, les étiquettes sont à créer manuellement sur le site du transporteur. Avec l'intégration, tu génères l'étiquette directement depuis la commande dans Shopify.

---

## Notes

- Les cookies sont des produits frais : pense à préciser sur la page produit et dans la confirmation de commande qu'ils sont expédiés sous emballage isotherme
- Si tu veux ajouter une mention "expédié le lundi et mercredi" (pour grouper les envois), ajoute-la dans la description produit ou dans les instructions de la zone d'expédition
