// require('dotenv').config()
const mysql = require('mysql2/promise')

let pool;

function obterPool() {
    if(!pool) {
        pool = mysql.createPool({
            host: process.env.DB_HOST || '127.0.0.1',
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '1234',
            database: process.env.DATABASE || 'portlouisdb',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        })
    }

    return pool
}

module.exports = {obterPool}