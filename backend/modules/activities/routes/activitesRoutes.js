const express = require('express');
const router = express.Router();
const Activite = require('../models/Activites');
const activitesController = require('../controllers/activitesController');

// Créer une nouvelle activité
router.post('/', activitesController.create);

// Récupérer toutes les activités
router.get('/', activitesController.findAll);

// Récupérer les activités par catégorie
router.get('/category/:id', activitesController.findByCategory);

// Récupérer une activité par ID
router.get('/:id', (req, res) => {
    Activite.findById(req.params.id, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
    });
});

// Mettre à jour une activité par ID
router.put('/:id', (req, res) => {
    Activite.update(req.params.id, req.body, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
    });
});

// Mettre à jour le statut d'une activité
router.put('/:id/status', activitesController.updateStatus);


// Supprimer une activité par ID
router.delete('/:id', (req, res) => {
    Activite.delete(req.params.id, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
    });
});

module.exports = router;