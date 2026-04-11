# WeatherNow

Application météo web construite avec **React**, **Vite**, **Tailwind CSS** et **Axios**. Elle utilise [WeatherAPI](https://www.weatherapi.com/) pour afficher la météo en temps réel, des prévisions sur trois jours et des détails (vent, humidité, nébulosité, ressenti).

## Fonctionnalités

- Recherche par ville (bouton ou touche **Entrée**)
- Géolocalisation (**Use my location**)
- Prévisions horaires du jour et aperçu sur **3 jours**
- Historique des recherches (**localStorage**)
- États de chargement et messages d’erreur (ville introuvable)
- **Mode clair / sombre** (Tailwind `darkMode: 'class'`)
- Interface responsive (mobile, tablette, desktop) inspirée des maquettes du projet

## Technologies

- React 18
- Vite 6
- Tailwind CSS 3
- Axios
- Lucide React (icônes)

## Installation

```bash
npm install
```

Créez un fichier `.env` à la racine (voir `.env.example`) :

```bash
cp .env.example .env
```

Ajoutez votre clé WeatherAPI :

```env
VITE_WEATHER_API_KEY=votre_cle
```

Lancez le serveur de développement :

```bash
npm run dev
```

Build de production :

```bash
npm run build
```

Le dossier `dist` est prêt pour un déploiement **Netlify** ou **Vercel** (variable d’environnement `VITE_WEATHER_API_KEY` à configurer dans le tableau de bord).

## Performance

- Mise en cache en mémoire des réponses **identiques** pendant **60 secondes** (même ville ou mêmes coordonnées).
- Les requêtes HTTP en cours sont **annulées** si une nouvelle recherche est lancée (`AbortController`).

## Déploiement

1. `npm run build`
2. Déployer le répertoire `dist`
3. Définir `VITE_WEATHER_API_KEY` dans les variables d’environnement du fournisseur

## Structure

```
src/
  components/
    Header.jsx
    SearchBar.jsx
    WeatherCard.jsx
    WeatherDetails.jsx
    Loading.jsx
    Footer.jsx
  services/
    weatherApi.js
  hooks/
    useWeather.js
  utils/
    formatTemperature.js
    buildHourlyPreview.js
    recentSearches.js
    weatherTheme.js
  App.jsx
  main.jsx
```

## Lien démo

À compléter après déploiement : `https://...`
