const Favoris = require('../models/Favoris');

// Créer un nouveau favori
exports.createFavorite = (req, res) => {
  const favorite = {
    id_activite: req.body.id_activite,
    id_exercice: req.body.id_exercice || null,
    id_utilisateur: req.userId
  };
  Favoris.create(favorite, (err, result) => {
    if (err) {
      console.error('Erreur lors de la création du favori:', err);
      res.status(500).json({ message: err.message });
    } else {
      res.status(201).json(result);
    }
  });
};

// Récupérer tous les favoris de l'utilisateur connecté
exports.getFavoritesByUser = (req, res) => {
  const userId = req.userId;
  Favoris.findByUserId(userId, (err, favorites) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.json(favorites);
    }
  });
};


// Récupérer tous les favoris
exports.getAllFavorites = (req, res) => {
  Favoris.findAll((err, favorites) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.json(favorites);
    }
  });
};

// Récupérer un favori par ID
exports.getFavoriteById = (req, res) => {
  const favoriteId = req.params.id;
  Favoris.findById(favoriteId, (err, favorite) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.json(favorite);
    }
  });
};

// Mettre à jour un favori par ID
exports.updateFavorite = (req, res) => {
  const favoriteId = req.params.id;
  const updatedFavorite = {
    id_activite: req.body.id_activite,
    id_exercice: req.body.id_exercice || null,
    id_utilisateur: req.userId
  };
  Favoris.update(favoriteId, updatedFavorite, (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.json(result);
    }
  });
};

// Supprimer un favori par ID
exports.deleteFavorite = (req, res) => {
  const favoriteId = req.params.id;
  Favoris.delete(favoriteId, (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.json(result);
    }
  });
};
