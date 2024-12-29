const db = require('../config/db');

const Info = {
    create: (info, callback) => {
        const sql = 'INSERT INTO Informations (titre, contenu) VALUES (?, ?)';
        db.query(sql, [info.titre, info.contenu], callback);
    },
    findAll: (callback) => {
        const sql = 'SELECT * FROM Informations';
        db.query(sql, callback);
    }
};

module.exports = Info;
