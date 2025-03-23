# CESIZen #

### Prérequis
Node.js (version 14.x ou supérieure)
npm (version 6.x ou supérieure)
MySQL (version 8.x ou supérieure)
Vue CLI (version 4.x ou supérieure)

### BASE DE DONNEES
# Importer le Dump SQL :
Créez la base de données à l'aide du fichier cesi_zen.sql situé dans le dossier backend/database.
Utilisez un outil comme MySQL Workbench ou la ligne de commande pour importer le fichier SQL.

# configuration
Dans le dossier config, créez un fichier nommé db.js avec le contenu suivant :

const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'votre_nom_utilisateur',
    password: 'votre_mot_de_passe',
    database: 'cesi_zen'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

module.exports = db;


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

## ORM Sequelize dans le serveur Express
npm install sequelize mysql2 (dans le dossier backend)

## Pour informations
# le fichier db.js : 
Gère la connexion à la base de données avec Sequelize.
Configure Sequelize et exporte la connexion.

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

## DEMARRER le serveur de développement Vue.js :
npm run serve



### Tests

## Tests Unitaires Backend
# Prérequis :
Assurez-vous que Jest est installé dans le répertoire backend:
npm install --save-dev jest
# Exécution :
cd backend
npm test
# Description :
Activites Controller : Teste les fonctionnalités CRUD pour les activités.
User Controller : Teste les fonctionnalités CRUD pour les utilisateurs et la réinitialisation du mot de passe.

## Tests Fonctionnels avec Cypress
# Prérequis : 
Assurez-vous que Cypress est installé à la racine du projet:
npm install --save-dev cypress
# Exécution :
npx cypress open
# Description :
Flux d'Inscription d'un Utilisateur : Vérifie que le processus d'inscription fonctionne correctement, y compris la validation des champs et la redirection après une inscription réussie.



## GITHUB
# Initialisation du Dépôt
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