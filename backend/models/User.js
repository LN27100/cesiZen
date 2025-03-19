const db = require('../config/db');

const User = {
  // Créer un nouvel utilisateur
  create: (user, callback) => {
    const sql = 'INSERT INTO utilisateur (prenom, nom, email, mot_de_passe, pseudo, role) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [user.prenom, user.nom, user.email, user.mot_de_passe, user.pseudo, user.role], callback);
  },

  // Récupérer tous les utilisateurs
  findAll: (callback) => {
    const sql = 'SELECT * FROM utilisateur';
    db.query(sql, callback);
  },

  // Récupérer un utilisateur par email
  findByEmail: (email, callback) => {
    const sql = 'SELECT * FROM utilisateur WHERE email = ?';
    db.query(sql, [email], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },

  // Récupérer un utilisateur par ID
  findById: (id, callback) => {
    const sql = 'SELECT * FROM utilisateur WHERE id_utilisateur = ?';
    db.query(sql, [id], callback);
  },

  // Mettre à jour un utilisateur par ID
  update: (id, user, callback) => {
    const sql = 'UPDATE utilisateur SET prenom = ?, nom = ?, email = ?, mot_de_passe = ?, pseudo = ?, role = ? WHERE id_utilisateur = ?';
    db.query(sql, [user.prenom, user.nom, user.email, user.mot_de_passe, user.pseudo, user.role, id], callback);
  },

  // Mettre à jour le mot de passe de l'utilisateur
  updatePassword: (id, newPassword, callback) => {
    const sql = 'UPDATE utilisateur SET mot_de_passe = ? WHERE id_utilisateur = ?';
    db.query(sql, [newPassword, id], callback);
  },


  // Supprimer un utilisateur par ID
  delete: (id, callback) => {
    const sql = 'DELETE FROM utilisateur WHERE id_utilisateur = ?';
    db.query(sql, [id], callback);
  },

  // Méthode pour exécuter des requêtes SQL personnalisées
  query: (sql, params, callback) => {
    db.query(sql, params, callback);
  },

 
};

module.exports = User;
