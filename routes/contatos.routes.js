const { Router } = require('express')
const Contatos = require('../models/contatos.js')

const router = Router()
const contatos = new Contatos()

router.get('/', async (req, res) => {
    try {
        const todosContatos = await contatos.listarTodos()
        return res.json({ contatos: todosContatos })
    } catch (error) {
        console.error('Erro ao listar contatos. Descrição do erro: ', error)
        return res.status(500).json({ error: 'Erro ao buscar contatos' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const contato = await contatos.listarPorId(id)
        if (!contato) return res.status(404).json({ error: 'Contato não encontrado' })

        return res.json({ contato: contato })
    } catch (error) {
        console.error('Erro ao listar contato. Descrição do erro: ', error)
        return res.status(500).json({ error: 'Erro ao buscar contato' })
    }
})

router.post('/', validarContato, async (req, res) => {
    try {
        const { nome, telefone } = req.body
        const resultado = await contatos.inserir({ nome, telefone })
        return res.status(201).json({ contato: { id: resultado.insertId, nome, telefone } })
    } catch (error) {
        console.error('Erro ao inserir contato. Descrição do erro: ', error)
        return res.status(500).json({ error: 'Erro ao inserir contato' })
    }
})

router.patch('/:id', validarContato, async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({ error: 'ID do contato é obrigatório' })
        }

        const { nome, telefone } = req.body
        const resultado = await contatos.atualizar({ id, nome, telefone })
        
        if(resultado.affectedRows === 0) {
            return res.status(404).json({ error: 'Contato não encontrado' })
        }

        return res.json({ contato: {id, nome, telefone} })
    } catch (error) {
        console.error('Erro ao atualizar contato. Descrição do erro: ', error)
        return res.status(500).json({ error: 'Erro ao atualizar contato' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        if(!id) {
            return res.status(400).json({ error: 'ID do contato é obrigatório' })
        }
        await contatos.excluir(id)
        return res.status(200).json({mensagem: 'Contato excluído com sucesso'})
    } catch (error) {
        console.error('Erro ao excluir contato. Descrição do erro: ', error)
        return res.status(500).json({ error: 'Erro ao excluir contato' })
    }
})

function validarContato(req, res, next) {
    const { nome, telefone } = req.body
    if (!nome || !telefone) {
        return res.status(400).json({ error: 'Nome e telefone são obrigatórios' })
    }

    let nomeCompletoDividido = nome.trim().split(' ')
    if (nomeCompletoDividido.length < 2 || nomeCompletoDividido.filter(item => item.length >= 3).length < 2) {
        return res.status(400).json({ error: 'Certifique-se de incluir o nome e o sobrenome com pelo menos três caracteres cada' })
    }

    if(telefone.length !== 11) {
        return res.status(400).json({ error: 'O telefone deve ter exatamente 11 dígitos' })
    }
    next()
}

module.exports = router