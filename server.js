const express = require('express')
const routes = require('./routes')
const path = require('path')

const app = express()

//recebimento de POST
app.use(express.urlencoded({ extended: true }))

//ENGINE UTILIZADA -> EJS
app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

//PASTA DE CONTEÚDOS ESTÁTICOS
app.use(express.static(path.urlencoded(__dirname, 'public')))

app.use(routes)

// PORTA DO SERVIDOR
app.listen(3000, () => {
    console.log('Servidor na porta 3000')
    console.log('Servidor iniciado')
})