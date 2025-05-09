const db = require('../../../config/db');

const Favoris = {
  // Créer un nouveau favori
  create: (favorite, callback) => {
    const sql = 'INSERT INTO favori (id_activite, id_exercice, id_utilisateur) VALUES (?, ?, ?)';
    db.query(sql, [favorite.id_activite, favorite.id_exercice || null, favorite.id_utilisateur], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'insertion dans la base de données:', err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  // Récupérer tous les favoris
  findAll: (callback) => {
    const sql = `
      SELECT f.id_favori, f.id_utilisateur, f.id_activite, f.id_exercice, a.nom_activite
      FROM favori f
      JOIN activites_de_detente a ON f.id_activite = a.id_activite
    `;
    db.query(sql, callback);
  },

  // Récupérer un favori par ID
  findById: (id, callback) => {
    const sql = `
      SELECT f.id_favori, f.id_utilisateur, f.id_activite, f.id_exercice, a.nom_activite
      FROM favori f
      JOIN activites_de_detente a ON f.id_activite = a.id_activite
      WHERE f.id_favori = ?
    `;
    db.query(sql, [id], callback);
  },

  // Récupérer tous les favoris de l'utilisateur connecté avec les informations de l'activité et de la catégorie
  findByUserId: (userId, callback) => {
    const sql = `
      SELECT f.id_favori, f.id_utilisateur, f.id_activite, f.id_exercice, a.nom_activite
      FROM favori f
      JOIN activites_de_detente a ON f.id_activite = a.id_activite
      WHERE f.id_utilisateur = ?
    `;
    db.query(sql, [userId], callback);
  },

  // Mettre à jour un favori par ID
  update: (id, favorite, callback) => {
    const sql = 'UPDATE favori SET id_activite = ?, id_exercice = ?, id_utilisateur = ? WHERE id_favori = ?';
    db.query(sql, [favorite.id_activite, favorite.id_exercice || null, favorite.id_utilisateur, id], callback);
  },

  // Supprimer un favori par ID
  delete: (id, callback) => {
    const sql = 'DELETE FROM favori WHERE id_favori = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = Favoris;
