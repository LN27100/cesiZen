const TrackerEmotions = require('../models/TrackerEmotions');

const TrackerEmotionsController = {
  createTrackerEmotion: (req, res) => {
    const trackerEmotion = req.body;
    TrackerEmotions.create(trackerEmotion, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json(result);
    });
  },

  getAllTrackerEmotions: (req, res) => {
    TrackerEmotions.findAll((err, trackerEmotions) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(trackerEmotions);
    });
  },

  // Récupérer un enregistrement de tracker d'émotions par ID
  getTrackerEmotionById: (req, res) => {
    const id = req.params.id;
    TrackerEmotions.findById(id, (err, trackerEmotion) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(trackerEmotion);
    });
  },

  updateTrackerEmotion: (req, res) => {
    const id = req.params.id;
    const trackerEmotion = req.body;
    TrackerEmotions.update(id, trackerEmotion, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(result);
    });
  },

  deleteTrackerEmotion: (req, res) => {
    const id = req.params.id;
    TrackerEmotions.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(result);
    });
  }
};

module.exports = TrackerEmotionsController;
