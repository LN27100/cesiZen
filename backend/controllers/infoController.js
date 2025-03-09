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
