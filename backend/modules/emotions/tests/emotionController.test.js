const EmotionController = require('../controllers/emotionController');
const Emotion = require('../models/Emotion');

jest.mock('../models/Emotion');

describe('Emotion Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new emotion', async () => {
    const req = { body: { name: 'Joie' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    Emotion.create.mockImplementation((emotion, callback) => callback(null, { id: 1, name: 'Joie' }));

    await EmotionController.createEmotion(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Joie' });
  });

  it('should get all emotions', async () => {
    const req = {};
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    Emotion.findAll.mockImplementation((callback) => callback(null, [{ id: 1, name: 'Tristesse' }]));

    await EmotionController.getAllEmotions(req, res);

    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Tristesse' }]);
  });

  it('should get an emotion by ID', async () => {
    const req = { params: { id: 1 } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    Emotion.findById.mockImplementation((id, callback) => callback(null, { id: 1, name: 'Colère' }));

    await EmotionController.getEmotionById(req, res);

    expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Colère' });
  });

  it('should update an emotion', async () => {
    const req = { params: { id: 1 }, body: { name: 'Peur' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    Emotion.update.mockImplementation((id, emotion, callback) => callback(null, { success: true }));

    await EmotionController.updateEmotion(req, res);

    expect(res.json).toHaveBeenCalledWith({ success: true });
  });

  it('should delete an emotion', async () => {
    const req = { params: { id: 1 } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    Emotion.delete.mockImplementation((id, callback) => callback(null, { success: true }));

    await EmotionController.deleteEmotion(req, res);

    expect(res.json).toHaveBeenCalledWith({ success: true });
  });
});

// Test d'erreur sur createEmotion
it('should handle error when creating an emotion', async () => {
  const req = { body: { name: 'Tristesse' } };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  Emotion.create.mockImplementation((emotion, callback) => callback(new Error('Erreur création'), null));

  await EmotionController.createEmotion(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ error: 'Erreur création' });
});

// Test d'erreur sur getAllEmotions
it('should handle error when getting all emotions', async () => {
  const req = {};
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  Emotion.findAll.mockImplementation((callback) => callback(new Error('Erreur récupération'), null));

  await EmotionController.getAllEmotions(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ error: 'Erreur récupération' });
});

// Test d'erreur sur getEmotionById
it('should handle error when getting emotion by ID', async () => {
  const req = { params: { id: 1 } };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  Emotion.findById.mockImplementation((id, callback) => callback(new Error('Erreur ID'), null));

  await EmotionController.getEmotionById(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ error: 'Erreur ID' });
});

// Test d'erreur sur updateEmotion
it('should handle error when updating an emotion', async () => {
  const req = { params: { id: 1 }, body: { name: 'Peur' } };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  Emotion.update.mockImplementation((id, emotion, callback) => callback(new Error('Erreur update'), null));

  await EmotionController.updateEmotion(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ error: 'Erreur update' });
});

// Test d'erreur sur deleteEmotion
it('should handle error when deleting an emotion', async () => {
  const req = { params: { id: 1 } };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  Emotion.delete.mockImplementation((id, callback) => callback(new Error('Erreur suppression'), null));

  await EmotionController.deleteEmotion(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ error: 'Erreur suppression' });
});
