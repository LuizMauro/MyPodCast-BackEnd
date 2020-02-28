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
routes.put('/users/:usu_id/:usu_status', UserController.updateUserStatus);// MODERADOR/ADM
routes.put('/users/tipo/:usu_id/:tus_id', UserController.updateUsuarioTipo);// MODERADOR/ADM
routes.put('/edituser/', authMiddleware, UserController.updateUserPerfil);// QUALQUER USUARIO (EDITA O PROPRIO PERFIL)
routes.put('/usersenha/', authMiddleware ,UserController.updateUserSenha);// QUALQUER USUARIO (EDITA O PROPRIO PERFIL)

// ou utilizar routes.use(authMiddleware);


routes.post('/sessions', SessionController.store);

/* APENAS TESTE INICIAL
routes.get('/tipouser', TipoUser.index);// // precisa estar logado!?
routes.post('/tipouser', TipoUser.store);// // precisa estar logado!?
*/

routes.get('/categoria', Categoria.index); 
routes.post('/categoria', Categoria.store); // MODERADOR E ADM
routes.put('/categoria/:ctg_id', Categoria.updateCtgDescricao); // MODERADOR E ADM
routes.put('/categoria/:ctg_id/:ctg_status', Categoria.updateCtgStatus); // MODERADOR E ADM

routes.get('/podcasts', PodCast.index);
routes.post('/podcast', upload.single('file'), PodcastProcedure.store); // PODCASTER E ADM
routes.put('/podcast/:pod_id', PodcastProcedure.update); // PODCASTER, MODERADOR E ADM
routes.put('/podcastimg/:pod_id',upload.single('file'),PodCast.updatePodcastImg); // PODCASTER, MODERADOR E ADM
routes.put('/podcast/:pod_id/:pod_status', PodCast.updatePodcastStatus); // MODERADOR E ADM

routes.get('/podcasts/solicitacao', SolicitacaoCadastro.index); // MODERADOR E ADM
routes.put('/podcasts/solicitacao/:pod_id/:pod_permissao',SolicitacaoCadastro.update); // MODERADOR E ADM

//PESQUISA DE PODCAST
routes.get('/podcastctg/:pod_id', PodcastCategoria.indexCtgByPodcastID); // TODOS
routes.get('/pesquisar/:ctg_id', PodcastCategoria.indexPodcastByCtgID); //TODOS
routes.get('/pesquisar/nome/:ctg_id', PodcastCategoria.indexPodcastByCtgNome); //TODOS
routes.post('/podcastctg', PodcastCategoria.store); //TODOS

routes.get('/endereco', Endereco.index); //TODOS
routes.post('/endereco', Endereco.store); //TODOS

routes.get('/tag', Tag.index); //TODOS
routes.post('/tag', Tag.store); //TODOS
routes.put('/tag/:tag_id', Tag.updateTag); //ADM
routes.put('/tag/:tag_id/:tag_status', Tag.updateTagStatus); // ADM


routes.get('/getdate', (req, resp) => {
	return resp.json({ data: date(Date.now()).format });
});

module.exports = routes;
