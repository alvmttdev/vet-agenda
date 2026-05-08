const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express(); // ESSA LINHA É ESSENCIAL! Ela cria o seu servidor.

// Middlewares
app.use(cors());
app.use(express.json()); // Isso aqui permite que o servidor entenda o JSON que enviamos no Body

// Conexão com o banco (apenas para testar a conexão ao iniciar)
require('./src/config/database');

// --- ROTAS ---

// Rotas de Profissionais
const profissionalRoutes = require('./src/routes/profissionalRoutes');
app.use('/api/profissionais', profissionalRoutes);

// Rotas de Clientes
const clienteRoutes = require('./src/routes/clienteRoutes');
app.use('/api/clientes', clienteRoutes);

// --- INICIALIZAÇÃO ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor a rodar com sucesso na porta ${PORT}`);
});