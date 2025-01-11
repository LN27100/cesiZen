// routes/activitesRoutes.js
const express = require('express');
const router = express.Router();
const Activite = require('../models/Activite');

// Créer une nouvelle activité
router.post('/', (req, res) => {
    Activite.create(req.body, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send(result);
    });
});

// Récupérer toutes les activités
router.get('/', (req, res) => {
    Activite.findAll((err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
});

// Récupérer les activités par catégorie
router.get('/category/:category', (req, res) => {
    Activite.findByCategory(req.params.category, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
});

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

// Supprimer une activité par ID
router.delete('/:id', (req, res) => {
    Activite.delete(req.params.id, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
    });
});

module.exports = router;
