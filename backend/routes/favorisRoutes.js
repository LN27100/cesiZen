const express = require('express');
const router = express.Router();
const favorisController = require('../controllers/favorisController');
const verifyToken = require('../middlewares/authMiddleware');

// Créer un nouveau favori
router.post('/', verifyToken, favorisController.createFavorite);

// Récupérer tous les favoris de l'utilisateur connecté
router.get('/user', verifyToken, favorisController.getFavoritesByUser);

// Récupérer tous les favoris
router.get('/', favorisController.getAllFavorites);

// Récupérer un favori par ID
router.get('/:id', favorisController.getFavoriteById);

// Mettre à jour un favori par ID
router.put('/:id', favorisController.updateFavorite);

// Supprimer un favori par ID
router.delete('/:id', favorisController.deleteFavorite);

module.exports = router;
