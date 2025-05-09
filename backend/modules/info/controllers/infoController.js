const Info = require('../models/Info');

exports.create = (req, res) => {
    const { titre, description, auteur, nom_image } = req.body;
    const newInfo = { titre, description, auteur, nom_image };

    Info.create(newInfo, (err, info) => {
        if (err) res.status(500).send(err);
        res.send('Information créée');
    });
};

exports.findAll = (req, res) => {
    Info.findAll((err, info) => {
        if (err) {
            console.error('Erreur lors de la récupération des informations:', err);
            res.status(500).send('Erreur lors de la récupération des informations');
        }
        res.json(info);
    });
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { titre, description, auteur, nom_image } = req.body;
    const updatedInfo = { titre, description, auteur, nom_image };

    Info.update(id, updatedInfo, (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour de l'information:", err);
            return res.status(500).send("Erreur lors de la mise à jour");
        }
        res.send("Information mise à jour avec succès");
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;

    Info.delete(id, (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression de l'information:", err);
            return res.status(500).send("Erreur lors de la suppression");
        }
        res.send("Information supprimée avec succès");
    });
};
