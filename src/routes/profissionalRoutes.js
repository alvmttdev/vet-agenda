const express = require('express');
const router = express.Router();
const profissionalController = require('../controllers/profissionalController');

// Rota para listar (GET)
router.get('/', profissionalController.listarProfissionais);

// Rota para cadastrar (POST)
router.post('/', profissionalController.cadastrarProfissional);

// Rota para editar (PUT)
router.put('/:id', profissionalController.atualizarProfissional);

// Rota para apagar (DELETE)
router.delete('/:id', profissionalController.deletarProfissional);

module.exports = router;