const db = require('../config/db');

const Info = {
    create: (info, callback) => {
        const sql = 'INSERT INTO Information (titre, description, auteur, nom_image) VALUES (?, ?, ?, ?)';
        db.query(sql, [info.titre, info.description, info.auteur, info.nom_image], callback);
    },
    findAll: (callback) => {
        const sql = 'SELECT id_information, titre, description AS content, auteur, nom_image AS image FROM information';
        db.query(sql, callback);
    }
};

module.exports = Info;
