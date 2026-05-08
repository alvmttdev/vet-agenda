const db = require('../config/database');

const listarClientes = async (req, res) => {
    try {
        const [clientes] = await db.query('SELECT * FROM clientes');
        res.json(clientes);
    } catch (erro) {
        console.error('Erro ao buscar clientes:', erro);
        res.status(500).json({ erro: 'Erro ao buscar clientes' });
    }
};

const cadastrarCliente = async (req, res) => {
    const { nome, email, telefone } = req.body;
    try {
        const [resultado] = await db.query(
            'INSERT INTO clientes (nome, email, telefone) VALUES (?, ?, ?)',
            [nome, email, telefone]
        );
        res.status(201).json({ id: resultado.insertId, nome, email, telefone });
    } catch (erro) {
        console.error('Erro ao cadastrar cliente:', erro);
        res.status(500).json({ erro: 'Erro ao cadastrar cliente' });
    }
};

// --- NOVAS FUNÇÕES ---
const atualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;
    try {
        await db.query(
            'UPDATE clientes SET nome = ?, email = ?, telefone = ? WHERE id = ?',
            [nome, email, telefone, id]
        );
        res.json({ mensagem: 'Cliente atualizado com sucesso!' });
    } catch (erro) {
        console.error('Erro ao atualizar cliente:', erro);
        res.status(500).json({ erro: 'Erro ao atualizar cliente' });
    }
};

const deletarCliente = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM clientes WHERE id = ?', [id]);
        res.json({ mensagem: 'Cliente removido com sucesso!' });
    } catch (erro) {
        console.error('Erro ao deletar cliente:', erro);
        res.status(500).json({ erro: 'Erro ao deletar cliente' });
    }
};

module.exports = {
    listarClientes,
    cadastrarCliente,
    atualizarCliente,
    deletarCliente
};