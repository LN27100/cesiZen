const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const verifyToken = require('./middlewares/authMiddleware');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Logs des requêtes pour le débogage
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
const userRoutes = require('./routes/userRoutes');
const activityRoutes = require('./routes/activitesRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const infoRoutes = require('./routes/infoRoutes');
const favorisRoutes = require('./routes/favorisRoutes');
const emotionRoutes = require('./routes/emotionRoutes');

app.use('/api/users', userRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/info', infoRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/favoris', favorisRoutes);
app.use('/api', emotionRoutes);

// Route protégée pour le profil
app.get('/api/users/profile', verifyToken, (req, res) => {
  res.send({ userId: req.userId });
});

// Gestion des routes inexistantes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('Une erreur s\'est produite :', err);
  res.status(500).json({ message: 'Une erreur interne est survenue', details: err.message });
});

// Port d'écoute
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Server is running on http://localhost:${PORT}`);
});