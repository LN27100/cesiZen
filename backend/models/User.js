const db = require('../config/db');

const User = {
    // Créer un nouvel utilisateur
    create: (user, callback) => {
        const sql = 'INSERT INTO Utilisateurs (prenom, nom, email, mot_de_passe, statut_compte, pseudo) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [user.prenom, user.nom, user.email, user.mot_de_passe, user.statut_compte, user.pseudo], callback);
    },

    // Récupérer tous les utilisateurs
    findAll: (callback) => {
        const sql = 'SELECT * FROM Utilisateurs';
        db.query(sql, callback);
    },

    // Récupérer un utilisateur par email
    findByEmail: (email, callback) => {
        const sql = 'SELECT * FROM Utilisateurs WHERE email = ?';
        db.query(sql, [email], callback);
    },

    // Récupérer un utilisateur par ID
    findById: (id, callback) => {
        const sql = 'SELECT * FROM Utilisateurs WHERE id_utilisateur = ?';
        db.query(sql, [id], callback);
    },

    // Mettre à jour un utilisateur par ID
    update: (id, user, callback) => {
        const sql = 'UPDATE Utilisateurs SET prenom = ?, nom = ?, email = ?, mot_de_passe = ?, statut_compte = ?, pseudo = ? WHERE id_utilisateur = ?';
        db.query(sql, [user.prenom, user.nom, user.email, user.mot_de_passe, user.statut_compte, user.pseudo, id], callback);
    },

    // Supprimer un utilisateur par ID
    delete: (id, callback) => {
        const sql = 'DELETE FROM Utilisateurs WHERE id_utilisateur = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = User;
