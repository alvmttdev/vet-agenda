const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

router.get('/', petController.listarPets);
router.post('/', petController.cadastrarPet);

module.exports = router;