const db = require('../config/db');

const TrackerEmotions = {
    // Créer un nouvel enregistrement de tracker d'émotions
    create: (trackerEmotion, callback) => {
        const sql = `
            INSERT INTO tracker_emotions (id_emotion, commentaire, date_emotion, id_configuration)
            VALUES (?, ?, ?, ?)
        `;
        db.query(sql, [trackerEmotion.id_emotion, trackerEmotion.commentaire, trackerEmotion.date_emotion, trackerEmotion.id_configuration], callback);
    },

    // Récupérer tous les enregistrements de tracker d'émotions
    findAll: (callback) => {
        const sql = 'SELECT * FROM tracker_emotions';
        db.query(sql, callback);
    },

    // Récupérer un enregistrement de tracker d'émotions par ID
    findById: (id, callback) => {
        const sql = 'SELECT * FROM tracker_emotions WHERE id_emotion = ?';
        db.query(sql, [id], callback);
    },

    // Mettre à jour un enregistrement de tracker d'émotions par ID
    update: (id, trackerEmotion, callback) => {
        const sql = `
            UPDATE tracker_emotions
            SET id_emotion = ?, commentaire = ?, date_emotion = ?, id_configuration = ?
            WHERE id_emotion = ?
        `;
        db.query(sql, [trackerEmotion.id_emotion, trackerEmotion.commentaire, trackerEmotion.date_emotion, trackerEmotion.id_configuration, id], callback);
    },

    // Supprimer un enregistrement de tracker d'émotions par ID
    delete: (id, callback) => {
        const sql = 'DELETE FROM tracker_emotions WHERE id_emotion = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = TrackerEmotions;
