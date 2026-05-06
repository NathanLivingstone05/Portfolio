# Portfolio — Nathan Livingstone

Portfolio personnel · BUT Techniques de Commercialisation (parcours MDEE) · IUT de Toulon
Master MBFA · Recherche d'alternance dans le secteur bancaire — rentrée 2026.

## Stack

Site statique pur — **HTML / CSS / JavaScript vanilla**. Aucune dépendance, aucun build step.

- `index.html` — Accueil (Hero-Centric, value-prop, triptyque, proof, CTA)
- `profil.html` — CV éditorial complet
- `but-tc.html` + `but1.html` / `but2.html` / `but3.html` + UE détaillées
- `skills.html` + `hard-skills.html` / `soft-skills.html` / `mad-skills.html`
- `contact.html` — Formulaire (Formspree) + coordonnées

## Publier sur GitHub Pages

1. Créer un nouveau repo sur GitHub (ex. `portfolio-nathan`).
2. Initialiser et pousser :
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<ton-pseudo>/portfolio-nathan.git
   git push -u origin main
   ```
3. Sur GitHub : **Settings → Pages → Source : `main` / branch `/ (root)`** → **Save**.
4. Le site sera publié sous quelques minutes à `https://<ton-pseudo>.github.io/portfolio-nathan/`.

> Pour avoir l'URL `https://<ton-pseudo>.github.io/` directement (sans suffixe), nomme le repo `<ton-pseudo>.github.io`.

## Mettre à jour la clé Formspree (form contact)

Le formulaire utilise [Formspree](https://formspree.io). L'endpoint est dans `contact.html` :
```html
<form action="https://formspree.io/f/xreojjjo" method="POST">
```
Si tu veux ton propre endpoint : crée un compte Formspree → copie ton `f/<id>` → remplace.

## Domaine personnalisé (optionnel)

1. Ajouter un fichier `CNAME` à la racine contenant ton domaine (ex. `nathan-livingstone.fr`).
2. Configurer les DNS chez ton registrar :
   - Type `A` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Type `CNAME` (pour `www`) → `<ton-pseudo>.github.io`
3. Sur GitHub : **Settings → Pages → Custom domain** → renseigner et activer HTTPS.

## Performance / accessibilité

- 0 framework, 0 build → poids minimal
- `prefers-reduced-motion` respecté (toutes animations désactivables)
- Touch targets ≥ 44px (WCAG)
- Contraste navy/gold WCAG AA
- `font-size: 16px` sur les inputs mobiles (anti-zoom iOS)
- Meta tags Open Graph pour partage social

## Crédits

- Design system généré via [`ui-ux-pro-max`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) (Claude Code skill)
- Composants inspirés de [21st.dev](https://21st.dev) (Claude Code MCP)
- Typo : Cormorant Garamond + DM Sans (Google Fonts)
