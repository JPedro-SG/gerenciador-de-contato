require('dotenv').config()
const mysql = require('mysql2/promise')


const host = process.env.DB_HOST
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const port = process.env.DB_PORT
const database = process.env.DATABASE

async function criarBanco(conexao) {

    try {
        const bancoFoiCriado = await conexao.query(
            `CREATE DATABASE IF NOT EXISTS ${database}`
        )
        console.log('Banco de dados criado com sucesso!')
        return bancoFoiCriado
    } catch (error) {
        console.error('Erro ao criar banco: ', error.message)
        return false
    }
}


async function criarTabelaContatos(conexao){
    try {
        await conexao.query(
            `CREATE TABLE IF NOT EXISTS contatos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(150) NOT NULL,
                telefone VARCHAR(11) UNIQUE NOT NULL
            );`
        )
        
        console.log('Tabela contato criada!')

    } catch (error) {
        console.log('Erro ao criar tabela contatos: ', error)
    }
}

async function popularContatos(conexao) {
    try {
        const contatos = [
            ['Arthur Souza', '11999324564'],
            ['Paulo Martins', '79981456427']
        ]

        await conexao.query('INSERT INTO contatos (nome, telefone) VALUES ?', [contatos])
        console.log('Dados inseridos com sucesso')
    } catch (error) {
        if(error.code === 'ER_DUP_ENTRY') {
            console.log('Dados já inseridos anteriormente.')
        } else {
            console.error('Erro ao popular a tabela contatos. Descrição do erro: ', erro);
        }

        return false
    }
}

async function seed() {
    let conexao = null;
    try {
        
        conexao = await mysql.createConnection({
            host: host,
            user: user,
            port: port,
            //   database: 'portlouis',
            password: password
        });
        const bancoFoiCriado = await criarBanco(conexao);
        
        if(bancoFoiCriado) {
            await conexao.query(`USE ${database};`);

            await criarTabelaContatos(conexao)
            await popularContatos(conexao);
        }

        return;
    } catch (error) {
        console.log('Erro ao executar seed.js. Descrição do erro: ', error)
    }finally {
        conexao?.end()
    }
}

seed();



