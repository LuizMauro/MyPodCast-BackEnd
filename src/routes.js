const express = require('express');



//middleware
const upload  = require('./utils/multer');
//middleware


//chamando os controllers
const UserController = require('./controllers/UserController');
const TipoUser = require('./controllers/TipoUsuarioController');
const Categoria = require('./controllers/CategoriaController');
const PodCast  = require('./controllers/PodCastController');
//final chamando os controllers

const { date } = require('./utils/Date');

const routes = express.Router();

//rotas
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/tipouser', TipoUser.index);
routes.post('/tipouser', TipoUser.store);

routes.get('/categoria', Categoria.index);
routes.post('/categoria', Categoria.store);

routes.get('/podcasts', PodCast.index);
routes.post('/podcasts', upload.single('file') , PodCast.store);

routes.get('/getdate', (req, resp) =>{
    return resp.json({"data": date(Date.now()).format})
})

module.exports = routes;
