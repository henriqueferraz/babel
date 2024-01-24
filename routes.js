const express = require('express')
const homeControler = require('./src/controllers/homeController')

const route = express.Router()

route.get('/', homeControler.paginaInicial)
route.post('/', homeControler.trataPost)

module.exports = route