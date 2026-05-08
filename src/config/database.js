// Importa o mysql2 com suporte a Promises (para usar async/await)
const mysql = require('mysql2/promise');
require('dotenv').config();

// Cria um "pool" de conexões (gerencia várias conexões simultâneas de forma eficiente)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Testando a conexão com o banco de dados
pool.getConnection()
    .then(conn => {
        console.log('Conectado ao banco de dados VetAgenda com sucesso!');
        conn.release(); // Libera a conexão de volta para o pool
    })
    .catch(err => {
        console.error('Erro ao conectar no banco de dados:', err);
    });

module.exports = pool;