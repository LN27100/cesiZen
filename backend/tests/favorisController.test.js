const {
    createFavorite,
    getFavoritesByUser,
    getAllFavorites,
    getFavoriteById,
    updateFavorite,
    deleteFavorite
  } = require('../controllers/favorisController');
  
  const Favoris = require('../models/Favoris');
  
  jest.mock('../models/Favoris');
  
  describe('Favoris Controller', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    // Test de la création d'un favori
    it('should create a new favorite', async () => {
      const req = {
        body: {
          id_activite: 1,
          id_exercice: null,
        },
        userId: 10
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      Favoris.create.mockImplementation((favorite, callback) => callback(null, { id: 1, ...favorite }));
  
      await createFavorite(req, res);
  
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, id_activite: 1, id_exercice: null, id_utilisateur: 10 });
    });
  
    // Test de la récupération des favoris d'un utilisateur
    it('should get all favorites of a user', async () => {
      const req = { userId: 10 };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };
  
      Favoris.findByUserId.mockImplementation((userId, callback) => callback(null, [{ id_favori: 1 }]));
  
      await getFavoritesByUser(req, res);
  
      expect(res.json).toHaveBeenCalledWith([{ id_favori: 1 }]);
    });
  
    // Test de la récupération de tous les favoris
    it('should get all favorites', async () => {
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };
  
      Favoris.findAll.mockImplementation((callback) => callback(null, [{ id_favori: 1 }, { id_favori: 2 }]));
  
      await getAllFavorites(req, res);
  
      expect(res.json).toHaveBeenCalledWith([{ id_favori: 1 }, { id_favori: 2 }]);
    });
  
    // Test de la récupération d'un favori par ID
    it('should get favorite by ID', async () => {
      const req = { params: { id: 1 } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };
  
      Favoris.findById.mockImplementation((id, callback) => callback(null, { id_favori: 1 }));
  
      await getFavoriteById(req, res);
  
      expect(res.json).toHaveBeenCalledWith({ id_favori: 1 });
    });
  
    // Test de la mise à jour d'un favori
    it('should update a favorite', async () => {
      const req = {
        params: { id: 1 },
        body: {
          id_activite: 1,
          id_exercice: null
        },
        userId: 10
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };
  
      Favoris.update.mockImplementation((id, favorite, callback) => callback(null, { success: true }));
  
      await updateFavorite(req, res);
  
      expect(res.json).toHaveBeenCalledWith({ success: true });
    });
  
    // Test de la suppression d'un favori
    it('should delete a favorite', async () => {
      const req = { params: { id: 1 } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };
  
      Favoris.delete.mockImplementation((id, callback) => callback(null, { success: true }));
  
      await deleteFavorite(req, res);
  
      expect(res.json).toHaveBeenCalledWith({ success: true });
    });
  });
  