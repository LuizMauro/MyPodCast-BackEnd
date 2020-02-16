const express = require('express');

//chamando os controllers
const UserController = require('./controllers/UserController')

//final chamando os controllers

const routes = express.Router();


//rotas
routes.get('/userss', UserController.index);
routes.post('/userss', UserController.store);

module.exports = routes;