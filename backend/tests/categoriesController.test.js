const categoriesController = require('../controllers/categoriesController');
const Categorie = require('../models/Categorie');

jest.mock('../models/Categorie');

describe('Categories Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all categories', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Categorie.findAll.mockImplementation((callback) => callback(null, [{ id: 1, name: 'Sport' }]));

    await categoriesController.getAllCategories(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Sport' }]);
  });

  it('should handle error when getting categories', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Categorie.findAll.mockImplementation((callback) => callback(new Error('Erreur DB'), null));

    await categoriesController.getAllCategories(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Erreur interne du serveur." });
  });
});
