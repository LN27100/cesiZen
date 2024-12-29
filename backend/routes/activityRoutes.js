const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

router.post('/', activityController.create);
router.get('/', activityController.findAll);

module.exports = router;
