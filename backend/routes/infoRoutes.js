const express = require('express');
const router = express.Router();
const infoController = require('../controllers/infoController');

router.post('/', infoController.create);
router.get('/', infoController.findAll);

module.exports = router;


