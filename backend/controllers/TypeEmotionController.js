const TypeEmotion = require('../models/TypeEmotion');

const TypeEmotionController = {
    // Créer un nouveau type d'émotion
    createTypeEmotion: (req, res) => {
        const typeEmotion = req.body;
        TypeEmotion.create(typeEmotion, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json(result);
        });
    },

    // Récupérer tous les types d'émotions
    getAllTypeEmotions: (req, res) => {
        TypeEmotion.findAll((err, types) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(types);
        });
    },

    // Récupérer un type d'émotion par ID
    getTypeEmotionById: (req, res) => {
        const id = req.params.id;
        TypeEmotion.findById(id, (err, type) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(type);
        });
    },

    // Mettre à jour un type d'émotion par ID
    updateTypeEmotion: (req, res) => {
        const id = req.params.id;
        const typeEmotion = req.body;
        TypeEmotion.update(id, typeEmotion, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(result);
        });
    },

    // Supprimer un type d'émotion par ID
    deleteTypeEmotion: (req, res) => {
        const id = req.params.id;
        TypeEmotion.delete(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(result);
        });
    }
};

module.exports = TypeEmotionController;
