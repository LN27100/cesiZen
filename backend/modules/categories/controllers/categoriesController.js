const Categorie = require('../models/Categorie');

// Contrôleur pour gérer les catégories
const categoriesController = {
    // Récupérer toutes les catégories
    getAllCategories: (req, res) => {
        Categorie.findAll((err, results) => {
            if (err) {
                console.error("Erreur lors de la récupération des catégories :", err);
                return res.status(500).json({ message: "Erreur interne du serveur." });
            }
            res.status(200).json(results);
        });
    }
};

module.exports = categoriesController;
