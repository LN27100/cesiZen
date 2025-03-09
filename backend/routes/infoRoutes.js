const express = require('express');
const router = express.Router();
const infoController = require('../controllers/infoController');

router.post('/', infoController.create);
router.get('/', infoController.findAll);
router.put('/:id', infoController.update);
router.delete('/:id', infoController.delete);


module.exports = router;


