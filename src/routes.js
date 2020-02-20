const express = require('express');

//middleware
const upload = require('./utils/multer');
//middleware

//chamando os controllers
const UserController = require('./controllers/UserController');
const TipoUser = require('./controllers/TipoUsuarioController');
const Categoria = require('./controllers/CategoriaController');
const PodCast = require('./controllers/PodCastController');
const PodcastCategoria = require('./controllers/PodcastCategoriaController');
const Endereco = require('./controllers/EnderecoController');
const PodcastProcedure = require('./controllers/PodcastProcedureController');
const SolicitacaoCadastro = require('./controllers/SolicitacaoCadastroController');
//final chamando os controllers

const { date } = require('./utils/Date');

const routes = express.Router();

//rotas
routes.get('/users', UserController.index);
routes.get('/users/:usu_id', UserController.read);
routes.post('/users', UserController.store);
routes.put('/users/:usu_id/:usu_status', UserController.updateUserStatus);
routes.put('/users/tipo/:usu_id/:tus_id', UserController.updateUsuarioTipo);
routes.put('/edituser/:usu_id/', UserController.updateUserPerfil);
routes.put('/usersenha/:usu_id/', UserController.updateUserSenha);

routes.get('/tipouser', TipoUser.index);
routes.post('/tipouser', TipoUser.store);

routes.get('/categoria', Categoria.index);
routes.post('/categoria', Categoria.store);

routes.get('/podcasts', PodCast.index);
routes.post('/podcast', upload.single('file'), PodcastProcedure.store);
routes.put('/podcast/:pod_id', PodcastProcedure.update);
routes.put('/podcastimg/:pod_id',upload.single('file'),PodCast.updatePodcastImg);
routes.put('/podcast/:pod_id/:pod_status', PodCast.updatePodcastStatus);

routes.get('/podcasts/solicitacao', SolicitacaoCadastro.index);
routes.put('/podcasts/solicitacao/:pod_id/:pod_permissao',SolicitacaoCadastro.update);

routes.get('/podcastctg', PodcastCategoria.index);
routes.post('/podcastctg', PodcastCategoria.store);

routes.get('/endereco', Endereco.index);
routes.post('/endereco', Endereco.store);

routes.get('/getdate', (req, resp) => {
	return resp.json({ data: date(Date.now()).format });
});

module.exports = routes;
