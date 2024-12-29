const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Créer un nouvel utilisateur
exports.register = (req, res) => {
    const { prenom, nom, email, mot_de_passe, pseudo } = req.body;
    const hashedPassword = bcrypt.hashSync(mot_de_passe, 8);
    const newUser = { prenom, nom, email, mot_de_passe: hashedPassword, statut_compte: 'valide', pseudo };

    User.create(newUser, (err, user) => {
        if (err) return res.status(500).send(err);
        res.send('Utilisateur créé');
    });
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
    const { prenom, nom, email, mot_de_passe, statut_compte, pseudo } = req.body;
    const hashedPassword = bcrypt.hashSync(mot_de_passe, 8);
    const updatedUser = { prenom, nom, email, mot_de_passe: hashedPassword, statut_compte, pseudo };

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
exports.login = (req, res) => {
    const { email, mot_de_passe } = req.body;

    User.findByEmail(email, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send('Utilisateur non trouvé');

        const passwordIsValid = bcrypt.compareSync(mot_de_passe, user.mot_de_passe);
        if (!passwordIsValid) return res.status(401).send('Mot de passe incorrect');

        const token = jwt.sign({ id: user.id_utilisateur }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 heures
        });

        res.status(200).send({ auth: true, token });
    });
};
