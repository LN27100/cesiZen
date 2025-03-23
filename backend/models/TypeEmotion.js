const db = require('../config/db');

const TypeEmotion = {
    // Créer un nouveau type d'émotion
    create: (typeEmotion, callback) => {
        const sql = `
            INSERT INTO types_emotions (nom_type, description)
            VALUES (?, ?)
        `;
        db.query(sql, [typeEmotion.nom_type, typeEmotion.description], callback);
    },

    // Récupérer tous les types d'émotions
    findAll: (callback) => {
        const sql = 'SELECT * FROM types_emotions';
        db.query(sql, callback);
    },

    // Récupérer un type d'émotion par ID
    findById: (id, callback) => {
        const sql = 'SELECT * FROM types_emotions WHERE id_type = ?';
        db.query(sql, [id], callback);
    },

    // Mettre à jour un type d'émotion par ID
    update: (id, typeEmotion, callback) => {
        const sql = `
            UPDATE types_emotions
            SET nom_type = ?, description = ?
            WHERE id_type = ?
        `;
        db.query(sql, [typeEmotion.nom_type, typeEmotion.description, id], callback);
    },

    // Supprimer un type d'émotion par ID
    delete: (id, callback) => {
        const sql = 'DELETE FROM types_emotions WHERE id_type = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = TypeEmotion;
