const db = require('../config/database');

const listarPets = async (req, res) => {
    try {
        const query = `
            SELECT pets.*, clientes.nome as dono 
            FROM pets 
            INNER JOIN clientes ON pets.cliente_id = clientes.id
        `;
        const [pets] = await db.query(query);
        res.json(pets);
    } catch (erro) {
        console.error('Erro ao buscar pets:', erro);
        res.status(500).json({ erro: 'Erro ao buscar pets' });
    }
};

const cadastrarPet = async (req, res) => {
    const { nome, especie, raca, cliente_id } = req.body;
    try {
        const [resultado] = await db.query(
            'INSERT INTO pets (nome, especie, raca, cliente_id) VALUES (?, ?, ?, ?)',
            [nome, especie, raca, cliente_id]
        );
        res.status(201).json({ id: resultado.insertId, nome, especie, cliente_id });
    } catch (erro) {
        console.error('Erro ao cadastrar pet:', erro);
        res.status(500).json({ erro: 'Erro ao cadastrar pet' });
    }
};

module.exports = { 
    listarPets, 
    cadastrarPet 
};