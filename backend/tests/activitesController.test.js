const { create, findAll, findByCategory, update, delete: deleteActivity } = require('../controllers/activitesController');
const Activity = require('../models/Activites');

jest.mock('../models/Activites');

describe('Activites Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new activity', async () => {
    const req = {
      body: {
        nom_activite: 'Yoga',
        description_activite: 'Relaxation',
        status_activite_détente: 'actif',
        id_categorie: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Activity.create.mockImplementation((data, callback) => callback(null, { insertId: 1 }));

    await create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Activité créée avec succès', id: 1 });
  });

  it('should return all activities', async () => {
    const req = {};
    const res = {
      send: jest.fn(),
    };

    Activity.findAll.mockImplementation((callback) => callback(null, [{ id_activite: 1, nom_activite: 'Yoga' }]));

    await findAll(req, res);

    expect(res.send).toHaveBeenCalledWith([{ id_activite: 1, nom_activite: 'Yoga' }]);
  });

  it('should update an activity', async () => {
    const req = {
      params: { id: 1 },
      body: { nom: 'Yoga', description: 'Relaxation', statut: 'actif' },
    };
    const res = {
      send: jest.fn(),
    };

    Activity.update.mockImplementation((id, data, callback) => callback(null, {}));

    await update(req, res);

    expect(res.send).toHaveBeenCalledWith({ message: 'Activité mise à jour avec succès' });
  });

  it('should delete an activity', async () => {
    const req = {
      params: { id: 1 },
    };
    const res = {
      send: jest.fn(),
    };

    Activity.delete.mockImplementation((id, callback) => callback(null, {}));

    await deleteActivity(req, res);

    expect(res.send).toHaveBeenCalledWith({ message: 'Activité supprimée avec succès' });
  });

  it('should return activities by category', async () => {
    const req = {
      params: { id: 1 },
    };
    const res = {
      send: jest.fn(),
    };

    Activity.findByCategory.mockImplementation((id, callback) => callback(null, [{ id_activite: 1, nom_activite: 'Yoga' }]));

    await findByCategory(req, res);

    expect(res.send).toHaveBeenCalledWith([{ id_activite: 1, nom_activite: 'Yoga' }]);
  });
});
