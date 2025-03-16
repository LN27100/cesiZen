const Activity = require('../models/Activites');

exports.create = (req, res) => {
    const {
        nom_activite, description_activite, status_activite_détente,
        id_categorie, duree_minutes, sous_categorie, nom_image,
        nom_image_2, lien_video
    } = req.body;

    // Vérification des champs obligatoires
    if (!description_activite || !status_activite_détente || !id_categorie) {
        return res.status(400).json({ message: "Les champs description_activite, status_activite_détente et id_categorie sont obligatoires." });
    }

    // Vérification du statut
    if (!['actif', 'suspendue'].includes(status_activite_détente)) {
        return res.status(400).json({ message: "Le statut doit être 'actif' ou 'suspendue'." });
    }

    const newActivity = {
        nom_activite: nom_activite || null,
        description_activite,
        status_activite_détente,
        id_categorie,
        duree_minutes: duree_minutes || null,
        sous_categorie: sous_categorie || null,
        nom_image: nom_image || null,
        nom_image_2: nom_image_2 || null,
        lien_video: lien_video || null
    };

    Activity.create(newActivity, (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion de l'activité:", err);
            return res.status(500).json({ message: "Erreur serveur lors de la création de l'activité." });
        }
        res.status(201).json({ message: 'Activité créée avec succès', id: result.insertId });
    });
};

exports.findAll = (req, res) => {
    Activity.findAll((err, activities) => {
        if (err) return res.status(500).send(err);
        res.send(activities);
    });
};

exports.findByCategory = (req, res) => {
    const categoryId = req.params.id;
    Activity.findByCategory(categoryId, (err, activities) => {
        if (err) return res.status(500).send(err);
        res.send(activities);
    });
};

// Mettre à jour une activité
exports.update = (req, res) => {
    const { nom, description, statut, id_categorie, duree_minutes, sous_categorie, nom_image, nom_image_2, lien_video } = req.body;
    const id = req.params.id;

    if (!['actif', 'suspendue'].includes(statut)) {
        return res.status(400).send({ message: "Le statut doit être 'actif' ou 'suspendue'." });
    }

    const updatedActivity = {
        nom_activite: nom,
        description_activite: description,
        status_activite_detente: statut,
        id_categorie,
        duree_minutes,
        sous_categorie,
        nom_image,
        nom_image_2,
        lien_video
    };

    Activity.update(id, updatedActivity, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Activité mise à jour avec succès' });
    });
};

// Supprimer une activité
exports.delete = (req, res) => {
    Activity.delete(req.params.id, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Activité supprimée avec succès' });
    });
};