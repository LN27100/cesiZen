const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Validation des champs du formulaire
function validerChampsUtilisateur(data) {
  const erreurs = [];

  if (!data.prenom || data.prenom.trim() === "") erreurs.push("Le prénom est requis.");
  if (!data.nom || data.nom.trim() === "") erreurs.push("Le nom est requis.");
  if (!data.pseudo || data.pseudo.trim() === "") erreurs.push("Le pseudo est requis.");
  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) erreurs.push("Email invalide.");
  if (!data.mot_de_passe || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(data.mot_de_passe)) {
    erreurs.push("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.");
  }

  return erreurs;
}

exports.creerUtilisateur = async (data) => {
  return new Promise((resolve, reject) => {
    // Vérification si un utilisateur avec le même email existe déjà
    const erreursValidation = validerChampsUtilisateur(data);
    if (erreursValidation.length > 0) {
      return reject(new Error(erreursValidation.join(' ')));
    }

    User.findByEmail(data.email, (err, utilisateurExistant) => {
      if (err) return reject(err);
      if (utilisateurExistant) {
        return reject(new Error('Un compte existe déjà avec cet email.'));
      }
      // Hachage du mot de passe
      bcrypt.hash(data.mot_de_passe, 10, (err, hash) => {
        if (err) return reject(err);

        const newUser = {
          prenom: data.prenom,
          nom: data.nom,
          email: data.email,
          mot_de_passe: hash,
          pseudo: data.pseudo,
          role: data.role || "Utilisateur"
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
  

exports.resetPassword = async (id, oldPassword, newPassword) => {
    return new Promise((resolve, reject) => {
        User.findById(id, (err, user) => {
            if (err) return reject(err);
            if (!user) return reject(new Error('Utilisateur non trouvé.'));

            bcrypt.compare(oldPassword, user.mot_de_passe, (err, valid) => {
                if (err) return reject(err);
                if (!valid) return reject(new Error('Ancien mot de passe incorrect.'));

                bcrypt.hash(newPassword, 10, (err, hash) => {
                    if (err) return reject(err);
                    if (!hash) return reject(new Error('Erreur lors du hachage du mot de passe.'));

                    User.updatePassword(id, hash, (err, result) => {
                        if (err) return reject(err);
                        resolve(result);
                    });
                });
            });
        });
    });
};

  
