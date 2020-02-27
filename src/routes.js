const express = require('express');

//middleware
const upload = require('./utils/multer');
const authMiddleware  = require('./middlewares/auth');
//middleware

//chamando os controllers
const UserController = require('./controllers/UserController');
const TipoUser = require('./controllers/TipoUsuarioController');
const Categoria = require('./controllers/CategoriaController');
const PodCast = require('./controllers/PodCastController');
const PodcastCategoria = require('./controllers/PodcastCategoriaController');
const Endereco = require('./controllers/EnderecoController');
const Tag = require('./controllers/TagController');
const PodcastProcedure = require('./controllers/PodcastProcedureController');
const SolicitacaoCadastro = require('./controllers/SolicitacaoCadastroController');
const SessionController = require('./controllers/SessionController');
//final chamando os controllers

//chamndo os validators
const UserStoreValidate = require("./validators/UserStore").validation;
//final validators


const { date } = require('./utils/Date');

const routes = express.Router();

//rotas
routes.get('/users', UserController.index);
routes.get('/users/:usu_id', UserController.read);
routes.post('/users', UserStoreValidate ,UserController.store);
routes.put('/users/:usu_id/:usu_status', UserController.updateUserStatus);// precisa estar logado!?
routes.put('/users/tipo/:usu_id/:tus_id', UserController.updateUsuarioTipo);// precisa estar logado!?
routes.put('/edituser/:usu_id/', UserController.updateUserPerfil);// precisa estar logado!?
routes.put('/usersenha/', authMiddleware ,UserController.updateUserSenha);// precisa estar logado!?

// ou utilizar routes.use(authMiddleware);


routes.post('/sessions', SessionController.store);

routes.get('/tipouser', TipoUser.index);// // precisa estar logado!?
routes.post('/tipouser', TipoUser.store);// // precisa estar logado!?

routes.get('/categoria', Categoria.index); 
routes.post('/categoria', Categoria.store); // precisa estar logado!?
routes.put('/categoria/:ctg_id', Categoria.updateCtgDescricao); // precisa estar logado!?
routes.put('/categoria/:ctg_id/:ctg_status', Categoria.updateCtgStatus); // precisa estar logado!?

routes.get('/podcasts', PodCast.index);
routes.post('/podcast', upload.single('file'), PodcastProcedure.store); // precisa estar logado!?
routes.put('/podcast/:pod_id', PodcastProcedure.update); // precisa estar logado!?
routes.put(
	'/podcastimg/:pod_id',
	upload.single('file'),
	PodCast.updatePodcastImg
); // precisa estar logado!?


routes.put('/podcast/:pod_id/:pod_status', PodCast.updatePodcastStatus); // precisa estar logado!?

routes.get('/podcasts/solicitacao', SolicitacaoCadastro.index);
routes.put(
	'/podcasts/solicitacao/:pod_id/:pod_permissao',
	SolicitacaoCadastro.update
);

routes.get('/podcastctg/:pod_id', PodcastCategoria.indexCtgByPodcastID);
routes.get('/pesquisar/:ctg_id', PodcastCategoria.indexPodcastByCtgID);
routes.get('/pesquisar/nome/:ctg_id', PodcastCategoria.indexPodcastByCtgNome);
routes.post('/podcastctg', PodcastCategoria.store);

routes.get('/endereco', Endereco.index);
routes.post('/endereco', Endereco.store);

routes.get('/tag', Tag.index);
routes.post('/tag', Tag.store);
routes.put('/tag/:tag_id', Tag.updateTag);
routes.put('/tag/:tag_id/:tag_status', Tag.updateTagStatus);


routes.get('/getdate', (req, resp) => {
	return resp.json({ data: date(Date.now()).format });
});

module.exports = routes;
