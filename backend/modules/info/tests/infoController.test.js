const infoController = require('../controllers/infoController');
const Info = require('../models/Info');

jest.mock('../models/Info');

describe('Info Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new info', async () => {
    const req = { body: { titre: 'Info 1', description: 'Desc', auteur: 'Auteur', nom_image: 'image.png' } };
    const res = { send: jest.fn(), status: jest.fn().mockReturnThis() };

    Info.create.mockImplementation((newInfo, callback) => callback(null, { id: 1 }));

    await infoController.create(req, res);

    expect(res.send).toHaveBeenCalledWith('Information créée');
  });


  it('should get all infos', async () => {
    const req = {};
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };

    Info.findAll.mockImplementation((callback) => callback(null, [{ id: 1, titre: 'Info' }]));

    await infoController.findAll(req, res);

    expect(res.json).toHaveBeenCalledWith([{ id: 1, titre: 'Info' }]);
  });

  it('should update an info', async () => {
    const req = { params: { id: 1 }, body: { titre: 'Nouveau titre', description: 'Nouvelle desc', auteur: 'Auteur', nom_image: 'newimage.png' } };
    const res = { send: jest.fn(), status: jest.fn().mockReturnThis() };

    Info.update.mockImplementation((id, updatedInfo, callback) => callback(null, { success: true }));

    await infoController.update(req, res);

    expect(res.send).toHaveBeenCalledWith("Information mise à jour avec succès");
  });

  it('should delete an info', async () => {
    const req = { params: { id: 1 } };
    const res = { send: jest.fn(), status: jest.fn().mockReturnThis() };

    Info.delete.mockImplementation((id, callback) => callback(null, { success: true }));

    await infoController.delete(req, res);

    expect(res.send).toHaveBeenCalledWith("Information supprimée avec succès");
  });
});

// Test d'erreur sur create
it('should handle error when creating an info', async () => {
  const req = { body: { titre: 'Erreur', description: 'Erreur', auteur: 'Auteur', nom_image: 'img.png' } };
  const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

  Info.create.mockImplementation((newInfo, callback) => callback(new Error('Erreur création'), null));
  jest.spyOn(console, 'error').mockImplementation(() => {});

  await infoController.create(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.send).toHaveBeenCalled();
});

  // Test d'erreur sur findAll
  it('should handle error when getting all infos', async () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };
  
    Info.findAll.mockImplementation((callback) => callback(new Error('Erreur récupération'), null));
  
    await infoController.findAll(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Erreur lors de la récupération des informations');
  });
  
  // Test d'erreur sur update
  it('should handle error when updating an info', async () => {
    const req = { params: { id: 1 }, body: { titre: 'Erreur', description: 'Erreur', auteur: 'Auteur', nom_image: 'img.png' } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  
    Info.update.mockImplementation((id, updatedInfo, callback) => callback(new Error('Erreur update'), null));
  
    await infoController.update(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Erreur lors de la mise à jour');
  });
  
  // Test d'erreur sur delete
  it('should handle error when deleting an info', async () => {
    const req = { params: { id: 1 } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  
    Info.delete.mockImplementation((id, callback) => callback(new Error('Erreur suppression'), null));
  
    await infoController.delete(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Erreur lors de la suppression');
  });
  