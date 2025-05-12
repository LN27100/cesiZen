const { create, findAll, findByCategory, update, delete: deleteActivity } = require('../controllers/activitesController');
const Activity = require('../models/Activites');

jest.mock('../models/Activites');

describe('Activites Controller', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  // Teste la création d'une nouvelle activité
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

  // Teste la récupération de toutes les activités
  it('should return all activities', async () => {
    const req = {};
    const res = {
      send: jest.fn(),
    };

    Activity.findAll.mockImplementation((callback) => callback(null, [{ id_activite: 1, nom_activite: 'Yoga' }]));

    await findAll(req, res);

    expect(res.send).toHaveBeenCalledWith([{ id_activite: 1, nom_activite: 'Yoga' }]); // Vérifie que toutes les activités sont retournées
  });

 

  // Teste la suppression d'une activité
  it('should delete an activity', async () => {
    const req = {
      params: { id: 1 },
    };
    const res = {
      send: jest.fn(),
    };

    Activity.delete.mockImplementation((id, callback) => callback(null, {}));

    await deleteActivity(req, res);

    expect(res.send).toHaveBeenCalledWith({ message: 'Activité supprimée avec succès' }); // Vérifie que l'activité est supprimée
  });

  // Teste la récupération des activités par catégorie
  it('should return activities by category', async () => {
    const req = {
      params: { id: 1 },
    };
    const res = {
      send: jest.fn(),
    };

    Activity.findByCategory.mockImplementation((id, callback) => callback(null, [{ id_activite: 1, nom_activite: 'Yoga' }]));

    await findByCategory(req, res);

    expect(res.send).toHaveBeenCalledWith([{ id_activite: 1, nom_activite: 'Yoga' }]); // Vérifie que les activités sont retournées par catégorie
  });



it('should handle error when creating activity due to missing fields', async () => {
  const req = {
    body: {
      nom_activite: 'Yoga',
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await create(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    message: 'Les champs description_activite, status_activite_détente et id_categorie sont obligatoires.',
  });
});

it('should handle database error when creating activity', async () => {
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

  const error = new Error('Database error');
  Activity.create.mockImplementation((data, callback) => callback(error));
  jest.spyOn(console, 'error').mockImplementation(() => {});

  await create(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ message: 'Erreur serveur lors de la création de l\'activité.' });
});

it('should create activity successfully', async () => {
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
});