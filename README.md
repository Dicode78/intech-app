# Intech Group App

## Description

Cette application est conçue pour améliorer la gestion inter-entreprise du groupe INTECH. Dans un premier temps, elle permet la gestion des utilisateurs, des clients, et des compétences des différentes sociétés du groupe.

## Table des matières

- [Installation](#installation)
- [Utilisation](#utilisation)
- [Dépendances](#dépendances)
- [Structure du projet](#structure-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [API](#api)
- [Styles et Thèmes](#styles-et-thèmes)
- [Bonnes pratiques](#bonnes-pratiques)
- [Contributions](#contributions)
- [Auteur](#auteur)

## Installation

### Prérequis

- Node.js (version recommandée : 14.x ou plus)
- npm ou yarn
- **Vite** : Le projet est configuré avec Vite.

### Étapes

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/Dicode78/intech-app.git
   ```

2. Naviguez dans le répertoire du projet :

   ```bash
   cd project-directory
   ```

3. Installez les dépendances :

   ```bash
   npm install
   ```

   ou

   ```bash
   yarn install
   ```

4. Créez un fichier `.env` à la racine du projet pour stocker les variables d'environnement :

   ```bash
   cp .env.example .env
   ```

   Modifiez les valeurs dans le fichier `.env` selon vos besoins.

5. Démarrez le serveur de développement :

   ```bash
   npm run dev
   ```

   ou

   ```bash
   yarn dev
   ```

6. Ouvrez votre navigateur et accédez à `http://localhost:5173` pour voir l'application en action.

## Utilisation

### Scripts npm

- `npm run dev` : Démarre le serveur de développement.
- `npm run build` : Compile le projet pour la production.
- `npm run lint` : Exécute ESLint pour analyser le code.
- `npm run test` : Exécute les tests unitaires (si disponibles).

### Structure du projet

Voici une structure de base du projet :

```bash
.
├── src
│   ├── api          # Fichiers d'API pour les appels à l'API backend
│   ├── assets       # Images, icônes, et autres ressources statiques
│   ├── components   # Composants réutilisables
│   ├── pages        # Pages principales de l'application
│   ├── styles       # Fichiers de style globaux
│   ├── utils        # Fonctions utilitaires
│   └── index.js     # Point d'entrée de l'application
├── .env             # Variables d'environnement
├── package.json     # Dépendances et scripts du projet
└── README.md        # Documentation du projet
```

## Dépendances

### Dépendances principales

- **React** : Bibliothèque principale pour construire l'interface utilisateur.
- **React Router** : Pour la gestion de la navigation et des routes.
- **Axios** : Pour effectuer des appels HTTP à l'API backend.
- **Material-UI** : Bibliothèque de composants UI pour créer des interfaces utilisateur modernes et réactives.
- **Styled-components** : Pour le style en ligne avec les composants React.

### Dépendances de développement

- **ESLint** : Pour l'analyse du code et le respect des conventions.
- **Prettier** : Pour le formatage automatique du code.

## Fonctionnalités

1. **Gestion des utilisateurs** : Ajouter, modifier, supprimer et lister les utilisateurs avec différents rôles.
2. **Gestion des clients** : Répertorier les clients et leurs informations.
3. **Gestion des compétences** : Administration des compétences des différentes sociétés et les matcher (à développer).
4. **Connexion sécurisée** : Authentification des utilisateurs avec JWT.
5. **Thème personnalisé** : Thème MUI avec styles personnalisés.

## API

Les points d'entrée principaux de l'API se trouvent dans le dossier `src/api`. Voici un aperçu des principaux appels API :

- **/api/auth/login** : Authentification de l'utilisateur.
- **/api/users** : Gestion des utilisateurs.
- **/api/clients** : Gestion des clients.

## Styles et Thèmes

Le projet utilise Material-UI pour les composants d'interface utilisateur avec un thème personnalisé. Les styles globaux sont définis dans le fichier `global.css` et les composants spécifiques utilisent `styled-components` pour un style encapsulé.

### Fonts

Les polices utilisées dans l'application sont des polices personnalisées qui sont chargées via des `@font-face` dans le fichier `global.css`.

## Bonnes pratiques

- **Séparation des préoccupations** : Maintenir la logique métier séparée des composants d'interface utilisateur.
- **Utilisation des hooks** : Préférer les hooks React pour la gestion de l'état et des effets.
- **Contrôle des erreurs** : Toujours gérer les erreurs lors des appels API pour améliorer l'expérience utilisateur.
- **Documentation** : Commenter le code lorsque cela est nécessaire pour clarifier la logique.

## Contributions

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet.
2. Créez une branche de fonctionnalité (`git checkout -b feature/YourFeature`).
3. Commitez vos changements (`git commit -m 'Add some feature'`).
4. Poussez vers la branche (`git push origin feature/YourFeature`).
5. Ouvrez une Pull Request.

## Auteur

Ce projet a été développé par Damien (DIK), alternant ICONE. Pour toute question, contactez-moi à [dicode78@gmail.com].

## Configuration de la Base de Données

### Prérequis

- **MAMP (macOS)** ou **WAMP (Windows)** : Requis pour exécuter la base de données MySQL en local.
  - [MAMP](https://www.mamp.info/en/downloads/) (pour macOS)
  - [WAMP](https://www.wampserver.com/en/) (pour Windows)

### Étapes de configuration

1. **Pour les utilisateurs macOS (MAMP)** :

   - Démarrez MAMP.
   - Accédez à phpMyAdmin via `http://localhost:8888/phpMyAdmin`.
   - Créez une nouvelle base de données nommée `intech_app`.
   - Importez le schéma de base de données et les données initiales (si disponibles) à l'aide des fichiers SQL fournis dans le dossier `database`.

2. **Pour les utilisateurs Windows (WAMP)** :
   - Démarrez WAMP.
   - Accédez à phpMyAdmin via `http://localhost/phpmyadmin`.
   - Créez une nouvelle base de données nommée `intech_app`.
   - Importez le schéma de base de données et les données initiales (si disponibles) à l'aide des fichiers SQL fournis dans le dossier `database`.

### Variables d'environnement

Créez un fichier `.env` à la racine du projet et ajoutez les variables d'environnement suivantes :

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root_password
DB_NAME=intech_app
JWT_SECRET=your_jwt_secret
```

Adaptez `DB_USER` et `DB_PASSWORD` en fonction de votre configuration MySQL.
