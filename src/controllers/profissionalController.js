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

const cadastrarProfissional = async (req, res) => {
    const { nome, especialidade, telefone } = req.body;

    try {
        const [resultado] = await db.query(
            'INSERT INTO profissionais (nome, especialidade, telefone, ativo) VALUES (?, ?, ?, 1)',
            [nome, especialidade, telefone]
        );
        
        res.status(201).json({ 
            id: resultado.insertId, 
            nome, 
            especialidade, 
            telefone, 
            ativo: 1 
        });
    } catch (erro) {
        console.error('Erro ao cadastrar profissional:', erro);
        res.status(500).json({ erro: 'Erro interno ao cadastrar profissional' });
    }
};

const atualizarProfissional = async (req, res) => {
    const { id } = req.params;
    const { nome, especialidade, telefone, ativo } = req.body;

    try {
        await db.query(
            'UPDATE profissionais SET nome = ?, especialidade = ?, telefone = ?, ativo = ? WHERE id = ?',
            [nome, especialidade, telefone, ativo, id]
        );
        
        res.json({ mensagem: 'Profissional atualizado com sucesso!' });
    } catch (erro) {
        console.error('Erro ao atualizar profissional:', erro);
        res.status(500).json({ erro: 'Erro interno ao atualizar profissional' });
    }
};

// --- NOVA FUNÇÃO DE DELETAR ---
const deletarProfissional = async (req, res) => {
    const { id } = req.params; // Pega o ID da URL

    try {
        await db.query('DELETE FROM profissionais WHERE id = ?', [id]);
        res.json({ mensagem: 'Profissional apagado com sucesso!' });
    } catch (erro) {
        console.error('Erro ao apagar profissional:', erro);
        res.status(500).json({ erro: 'Erro interno ao apagar profissional' });
    }
};

// funções!
module.exports = {
    listarProfissionais,
    cadastrarProfissional,
    atualizarProfissional,
    deletarProfissional
};