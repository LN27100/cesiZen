const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

// Route pour récupérer toutes les catégories
router.get('/', categoriesController.getAllCategories);

module.exports = router;
