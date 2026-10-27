const request = require('supertest');
const { servidor } = require('./index')

afterAll(async () => {
    servidor.close()
})

describe('GET /contatos', () => {
    it('Deve retornar todos os contatos', async () => {
        // console.log('Servidor rodando na porta: ', process.env.PORT)
        const res = await request(servidor).get('/contatos')
        console.log('Contatos: ', res.body.contatos)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('contatos')
        expect(Array.isArray(res.body.contatos)).toBe(true)
    })
})

describe('GET /contatos/:id', () => {
    it('Deve retornar um contato específico', async () => {
        const res = await request(servidor).get('/contatos/1')
        console.log('Contato retornado: ', res.body.contato)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('contato')
        expect(res.body.contato).toHaveProperty('id', 1)
    })
})

let idNovoContato = 0;
describe('POST /contatos', () => {
    it('Deve criar um novo contato', async () => {
        const numero = Math.floor(10000000000 + Math.random() * 90000000000);

        const novoContato = {
            nome: 'João da Silva',
            telefone: `${numero}`
        }
        const res = await request(servidor).post('/contatos').send(novoContato)
        idNovoContato = res.body.contato.id
        console.log('Contato criado: ', res.body.contato)
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('contato')
    })
})

describe('PATCH /contatos/:id', () => {
    it('Deve atualizar um contato existente', async () => {
         const numero = Math.floor(10000000000 + Math.random() * 90000000000);
        
        const contatoAtualizado = {
            nome: 'João da Silva Atualizado',
            telefone: `${numero}`
        }
        const res = await request(servidor).patch(`/contatos/${idNovoContato}`).send(contatoAtualizado)
        console.log('Contato atualizado: ', res.body)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('contato')
    })
})

describe('DELETE /contatos/:id', () => {
    it('Deve excluir um contato existente', async () => {
        const res = await request(servidor).delete(`/contatos/${idNovoContato}`)
        console.log('Contato excluído: ', res.body)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('mensagem')
    })
})