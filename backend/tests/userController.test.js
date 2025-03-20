const { register, findAll, findById, update, resetPassword, delete: deleteUser, login, updateStatus } = require('../controllers/userController');
const User = require('../models/User');
const userService = require('../services/userService');

jest.mock('../models/User');
jest.mock('../services/userService');

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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
    expect(res.json).toHaveBeenCalledWith({ message: 'Utilisateur créé', user: { id: 1, email: 'john.doe@example.com' } });
  });

  it('should return all users', async () => {
    const req = {};
    const res = {
      send: jest.fn(),
    };

    User.findAll.mockImplementation((callback) => callback(null, [{ id: 1, email: 'john.doe@example.com' }]));

    await findAll(req, res);

    expect(res.send).toHaveBeenCalledWith([{ id: 1, email: 'john.doe@example.com' }]);
  });

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

    expect(res.send).toHaveBeenCalled();
  });

  it('should delete a user', async () => {
    const req = {
      params: { id: 1 },
    };
    const res = {
      send: jest.fn(),
    };

    User.delete.mockImplementation((id, callback) => callback(null, {}));

    await deleteUser(req, res);

    expect(res.send).toHaveBeenCalledWith('Utilisateur supprimé');
  });

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

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ message: 'Mot de passe réinitialisé avec succès.' });
  });
});
