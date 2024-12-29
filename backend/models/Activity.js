const db = require('../config/db');

const Activity = {
    create: (activity, callback) => {
        const sql = 'INSERT INTO ActivitesDétente (nom, description, statut) VALUES (?, ?, ?)';
        db.query(sql, [activity.nom, activity.description, activity.statut], callback);
    },
    findAll: (callback) => {
        const sql = 'SELECT * FROM ActivitesDétente';
        db.query(sql, callback);
    }
};

module.exports = Activity;
