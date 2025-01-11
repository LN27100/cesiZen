// routes/categories.js
const express = require('express');
const router = express.Router();
const Categorie = require('../models/Categorie');

// Créer une nouvelle catégorie
router.post('/', (req, res) => {
    Categorie.create(req.body, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send(result);
    });
});

// Récupérer toutes les catégories
router.get('/', (req, res) => {
    Categorie.findAll((err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
});

// Récupérer une catégorie par ID
router.get('/:id', (req, res) => {
    Categorie.findById(req.params.id, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
    });
});

// Mettre à jour une catégorie par ID
router.put('/:id', (req, res) => {
    Categorie.update(req.params.id, req.body, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
    });
});

// Supprimer une catégorie par ID
router.delete('/:id', (req, res) => {
    Categorie.delete(req.params.id, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
    });
});

module.exports = router;
