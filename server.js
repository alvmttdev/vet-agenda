const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Faz a ponte com o arquivo de banco de dados
require('./src/config/database');

const app = express();

app.use(cors());
app.use(express.json());
const profissionalRoutes = require('./src/routes/profissionalRoutes');
app.use('/api/profissionais', profissionalRoutes);

app.get('/', (req, res) => {
    res.send('Bem-vindo a API da VetAgenda! O servidor esta funcionando.');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor a rodar com sucesso na porta ${PORT}`);
});