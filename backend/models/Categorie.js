const db = require('../config/db');

const Categorie = {
    // Créer une nouvelle catégorie
    create: (categorie, callback) => {
        const sql = 'INSERT INTO categories_activites (nom_categorie) VALUES (?)';
        db.query(sql, [categorie.nom_categorie], callback);
    },

    // Récupérer toutes les catégories
    findAll: (callback) => {
        const sql = 'SELECT * FROM categories_activites';
        db.query(sql, callback);
    },

    // Récupérer une catégorie par ID
    findById: (id, callback) => {
        const sql = 'SELECT * FROM categories_activites WHERE id_categorie = ?';
        db.query(sql, [id], callback);
    },

    // Mettre à jour une catégorie par ID
    update: (id, categorie, callback) => {
        const sql = 'UPDATE categories_activites SET nom_categorie = ? WHERE id_categorie = ?';
        db.query(sql, [categorie.nom_categorie, id], callback);
    },

    // Supprimer une catégorie par ID
    delete: (id, callback) => {
        const sql = 'DELETE FROM categories_activites WHERE id_categorie = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = Categorie;
