# Système d'Information de Gestion des Engins et des Equipements (SIGEE)

La refonte de l'application SIGEE concerne le back-office et l'interface de gestion des engins des Marins-Pompiers de
Marseille. Ce projet a pour objectif de repenser et d'améliorer l'ensemble du système, en prenant en compte les besoins
et les spécifications actuelles.

Les fonctionnalités actuelles du back-office permettent de gérer différentes informations liées aux engins, mais des
améliorations sont nécessaires pour optimiser l'expérience utilisateur, faciliter la recherche d'informations et éviter
la création de doublons dans la base de données. De plus, l'intégration automatique des documents scannés des cartes
vertes aux engins constitue également un besoin important pour améliorer l'efficacité de la gestion.

La refonte de l'application s'appuiera sur une architecture technique moderne, en utilisant des serveurs Ubuntu avec
NGINX et uWSGI pour l'exposition de l'application sur le réseau. L'API sera développée en Python, en utilisant le
framework Django Rest Framework, tandis que le front-end sera conçu en JavaScript avec ReactJS pour une expérience
utilisateur fluide et interactive.

# Environnement qui est proposé

La solution sera hébergée sur un serveur Ubuntu 20.04, qui servira de système d'exploitation pour l'application.

NGINX sera utilisé comme serveur web pour exposer l'application sur le réseau. Il jouera le rôle d'un reverse proxy,
traitant les requêtes HTTP et les transmettant au serveur d'application approprié (uWSGI).

uWSGI sera le serveur d'application utilisé pour servir l'API de l'application. Il est capable de communiquer avec NGINX
et exécutera l'API développée en Python en utilisant le framework Django Rest Framework.

L'API sera développée en utilisant le langage de programmation Python, un langage populaire et polyvalent, idéal pour le
développement web.

Le Back-office, également connu sous le nom de partie Front-end ou visuelle de l'application, sera développé en
utilisant le langage de programmation JavaScript et le Framework ReactJS. ReactJS est une bibliothèque JavaScript
réactive et performante qui permettra de créer une interface utilisateur interactive et conviviale pour les utilisateurs
de l'application.

En ce qui concerne la base de données, la décision a été prise de conserver la même base de données actuelle Oracle.
Cette approche permettra de garantir la continuité du fonctionnement normal de l'ETL (Extract, Transform, Load) qui est
déjà en place et fonctionne avec cette base de données. Cela évitera également de perturber les processus existants et
facilitera la migration vers la nouvelle version améliorée de l'application sans altérer les données existantes.

## Installation

Merci de respecter les versions utilisé dans les fichiers de package.json et pipfile

### Pour la partie Front-End

Installer npm

Pour les systèmes Linux

```bash
Pour Debian, Ubuntu et ses dérivés:
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - sudo apt install -y nodejs

Pour les distributions de la famille Red Hat, en tant qu utilisateur:
    curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
```

Sous macOS

```bash

Si vous utilisez homebrew, un gestionaire de paquets:
    brew install node
```

Sous Windows

```bash
    https://nodejs.org/en/download
```

Installer Yarn

```bash
    npm install --global yarn
```

### Pour la partie Back-End

Installer python

```bash
    https://www.python.org/downloads/release/python-3716/
```

Installer Django Rest Framework

```bash
    https://www.django-rest-framework.org/
```

Installer corheaders

```bash
    pip install django-cors-headers
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will
remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right
into your project so you have full control over them. All of the commands except `eject` will still work, but they will
point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you
shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't
customize it when you are ready for it.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will
remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right
into your project so you have full control over them. All of the commands except `eject` will still work, but they will
point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you
shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

## Démarrer en local

Accéder au projet

```bash
    cd nom du projet
```

Installer les dépendances

```bash
    npm install
    yarn install pour le coté Front
```

Démarrer sur un serveur local

```bash
    yarn start pour le coté Front
    python manage.py runserver 0.0.0.0:8000 pour le coté Back
```

## Learn More

You can learn more in
the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved
here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved
here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved
here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved
here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved
here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved
here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Fonctionnalité Manquante

Fonctionnalités à Implémenter : Gestion des Utilisateurs et de la Connexion avec Active Directory, la mise en place des
Droits utilisateurs sur toute l'application (par exemple, la navigation, la modification, ...), mettre des alertes
basées sur les Droits Utilisateurs, faire les exports, liée carte verte, carte grise et crit'Air sur la page détail
engin.

## 🛠 Skills

Ant Design, Javascript avec le framework ReactJS, python avec le framework django REST framework, Base de Donnée Oracle

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Les librairies utilisées

- **React Native : pour faire des applications avec React et JavaScript**
- Redux : pour gérer les données de l'application
- Redux Offline : pour gérer le côté offline first de l'application
- Redux ORM : ORM simple pour gérer les données relationnelles dans redux
- Redux-Actions : fonctions utilitaires pour la création d'actions redux
  normées [FSA](https://github.com/redux-utilities/flux-standard-action)
- Redux-Saga : pour gérer les flux complexes dans une application
- React Navigation : pour la navigation
- i18next : pour la gestion des traductions
- React Hook Form : pour la gestion des formulaires via les hooks de React
- React Native Make : pour la gestion de la génération des icones et du splash screen
- ...

Pour le reste je vous laisse regarder dans le `package.json` :laughing:

## FAQ

#### Comment se connecter a la base de donnée ?

Pour établir une connexion à la base de données, suivez ces étapes :

Accédez à la partie back-end de votre projet.

Trouvez le fichier "sigee_api" qui est responsable de la gestion de l'API ou de la logique du back-end.

Dans le répertoire "sigee_api", localisez le fichier "settings.py". C'est généralement le fichier où se trouvent les
paramètres de configuration du projet.

À l'intérieur de "settings.py", recherchez la section "Databases". C'est dans cette partie du fichier que vous spécifiez
les paramètres de connexion à la base de données.

Vous devriez trouver des variables telles que "NAME", "USER", "PASSWORD", "HOST", "PORT", etc. Vous devez les modifier
en fonction des informations de connexion de votre base de données.

Assurez-vous de respecter la nomenclature requise pour chaque paramètre. Par exemple, le "NAME" doit contenir le nom de
la base de données, le "USER" doit être le nom d'utilisateur de la base de données, le "PASSWORD" doit être le mot de
passe associé à cet utilisateur, le "HOST" doit être l'adresse du serveur de base de données, et le "PORT" doit être le
numéro de port à utiliser.

Une fois que vous avez modifié les paramètres de connexion à la base de données, enregistrez les modifications.

Après avoir effectué ces étapes, votre application back-end devrait être configurée pour se connecter à la base de
données spécifiée. Assurez-vous que les informations de connexion que vous avez fournies sont correctes et que la base
de données est accessible depuis votre serveur back-end.

#### Comment changer les couleurs principales et secondaires ?

Pour personnaliser les couleurs dans votre application, suivez ces étapes :

Pour changer la couleur principale :

Accédez au fichier .env situé à la racine du front-end de votre projet.
Cherchez la ligne REACT_APP_MAIN_COLOR=#0a6daa et remplacez #0a6daa par la couleur bleue de votre choix.

Pour changer la couleur secondaire :

Allez dans le dossier theme de votre projet.
Trouvez le fichier variables.less dans ce dossier.
Dans le fichier variables.less, cherchez la ligne @secondary-color: #f59255 et remplacez #f59255 par la couleur orange
de votre choix.
N'oubliez pas de sauvegarder vos modifications pour que les nouvelles couleurs soient prises en compte par votre
application front-end.

Ces étapes vous permettront de personnaliser les couleurs principales et secondaires de votre application React selon
vos préférences. Assurez-vous de respecter la syntaxe des couleurs (par exemple, en utilisant des codes hexadécimaux ou
des noms de couleurs valides) pour que les modifications soient appliquées correctement.




