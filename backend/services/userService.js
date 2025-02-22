import { hash as _hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { findByEmail, create } from '../models/User';

export async function creerUtilisateur(data) {
    return new Promise((resolve, reject) => {
        // Vérification si un utilisateur avec le même email existe déjà
        findByEmail(data.email, (err, utilisateurExistant) => {
            if (err) return reject(err);
            if (utilisateurExistant) {
                return reject(new Error('Un compte existe déjà avec cet email.'));
            }

            // Hachage du mot de passe
            _hash(data.mot_de_passe, 10, (err, hash) => {
                if (err) return reject(err);

                // Création du nouvel utilisateur avec le rôle
                const newUser = {
                    prenom: data.prenom,
                    nom: data.nom,
                    email: data.email,
                    mot_de_passe: hash,
                    pseudo: data.pseudo,
                    role: data.role // Ajout du rôle
                };

                create(newUser, (err, utilisateur) => {
                    if (err) return reject(err);
                    resolve(utilisateur);
                });
            });
        });
    });
}

export async function authentifierUtilisateur(email, mot_de_passe) {
    return new Promise((resolve, reject) => {
        findByEmail(email, (err, utilisateur) => {
            if (err) return reject(err);
            if (!utilisateur) {
                return reject(new Error('Utilisateur non trouvé.'));
            }

            compare(mot_de_passe, utilisateur.mot_de_passe, (err, valide) => {
                if (err) return reject(err);
                if (!valide) {
                    return reject(new Error('Mot de passe incorrect.'));
                }

                const token = sign(
                    { id: utilisateur.id_utilisateur, email: utilisateur.email, role: utilisateur.role }, // Ajout du rôle dans le token
                    process.env.JWT_SECRET,
                );

                resolve({ utilisateur, token });
            });
        });
    });
}
