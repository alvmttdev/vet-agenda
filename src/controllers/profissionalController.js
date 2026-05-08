const db = require('../config/database');

const listarProfissionais = async (req, res) => {
    try {
        const [profissionais] = await db.query('SELECT * FROM profissionais');
        res.json(profissionais);
    } catch (erro) {
        console.error('Erro ao buscar profissionais no banco:', erro);
        res.status(500).json({ erro: 'Erro interno ao buscar profissionais' });
    }
};

module.exports = {
    listarProfissionais
};