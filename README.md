# CESIZen

## BASE DE DONNEES
# dump
créer la base de donnees à l'aide du Dump contenu dans le dossier backend/database/cesi_zen.sql

# configuration
créer le fichier db.js dans le dossier config:

const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'nom_utilisateur',
    password: 'mot_de_passe',
    database: 'cesi_zen'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

module.exports = db;


## BACKEND
mkdir backend
cd backend
npm init -y

## Dépendances Backend
# express : Pour créer un serveur.
# mysql2 : Pour communiquer avec la base de données MySQL.
# body-parser : Pour parser les données envoyées dans le corps des requêtes.
# cors : Pour autoriser les requêtes provenant de votre frontend Vue.js.
npm install express mysql2 body-parser cors

## Lancer le serveur
npm start

## Configurer Axios dans Vue.js
npm install axios

## ORM Sequelize dans le serveur Express
npm install sequelize mysql2 (dans le dossier backend)

# fichier db.js : 
Gère la connexion à la base de données avec Sequelize.
Configure Sequelize et exporte la connexion.
# le fichier server.js : 
Gère la configuration du serveur (Express).
Importe db.js, synchronise les modèles, et crée les routes API.

## FRONTEND

# Installation de Vue.js
Créer un dossier pour le frontend :
mkdir frontend
cd frontend

# Initialiser un projet Vue.js avec Vue CLI :
vue create .

## Dépendances Frontend
# Axios : Pour effectuer des appels API au backend.
npm install axios

# Vue Router :
npm install vue-router

# Vuex :
npm install vuex

## LANCER le serveur Frontend
npm run serve

## GITHUB
git init
git remote add origin https://github.com/LN27100/cesiZen.git
git add .
git commit -m "premier commit"
git push origin master

## Cloner le projet
git clone https://github.com/LN27100/cesiZen.git

# Récupérer changement (avant de commencer à travailler chaque jour)
git pull origin master

# Faire des commits régulier en fin de journée
git add .
git add .
git commit -m "descriptif commentaire"
git push origin master