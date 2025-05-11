const Activity = require('../models/Activites.js');
const Activite = require('../models/Activites.js');

// Créer une nouvelle activité
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

// Récupérer toutes les activités
exports.findAll = (req, res) => {
    Activity.findAll((err, activities) => {
        if (err) return res.status(500).send(err);
        res.send(activities);
    });
};

// Récupérer une activité par ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    Activity.findById(id, (err, activity) => {
        if (err) return res.status(500).send(err);
        if (!activity) return res.status(404).json({ message: 'Activité non trouvée.' });
        res.json(activity);
    });
};

// Récupérer les activités par catégorie
exports.findByCategory = (req, res) => {
    const categoryId = req.params.id;
    Activity.findByCategory(categoryId, (err, activities) => {
        if (err) return res.status(500).send(err);
        res.send(activities);
    });
};

// Mettre à jour une activité
exports.update = (req, res) => {
    const { nom_activite, description_activite, status_activite_détente, id_categorie, duree_minutes, sous_categorie, nom_image, nom_image_2, lien_video } = req.body;
    const id = req.params.id;

    const updatedActivity = {
        nom_activite, description_activite, status_activite_détente, id_categorie,
        duree_minutes, sous_categorie, nom_image, nom_image_2, lien_video
    };

    Activity.update(id, updatedActivity, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Activité mise à jour avec succès' });
    });
};

// Mettre à jour le statut d'une activité
exports.updateStatus = (req, res) => {
    const { status_activite_détente } = req.body;  // Le statut à mettre à jour
    const id = req.params.id;  // ID de l'activité

    // Validation du statut
    if (!['actif', 'suspendue'].includes(status_activite_détente)) {
        return res.status(400).json({ message: "Le statut doit être 'actif' ou 'suspendue'." });
    }

    console.log(`Mise à jour du statut pour l'activité ID: ${id}, nouveau statut: ${status_activite_détente}`);

    Activite.updateStatus(id, status_activite_détente, (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour du statut:", err);
            return res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du statut.' });
        }
        if (result.affectedRows === 0) {
            console.log("Aucune activité trouvée avec cet ID.");
            return res.status(404).json({ message: 'Activité non trouvée pour la mise à jour.' });
        }
        console.log("Statut mis à jour avec succès");
        res.status(200).json({ message: 'Statut mis à jour avec succès' });
    });
};

// Supprimer une activité
exports.delete = (req, res) => {
    Activity.delete(req.params.id, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Activité supprimée avec succès' });
    });
};
