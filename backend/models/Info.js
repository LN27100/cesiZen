const db = require('../config/db');

const Info = {
    create: (info, callback) => {
        const sql = 'INSERT INTO Information (titre, description, auteur, nom_image) VALUES (?, ?, ?, ?)';
        db.query(sql, [info.titre, info.description, info.auteur, info.nom_image], callback);
    },
    findAll: (callback) => {
        const sql = 'SELECT id_information, titre, description AS content, auteur, nom_image AS image FROM information';
        db.query(sql, callback);
    },
    update: (id, info, callback) => {
        const sql = 'UPDATE Information SET titre = ?, description = ?, auteur = ?, nom_image = ? WHERE id_information = ?';
        db.query(sql, [info.titre, info.description, info.auteur, info.nom_image, id], callback);
    },
    delete: (id, callback) => {
        const sql = 'DELETE FROM Information WHERE id_information = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = Info;
