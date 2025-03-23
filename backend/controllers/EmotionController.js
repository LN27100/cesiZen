const Emotion = require('../models/Emotion');

const EmotionController = {
    // Créer une nouvelle émotion
    createEmotion: (req, res) => {
        const emotion = req.body;
        Emotion.create(emotion, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json(result);
        });
    },

    // Récupérer toutes les émotions
    getAllEmotions: (req, res) => {
        Emotion.findAll((err, emotions) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(emotions);
        });
    },

    // Récupérer une émotion par ID
    getEmotionById: (req, res) => {
        const id = req.params.id;
        Emotion.findById(id, (err, emotion) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(emotion);
        });
    },

    // Mettre à jour une émotion par ID
    updateEmotion: (req, res) => {
        const id = req.params.id;
        const emotion = req.body;
        Emotion.update(id, emotion, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(result);
        });
    },

    // Supprimer une émotion par ID
    deleteEmotion: (req, res) => {
        const id = req.params.id;
        Emotion.delete(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(result);
        });
    }
};

module.exports = EmotionController;
