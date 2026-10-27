require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express();
const contatoRouter = require('./routes/contatos.routes.js')

app.use(express.json())
app.use(cors())

app.use('/contatos', contatoRouter)

const servidor = app.listen(process.env.PORT, () => console.log('The server is running...'))

module.exports = { servidor }

