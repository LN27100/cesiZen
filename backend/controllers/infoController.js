const Info = require('../models/Info');

exports.create = (req, res) => {
    const { titre, contenu } = req.body;
    const newInfo = { titre, contenu };

    Info.create(newInfo, (err, info) => {
        if (err) res.status(500).send(err);
        res.send('Information créée');
    });
};

exports.findAll = (req, res) => {
    Info.findAll((err, info) => {
        if (err) res.status(500).send(err);
        res.send(info);
    });
};
