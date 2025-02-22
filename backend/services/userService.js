const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.creerUtilisateur = async (data) => {
    return new Promise((resolve, reject) => {
        // Vérification si un utilisateur avec le même email existe déjà
        User.findByEmail(data.email, (err, utilisateurExistant) => {
            if (err) return reject(err);
            if (utilisateurExistant) {
                return reject(new Error('Un compte existe déjà avec cet email.'));
            }

            // Hachage du mot de passe
            bcrypt.hash(data.mot_de_passe, 10, (err, hash) => {
                if (err) return reject(err);

                 // Création du nouvel utilisateur
                 const newUser = {
                    prenom: data.prenom,
                    nom: data.nom,
                    email: data.email,
                    mot_de_passe: hash,
                    pseudo: data.pseudo,
                    role: data.role
                };

                User.create(newUser, (err, utilisateur) => {
                    if (err) return reject(err);
                    resolve(utilisateur);
                });
            });
        });
    });
};

exports.authentifierUtilisateur = async (email, mot_de_passe) => {
    return new Promise((resolve, reject) => {
      User.findByEmail(email, (err, utilisateur) => {
        if (err) return reject(err);
        if (!utilisateur) {
          return reject(new Error('Utilisateur non trouvé.'));
        }
  
        bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe, (err, valide) => {
          if (err) return reject(err);
          if (!valide) {
            return reject(new Error('Mot de passe incorrect.'));
          }
  
          const token = jwt.sign(
            { id: utilisateur.id_utilisateur, email: utilisateur.email, role: utilisateur.role },
            process.env.JWT_SECRET
          );
  
          resolve({ utilisateur, token });
        });
      });
    });
  };
  