const { obterPool } = require('../database/db.js')
class Contatos {
    constructor() {
        this.pool = obterPool()
    }

    async listarTodos() {
        const [rows] = await this.pool.execute('SELECT * FROM contatos')
        return rows
    }

    async listarPorId(id) {
        const [rows] = await this.pool.execute(
            'SELECT * FROM contatos WHERE id = ?',
            [id]
        )

        return rows.length > 0 ? rows[0] : null
    }

    async inserir({nome, telefone}) {
        const [result] = await this.pool.execute('INSERT INTO contatos(nome, telefone) VALUES (?,?)', [nome, telefone])

        return result;
    }

    async atualizar({id, nome = null, telefone = null}) {
        const campos = []
        const parametros = []

        if (nome !== null) {
            campos.push('nome = ?')
            parametros.push(nome)
        }
        if (telefone !== null) {
            campos.push('telefone = ?')
            parametros.push(telefone)
        }
        if (campos.length === 0) {
            return { affectedRows: 0, changedRows: 0 }
        }

        parametros.push(id)
        const query = `UPDATE contatos SET ${campos.join(', ')} WHERE id = ?`
        const [result] = await this.pool.execute(query, parametros)
        return result
    }

    async excluir(id) {
        const [result] = await this.pool.execute(
            'DELETE FROM contatos WHERE id = ?',
            [id]
        )
        return result
    }
}

module.exports = Contatos