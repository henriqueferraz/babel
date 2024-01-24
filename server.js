require('dotenv').config()
const express = require('express')
const app = express()

// CONECÇÃO COM O BANCO DE DADOS
const mongoose = require('mongoose')
mongoose.connect(process.env.CONECTIONSTRING)
    .then(() => {
        console.log('Conectado a base de dados')
        app.emit('conectado')
    })
    .catch(error => console.log(error))

// CRIAÇÃO DAS ROTAS
const routes = require('./routes')

// CRIAÇÃO DO PATH ESTÁTICO
const path = require('path')
const { error } = require('console')

//recebimento de POST
app.use(express.urlencoded({ extended: true }))

//PASTA DE CONTEÚDOS ESTÁTICOS
app.use(express.static(path.resolve(__dirname, 'public')))

//ENGINE UTILIZADA -> EJS
app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

// UTILIZAR ROTAS
app.use(routes)

// PORTA DO SERVIDOR
app.on('conectado', () => {   //O SERVIDOR SÓ VAI FUNCIONAR SE HOUVER UMA CONECÇÃO COM A BASE DE DADOS
    app.listen(3000, () => {
        console.log('Servidor na porta 3000')
        console.log('Servidor iniciado')
    })
})
