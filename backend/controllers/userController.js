const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

// Créer un nouvel utilisateur
exports.register = async (req, res) => {
  const { prenom, nom, email, mot_de_passe, pseudo, role } = req.body;

  try {
      const user = await userService.creerUtilisateur({ prenom, nom, email, mot_de_passe, pseudo, role });
      res.status(201).json({ message: 'Utilisateur créé', user });
  } catch (err) {
      res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'utilisateur', details: err.message });
  }
};

// Récupérer tous les utilisateurs
exports.findAll = (req, res) => {
    User.findAll((err, users) => {
        if (err) return res.status(500).send(err);
        res.send(users);
    });
};

// Récupérer un utilisateur par ID
exports.findById = (req, res) => {
    const id = req.params.id;
    User.findById(id, (err, user) => {
        if (err) return res.status(500).send(err);
        res.send(user);
    });
};

// Mettre à jour un utilisateur par ID
exports.update = (req, res) => {
  const id = req.params.id;
  const { prenom, nom, email, mot_de_passe, pseudo, role } = req.body;

  // Vérifiez si le mot de passe est fourni et hachez-le si nécessaire
  const updatedUser = { prenom, nom, email, pseudo, role };
  if (mot_de_passe) {
      updatedUser.mot_de_passe = bcrypt.hashSync(mot_de_passe, 8);
  } else {
      // Si le mot de passe n'est pas fourni, récupérez l'utilisateur actuel pour obtenir le mot de passe actuel
      User.findById(id, (err, user) => {
          if (err) return res.status(500).send(err);
          updatedUser.mot_de_passe = user.mot_de_passe;

          User.update(id, updatedUser, (err, result) => {
              if (err) {
                  console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
                  return res.status(500).send(err);
              }
              // Récupérer les données mises à jour de l'utilisateur
              User.findById(id, (err, updatedUser) => {
                  if (err) return res.status(500).send(err);
                  res.send(updatedUser);
              });
          });
      });
      return;
  }

  User.update(id, updatedUser, (err, result) => {
      if (err) {
          console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
          return res.status(500).send(err);
      }
      // Récupérer les données mises à jour de l'utilisateur
      User.findById(id, (err, updatedUser) => {
          if (err) return res.status(500).send(err);
          res.send(updatedUser);
      });
  });
};

// Supprimer un utilisateur par ID
exports.delete = (req, res) => {
    const id = req.params.id;
    User.delete(id, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Utilisateur supprimé');
    });
};

// Connecter un utilisateur
exports.login = async (req, res) => {
    const { email, mot_de_passe } = req.body;

    try {
        const { utilisateur, token } = await userService.authentifierUtilisateur(email, mot_de_passe);
        res.status(200).send({ auth: true, token });
    } catch (err) {
        res.status(401).send({ error: err.message });
    }
};

// Mettre à jour le statut du compte
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { statut_compte } = req.body;

  try {
    const sql = 'UPDATE utilisateur SET statut_compte = ? WHERE id_utilisateur = ?';
    await User.query(sql, [statut_compte, id]);
    res.send({ message: 'Statut du compte mis à jour' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut du compte:', error);
    res.status(500).send({ error: 'Erreur lors de la mise à jour du statut du compte' });
  }
};
