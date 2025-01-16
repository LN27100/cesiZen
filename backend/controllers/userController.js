const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

// Créer un nouvel utilisateur
exports.register = async (req, res) => {
    const { prenom, nom, email, mot_de_passe, pseudo } = req.body;

    try {
        const user = await userService.creerUtilisateur({ prenom, nom, email, mot_de_passe, pseudo });
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
    const { prenom, nom, email, mot_de_passe, pseudo } = req.body;
    const hashedPassword = bcrypt.hashSync(mot_de_passe, 8);
    const updatedUser = { prenom, nom, email, mot_de_passe: hashedPassword, pseudo };

    User.update(id, updatedUser, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Utilisateur mis à jour');
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
