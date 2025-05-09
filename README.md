# CESIZen #

### Prérequis
Node.js (version 14.x ou supérieure)
npm (version 6.x ou supérieure)
MySQL (version 8.x ou supérieure)
Vue CLI (version 4.x ou supérieure)

### GITHUB
# Initialisation du Dépôt pour information
git init
git remote add origin https://github.com/LN27100/cesiZen.git

## Cloner le projet
git clone https://github.com/LN27100/cesiZen.git

# Récupérer changement (avant de commencer à travailler chaque jour si travail à plusieurs)
git pull origin master

# Faire des commits régulier en fin de journée
git add .
git commit -m "descriptif commentaire"
git push origin master

### BASE DE DONNEES
# Importer le Dump SQL :
Créez la base de données à l'aide du fichier cesi_zen.sql situé dans le dossier backend/database.
Utilisez un outil comme MySQL Workbench ou phpMyAdmin pour importer le fichier SQL.

# configuration du backend
Dans le dossier config, vous avez un fichier db.js qui gère la connexion à la base de données.
Pour protéger la cofig, celle-ci est dans:
# .env du backend:
Entrez le nom de votre bdd, votre nom d'utilisateur et votre mot de passe:

PORT=3000
VUE_APP_JWT_SECRET=your_jwt_secret_key
JWT_SECRET=your_jwt_secret_key
DB_HOST=localhost
DB_USER=
DB_PASSWORD=
DB_NAME=



### BACKEND
# Pour information, le backend a été initialisé ainsi:
Création du dossier backend :
mkdir backend
cd backend
npm init -y

## Dépendances Backend
Installez les dépendances nécessaires :
# express : Pour créer un serveur.
# mysql2 : Pour communiquer avec la base de données MySQL.
# body-parser : Pour parser les données envoyées dans le corps des requêtes.
# cors : Pour autoriser les requêtes provenant de votre frontend Vue.js.
npm install express mysql2 body-parser cors


## Pour informations
# le fichier server.js : 
Gère la configuration du serveur (Express).
Importe db.js, synchronise les modèles, et crée les routes API.

## Lancer le serveur
npm start




### FRONTEND

## Pour information, le frontend avec Vue.js a été initialisé ainsi:
Création du dossier frontend :
mkdir frontend
cd frontend
# Initialisation du projet Vue.js avec Vue CLI :
vue create .

## Installer les dépendances nécessaires 
# Axios : Pour effectuer des appels API au backend.
npm install axios

# Vue Router :
npm install vue-router

# Vuex :
npm install vuex

## .env du front, configuration de la route d'appel API:
VUE_APP_API_URL=http://localhost:3000/api


## DEMARRER le serveur de développement Vue.js :
npm run serve



### Tests

## Tests Unitaires Backend
# Prérequis :
Assurez-vous que Jest est installé dans le répertoire backend:
npm install --save-dev jest
# Exécution :
cd backend
npm test (Lancer tous les tests)
npm run test:coverage  (Lancer tests + couverture)

# Description :
Tests des Modèles
Les tests des modèles vérifient que les opérations de base de données (création, mise à jour, suppression, récupération) fonctionnent correctement et gèrent les erreurs comme prévu.

Tests des Contrôleurs
Les tests des contrôleurs vérifient que les routes de l'API répondent correctement aux requêtes HTTP (GET, POST, PUT, DELETE correspondant au CRUD) et que les bonnes réponses sont envoyées, en tenant compte des erreurs éventuelles.

Tests des Services
Les tests des services valident la logique métier de l'application, assurant que les fonctions interagissent correctement avec les modèles et retournent les bons résultats ou erreurs.

Tests de la Configuration (db.js)
Les tests de configuration vérifient que la connexion à la base de données est correctement établie et que les paramètres de connexion sont valides avant d'exécuter des opérations sur les données.

# Voir le rapport visuel de couverture:
Ouvrez dans le navigateur le fichier: coverage/lcov-report/index.html


## Tests Fonctionnels et de non-régression avec Cypress
# Prérequis : 
Assurez-vous que Cypress est installé à la racine du projet:
npm install --save-dev cypress
# Exécution :
npx cypress open
# Description :
Flux d'Inscription d'un Utilisateur : Vérifie que le processus d'inscription fonctionne correctement, y compris la validation des champs et la redirection après une inscription réussie.
Non-régression login: Vérifie que le composant de connexion fonctionne toujours comme prévu, et que les modifications apportées au code n'introduisent pas de nouveaux bugs ou ne réintroduisent pas d'anciens bugs.


