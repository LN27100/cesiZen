const db = require('../config/db');

const Activite = {
    // Créer une nouvelle activité
    create: (activite, callback) => {
        const sql = `
            INSERT INTO activites_de_detente (
                nom_activite, description_activite, status_activite_détente,
                id_categorie, duree_minutes, sous_categorie, nom_image,
                nom_image_2, lien_video
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(sql, [
            activite.nom_activite, activite.description_activite, activite.status_activite_détente,
            activite.id_categorie, activite.duree_minutes, activite.sous_categorie,
            activite.nom_image, activite.nom_image_2, activite.lien_video
        ], callback);
    },

    // Récupérer toutes les activités
    findAll: (callback) => {
        const sql = 'SELECT * FROM activites_de_detente';
        db.query(sql, callback);
    },

    // Récupérer les activités par catégorie
    findByCategory: (id_categorie, callback) => {
        const sql = 'SELECT * FROM activites_de_detente WHERE id_categorie = ?';
        db.query(sql, [id_categorie], callback);
    },

    // Récupérer une activité par ID
    findById: (id, callback) => {
        const sql = 'SELECT * FROM activites_de_detente WHERE id_activite = ?';
        db.query(sql, [id], callback);
    },

    // Mettre à jour une activité par ID
    update: (id, activite, callback) => {
        const sql = `
            UPDATE activites_de_detente SET
                nom_activite = ?, description_activite = ?, status_activite_détente = ?,
                id_categorie = ?, duree_minutes = ?, sous_categorie = ?,
                nom_image = ?, nom_image_2 = ?, lien_video = ?
            WHERE id_activite = ?
        `;
        db.query(sql, [
            activite.nom_activite, activite.description_activite, activite.status_activite_détente,
            activite.id_categorie, activite.duree_minutes, activite.sous_categorie,
            activite.nom_image, activite.nom_image_2, activite.lien_video, id
        ], callback);
    },

    // Supprimer une activité par ID
    delete: (id, callback) => {
        const sql = 'DELETE FROM activites_de_detente WHERE id_activite = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = Activite;
