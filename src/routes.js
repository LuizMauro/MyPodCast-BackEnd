const express = require('express');

//chamando os controllers
const UserController = require('./controllers/UserController')
const TipoUser = require('./controllers/TipoUsuarioController');

//final chamando os controllers

const routes = express.Router();


//rotas
routes.get('/userss', UserController.index);
routes.post('/userss', UserController.store);

routes.get('/tipouser', TipoUser.index);
routes.post('/tipouser', TipoUser.store);


module.exports = routes;