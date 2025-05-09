const db = require('../../../config/db');

const Emotion = {
    // Créer une nouvelle émotion
    create: (emotion, callback) => {
        const sql = `
            INSERT INTO emotions (nom_emotion, id_type)
            VALUES (?, ?)
        `;
        db.query(sql, [emotion.nom_emotion, emotion.id_type], callback);
    },

    // Récupérer toutes les émotions
    findAll: (callback) => {
        const sql = 'SELECT * FROM emotions';
        db.query(sql, callback);
    },

    // Récupérer une émotion par ID
    findById: (id, callback) => {
        const sql = 'SELECT * FROM emotions WHERE id_emotion = ?';
        db.query(sql, [id], callback);
    },

    // Mettre à jour une émotion par ID
    update: (id, emotion, callback) => {
        const sql = `
            UPDATE emotions
            SET nom_emotion = ?, id_type = ?
            WHERE id_emotion = ?
        `;
        db.query(sql, [emotion.nom_emotion, emotion.id_type, id], callback);
    },

    // Supprimer une émotion par ID
    delete: (id, callback) => {
        const sql = 'DELETE FROM emotions WHERE id_emotion = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = Emotion;
