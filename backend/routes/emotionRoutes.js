const express = require('express');
const router = express.Router();
const EmotionController = require('../controllers/EmotionController');
const TypeEmotionController = require('../controllers/TypeEmotionController');
const TrackerEmotionsController = require('../controllers/TrackerEmotionsController');
const verifyToken = require('../middlewares/authMiddleware');

// Routes pour les émotions
router.post('/emotions', EmotionController.createEmotion);
router.get('/emotions', EmotionController.getAllEmotions);
router.get('/emotions/:id', EmotionController.getEmotionById);
router.put('/emotions/:id', EmotionController.updateEmotion);
router.delete('/emotions/:id', EmotionController.deleteEmotion);

// Routes pour les types d'émotions
router.post('/types-emotions', TypeEmotionController.createTypeEmotion);
router.get('/types-emotions', TypeEmotionController.getAllTypeEmotions);
router.get('/types-emotions/:id', TypeEmotionController.getTypeEmotionById);
router.put('/types-emotions/:id', TypeEmotionController.updateTypeEmotion);
router.delete('/types-emotions/:id', TypeEmotionController.deleteTypeEmotion);

// Routes pour le tracker d'émotions
router.post('/tracker-emotions', verifyToken, TrackerEmotionsController.createTrackerEmotion);
router.get('/tracker-emotions', verifyToken, TrackerEmotionsController.getUserTrackerEmotions); 
router.get('/tracker-emotions/:id', verifyToken, TrackerEmotionsController.getTrackerEmotionById);
router.put('/tracker-emotions/:id', verifyToken, TrackerEmotionsController.updateTrackerEmotion);
router.delete('/tracker-emotions/:id', verifyToken, TrackerEmotionsController.deleteTrackerEmotion);

module.exports = router;
