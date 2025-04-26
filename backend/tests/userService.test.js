const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const userService = require('../services/userService');

// On mock bcrypt, jwt et User
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../models/User');

describe('userService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('creerUtilisateur', () => {
    it('devrait créer un utilisateur si l\'email est disponible', async () => {
      const mockData = { prenom: 'John', nom: 'Doe', email: 'john@example.com', mot_de_passe: 'password', pseudo: 'johndoe', role: 'user' };
      const mockHash = 'hashedpassword';
      const mockUserCreated = { id_utilisateur: 1, ...mockData, mot_de_passe: mockHash };

      User.findByEmail.mockImplementation((email, cb) => cb(null, null)); // Aucun utilisateur existant
      bcrypt.hash.mockImplementation((pwd, saltRounds, cb) => cb(null, mockHash));
      User.create.mockImplementation((userData, cb) => cb(null, mockUserCreated));

      const result = await userService.creerUtilisateur(mockData);

      expect(User.findByEmail).toHaveBeenCalledWith(mockData.email, expect.any(Function));
      expect(bcrypt.hash).toHaveBeenCalledWith(mockData.mot_de_passe, 10, expect.any(Function));
      expect(User.create).toHaveBeenCalled();
      expect(result).toEqual(mockUserCreated);
    });

    it('devrait échouer si un utilisateur existe déjà', async () => {
      const mockData = { email: 'john@example.com' };

      User.findByEmail.mockImplementation((email, cb) => cb(null, { id_utilisateur: 1 }));

      await expect(userService.creerUtilisateur(mockData))
        .rejects
        .toThrow('Un compte existe déjà avec cet email.');
    });

    it('devrait échouer si une erreur se produit', async () => {
      const mockData = { email: 'john@example.com' };

      User.findByEmail.mockImplementation((email, cb) => cb(new Error('Erreur DB')));

      await expect(userService.creerUtilisateur(mockData))
        .rejects
        .toThrow('Erreur DB');
    });
  });

  describe('authentifierUtilisateur', () => {
    it('devrait authentifier un utilisateur avec les bonnes informations', async () => {
      const mockUser = { id_utilisateur: 1, email: 'john@example.com', mot_de_passe: 'hashedpassword', role: 'user' };
      const mockToken = 'fake-jwt-token';

      User.findByEmail.mockImplementation((email, cb) => cb(null, mockUser));
      bcrypt.compare.mockImplementation((plain, hash, cb) => cb(null, true));
      jwt.sign.mockReturnValue(mockToken);

      const result = await userService.authentifierUtilisateur('john@example.com', 'password');

      expect(User.findByEmail).toHaveBeenCalledWith('john@example.com', expect.any(Function));
      expect(bcrypt.compare).toHaveBeenCalledWith('password', mockUser.mot_de_passe, expect.any(Function));
      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toEqual({ utilisateur: mockUser, token: mockToken });
    });

    it('devrait échouer si l\'utilisateur n\'existe pas', async () => {
      User.findByEmail.mockImplementation((email, cb) => cb(null, null));

      await expect(userService.authentifierUtilisateur('john@example.com', 'password'))
        .rejects
        .toThrow('Utilisateur non trouvé.');
    });

    it('devrait échouer si le mot de passe est incorrect', async () => {
      const mockUser = { id_utilisateur: 1, email: 'john@example.com', mot_de_passe: 'hashedpassword' };

      User.findByEmail.mockImplementation((email, cb) => cb(null, mockUser));
      bcrypt.compare.mockImplementation((plain, hash, cb) => cb(null, false));

      await expect(userService.authentifierUtilisateur('john@example.com', 'wrongpassword'))
        .rejects
        .toThrow('Mot de passe incorrect.');
    });
  });

  describe('resetPassword', () => {
    it('devrait réinitialiser le mot de passe', async () => {
      const mockUser = { id_utilisateur: 1, mot_de_passe: 'oldhashed' };
      const newHashedPassword = 'newhashedpassword';

      User.findById.mockImplementation((id, cb) => cb(null, mockUser));
      bcrypt.compare.mockImplementation((oldPass, hashed, cb) => cb(null, true));
      bcrypt.hash.mockImplementation((newPass, saltRounds, cb) => cb(null, newHashedPassword));
      User.updatePassword.mockImplementation((id, newHash, cb) => cb(null, { success: true }));

      const result = await userService.resetPassword(1, 'oldpassword', 'newpassword');

      expect(User.findById).toHaveBeenCalledWith(1, expect.any(Function));
      expect(bcrypt.compare).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalled();
      expect(User.updatePassword).toHaveBeenCalledWith(1, newHashedPassword, expect.any(Function));
      expect(result).toEqual({ success: true });
    });

    it('devrait échouer si l\'utilisateur n\'existe pas', async () => {
      User.findById.mockImplementation((id, cb) => cb(null, null));

      await expect(userService.resetPassword(1, 'oldpassword', 'newpassword'))
        .rejects
        .toThrow('Utilisateur non trouvé.');
    });

    it('devrait échouer si l\'ancien mot de passe est incorrect', async () => {
      const mockUser = { id_utilisateur: 1, mot_de_passe: 'oldhashed' };

      User.findById.mockImplementation((id, cb) => cb(null, mockUser));
      bcrypt.compare.mockImplementation((oldPass, hashed, cb) => cb(null, false));

      await expect(userService.resetPassword(1, 'wrongoldpassword', 'newpassword'))
        .rejects
        .toThrow('Ancien mot de passe incorrect.');
    });
  });
});
