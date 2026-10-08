<h1 align="center">github-e4</h1>

<h3 align="center">Application web React de la 4ème année d'ENIGMA School 2026-2027</h3>

<p align="center">
  <img src="https://img.shields.io/github/stars/MaxVast/github-e4?style=social" alt="Stars" />
  <img src="https://img.shields.io/github/last-commit/MaxVast/github-e4" alt="Dernier commit" />
  <img src="https://img.shields.io/badge/licence-MIT-brightgreen" alt="Licence MIT" />
  <img src="https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white" alt="Vite 7" />
</p>

<h4 align="center">Statut : en cours de développement</h4>

<p align="center">
  <a href="#à-propos">À propos</a> •
  <a href="#fonctionnalités">Fonctionnalités</a> •
  <a href="#comment-ça-marche">Comment ça marche</a> •
  <a href="#stack-technique">Stack technique</a> •
  <a href="#documentation">Documentation</a> •
  <a href="#contribuer">Contribuer</a> •
  <a href="#auteurs">Auteurs</a> •
  <a href="#licence">Licence</a>
</p>

---

## À propos

**github-e4** est une application web construite avec React, Vite et React Router.

Ce dépôt a aussi pour but de faciliter l'arrivée de nouveaux collaborateurs, de centraliser
les informations du projet et de faciliter la collaboration au sein de l'équipe.

---

## Fonctionnalités

<!-- À compléter à la fin du développement : liste des fonctionnalités -->

Le suivi détaillé est dans les [issues](https://github.com/MaxVast/github-e4/issues).

---

## Comment ça marche

Le projet est une application **frontend** exécutée dans le navigateur.

<!-- À compléter à la fin du projet : résumé de l'application -->

### Prérequis

Avant de commencer, installe sur ta machine :

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/fr) (version LTS récente) et npm

Il est aussi conseillé d'avoir un éditeur de code comme [VS Code](https://code.visualstudio.com/)
ou [IntelliJ IDEA](https://www.jetbrains.com/idea/), avec le support d'ESLint activé.

### Lancer l'application (Frontend)

```bash
# Cloner le dépôt
git clone https://github.com/Sellierm/github-e4.git

# Accéder au dossier du projet
cd github-e4

# Se placer sur la branche
git checkout votre_branche

# Installer les dépendances
npm install

# Lancer l'application en mode développement
npm run dev
```

### Scripts disponibles

| Commande             | Description                                  |
| -------------------- | -------------------------------------------- |
| `npm run dev`        | Lance le serveur de développement            |
| `npm run build`      | Génère la version de production dans `dist/` |
| `npm run lint`       | Analyse le code avec ESLint                  |
| `npm test`           | Exécute les tests une fois                   |
| `npm run test:watch` | Exécute les tests en continu                 |

---

## Stack technique

Les outils suivants ont été utilisés pour construire le projet :

#### **Plateforme** ([React](https://react.dev/) + [Vite](https://vite.dev/))

- **[React](https://react.dev/)** : bibliothèque d'interface
- **[React Router](https://reactrouter.com/)** : routage côté client
- **[Vite](https://vite.dev/)** : serveur de développement et build

#### **Qualité du code**

- **[Vitest](https://vitest.dev/)** : tests
- **[ESLint](https://eslint.org/)** : analyse statique
- **[GitHub Actions](https://docs.github.com/actions)** : intégration continue

#### **Outils**

- Éditeurs : **[Visual Studio Code](https://code.visualstudio.com/)**, **[IntelliJ IDEA](https://www.jetbrains.com/idea/)**
- Commits : **[Conventional Commits](https://www.conventionalcommits.org/fr/v1.0.0/)**

---

## Documentation

Toute la documentation est dans le dossier [`docs/`](./docs/index.md) :

| Page                                        | Contenu                             |
| ------------------------------------------- | ----------------------------------- |
| [Démarrage](./docs/getting-started.md)      | Installation et premier lancement   |
| [Architecture](./docs/architecture.md)      | Organisation du code                |
| [Configuration](./docs/configuration.md)    | Variables d'environnement et outils |
| [Déploiement](./docs/deployment.md)         | Mise en ligne                       |
| [Contribuer](./docs/contributing.md)        | Guide de contribution               |
| [Guide d'utilisation](./docs/user-guide.md) | Utiliser l'application              |
| [FAQ](./docs/faq.md)                        | Questions fréquentes                |

---

## Contribuer

1. Choisis ou crée une [issue](https://github.com/MaxVast/github-e4/issues).
2. Crée une branche (`feature/...`, `fix/...` ou `docs/...`).
3. Ouvre une Pull Request en ajoutant @MaxVast et un autre collaborateur dans les reviewers.

Les règles complètes sont dans [CONTRIBUTING.md](./CONTRIBUTING.md).
Pour signaler une faille de sécurité, suis [SECURITY.md](./SECURITY.md).
Ne commite jamais de secrets.

---

## Auteurs

<a href="https://github.com/MaxVast/github-e4/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=MaxVast/github-e4" alt="Contributeurs" />
</a>

---

## Licence

Ce projet est distribué sous licence [MIT](./LICENSE).

---

## En savoir plus

- [Documentation de React](https://react.dev/learn)
- [Guide de Vite](https://vite.dev/guide/)
- [Documentation de React Router](https://reactrouter.com/)
- [Documentation de Vitest](https://vitest.dev/guide/)
