const TrackerEmotions = require('../models/TrackerEmotions');

const TrackerEmotionsController = {
    // Créer un nouvel enregistrement de tracker d'émotions
    createTrackerEmotion: (req, res) => {
        const trackerEmotion = req.body;
        TrackerEmotions.create(trackerEmotion, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json(result);
        });
    },

    // Récupérer tous les enregistrements de tracker d'émotions
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

    // Mettre à jour un enregistrement de tracker d'émotions par ID
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

    // Supprimer un enregistrement de tracker d'émotions par ID
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
