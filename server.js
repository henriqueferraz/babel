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

// CRIANDO SEÇÃO
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')

// CRIAÇÃO DAS ROTAS
const routes = require('./routes')

// CRIAÇÃO DO PATH ESTÁTICO
const path = require('path')

//MIDWARE GLOBAL
const { checkCsrfError, csrfMiddlware } = require('./src/middlwares/middlware')

// ARQUIVOS DE SEGURANÇA
const helmet = require('helmet')
const csrf = require('csurf') //CONTINUA A CONFIGURAÇÃO ABAIXO
app.use(helmet())

//recebimento de POST
app.use(express.urlencoded({ extended: true }))

//PASTA DE CONTEÚDOS ESTÁTICOS
app.use(express.static(path.resolve(__dirname, 'public')))

//CONFIGURANDO AS SEÇÕES
const sectionOptions = session({
    secret: 'çsekfuweniu3490r49r948tbdnsbdmnasbnmdbasnbdamhfhsbfjhfd',
    store: MongoStore.create({ mongoUrl: process.env.CONECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})
app.use(sectionOptions)
app.use(flash())
app.use(checkCsrfError)
app.use(csrfMiddlware)

//ENGINE UTILIZADA -> EJS
app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

// CONTINUAÇÃO CSURF
app.use(csrf())

// UTILIZAR ROTAS
app.use(routes)

// PORTA DO SERVIDOR
app.on('conectado', () => {   //O SERVIDOR SÓ VAI FUNCIONAR SE HOUVER UMA CONECÇÃO COM A BASE DE DADOS
    app.listen(3000, () => {
        console.log('Servidor na porta 3000')
        console.log('Servidor iniciado')
    })
})
