const Activity = require('../models/Activites');

exports.create = (req, res) => {
    const { nom, description, statut } = req.body;
    const newActivity = { nom, description, statut };

    Activity.create(newActivity, (err, activity) => {
        if (err) res.status(500).send(err);
        res.send('Activité créée');
    });
};

exports.findAll = (req, res) => {
    Activity.findAll((err, activities) => {
        if (err) res.status(500).send(err);
        res.send(activities);
    });
};
