const { register, findAll, findById, update, resetPassword, delete: deleteUser, login, updateStatus } = require('../controllers/userController');
const User = require('../models/User');
const userService = require('../services/userService');

jest.mock('../models/User');
jest.mock('../services/userService');

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Réinitialise tous les mocks après chaque test
  });

  // Teste la création d'un nouvel utilisateur
  it('should register a new user', async () => {
    const req = {
      body: {
        prenom: 'John',
        nom: 'Doe',
        email: 'john.doe@example.com',
        mot_de_passe: 'password',
        pseudo: 'johndoe',
        role: 'Utilisateur',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    userService.creerUtilisateur.mockResolvedValue({ id: 1, email: 'john.doe@example.com' });

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(201); 
    expect(res.json).toHaveBeenCalledWith({ message: 'Utilisateur créé', user: { id: 1, email: 'john.doe@example.com' } }); // Vérifie la réponse JSON
  });

  // Teste la récupération de tous les utilisateurs
  it('should return all users', async () => {
    const req = {};
    const res = {
      send: jest.fn(),
    };

    User.findAll.mockImplementation((callback) => callback(null, [{ id: 1, email: 'john.doe@example.com' }]));

    await findAll(req, res);

    expect(res.send).toHaveBeenCalledWith([{ id: 1, email: 'john.doe@example.com' }]); // Vérifie que tous les utilisateurs sont retournés
  });

  // Teste la mise à jour d'un utilisateur existant
  it('should update a user', async () => {
    const req = {
      params: { id: 1 },
      body: { prenom: 'John', nom: 'Doe', email: 'john.doe@example.com' },
    };
    const res = {
      send: jest.fn(),
    };

    User.update.mockImplementation((id, data, callback) => callback(null, {}));
    User.findById.mockImplementation((id, callback) => callback(null, { id: 1, mot_de_passe: 'hashedpassword' }));

    await update(req, res);

    expect(res.send).toHaveBeenCalled(); // Vérifie que l'utilisateur est mis à jour
  });

  // Teste la suppression d'un utilisateur
  it('should delete a user', async () => {
    const req = {
      params: { id: 1 },
    };
    const res = {
      send: jest.fn(),
    };

    User.delete.mockImplementation((id, callback) => callback(null, {}));

    await deleteUser(req, res);

    expect(res.send).toHaveBeenCalledWith('Utilisateur supprimé'); // Vérifie que l'utilisateur est supprimé
  });

  // Teste la réinitialisation du mot de passe d'un utilisateur
  it('should reset user password', async () => {
    const req = {
      params: { id: 1 },
      body: { oldPassword: 'oldpassword', newPassword: 'newpassword' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    userService.resetPassword.mockResolvedValue();

    await resetPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(200); // Vérifie que le statut HTTP est 200 (OK)
    expect(res.send).toHaveBeenCalledWith({ message: 'Mot de passe réinitialisé avec succès.' }); // Vérifie la réponse JSON
  });
});




it('should return 400 if email is missing during registration', async () => {
  const req = {
    body: { /* manqué email */ },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await register(req, res);

  expect(res.status).toHaveBeenCalledWith(400); // Vérifie la gestion des erreurs pour un champ manquant
  expect(res.json).toHaveBeenCalledWith({ error: 'Email requis' }); // Vérifie le message d'erreur
});


it('should return 404 if user to delete does not exist', async () => {
  const req = {
    params: { id: 999 },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  User.delete.mockImplementationOnce((id, callback) => callback(null, null)); // Pas d'utilisateur trouvé

  await deleteUser(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.send).toHaveBeenCalledWith({ error: 'Utilisateur non trouvé' });
});

it('should return 400 when passwords do not match during reset', async () => {
  const req = {
    params: { id: 1 },
    body: { oldPassword: 'oldpassword', newPassword: 'differentpassword' },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  userService.resetPassword.mockRejectedValue(new Error('Les mots de passe ne correspondent pas'));

  await resetPassword(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.send).toHaveBeenCalledWith({ error: 'Les mots de passe ne correspondent pas' });
});


it('should return 500 if updating status fails', async () => {
  const req = {
    params: { id: 1 },
    body: { statut_compte: 'actif' },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  User.query.mockRejectedValue(new Error('Erreur SQL'));
  jest.spyOn(console, 'error').mockImplementation(() => {});

  await updateStatus(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.send).toHaveBeenCalledWith({ error: 'Erreur lors de la mise à jour du statut du compte' });
});

