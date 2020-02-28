const express = require('express');

//middleware
const upload = require('./utils/multer');
const authMiddleware  = require('./middlewares/auth');
const authMiddlewareAdm = require('./middlewares/authAdm');
const authMiddlewareMod = require('./middlewares/authMod');
const authMiddlewarePodcaster = require('./middlewares/authPodcaster');
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

//GERAL
routes.post('/sessions', SessionController.store);

routes.get('/categoria', Categoria.index); 
routes.get('/podcasts', PodCast.index);
routes.get('/podcastctg/:pod_id', PodcastCategoria.indexCtgByPodcastID); 
routes.get('/pesquisar/:ctg_id', PodcastCategoria.indexPodcastByCtgID); 
routes.get('/pesquisar/nome/:ctg_id', PodcastCategoria.indexPodcastByCtgNome); 
routes.post('/podcastctg', PodcastCategoria.store); 
routes.get('/endereco', Endereco.index); 
routes.post('/endereco', Endereco.store); 
routes.get('/tag', Tag.index); 
routes.post('/tag', Tag.store); 
routes.put('/edituser/', authMiddleware, UserController.updateUserPerfil);
routes.put('/usersenha/', authMiddleware ,UserController.updateUserSenha);

routes.get('/users', UserController.index);
routes.get('/users/:usu_id', UserController.read);
routes.post('/users', UserStoreValidate ,UserController.store);
//FIM GERAL

//PODCASTER
routes.post('/podcast', upload.single('file'), PodcastProcedure.store); 
routes.put('/podcast/:pod_id', PodcastProcedure.update);
routes.put('/podcastimg/:pod_id',upload.single('file'),PodCast.updatePodcastImg); 
//FIM PODCASTER

//ADM
routes.post('/adm/categoria', Categoria.store); 
routes.put('/adm/categoria/:ctg_id', Categoria.updateCtgDescricao); 
routes.post('/adm/podcast', upload.single('file'), PodcastProcedure.store); 
routes.put('/adm/podcast/:pod_id', PodcastProcedure.update);
routes.put('/adm/podcastimg/:pod_id',upload.single('file'),PodCast.updatePodcastImg); 
routes.put('/adm/podcast/:pod_id/:pod_status', PodCast.updatePodcastStatus);
routes.get('/adm/podcasts/solicitacao', SolicitacaoCadastro.index); 
routes.put('/adm/podcasts/solicitacao/:pod_id/:pod_permissao',SolicitacaoCadastro.update); 
routes.put('/adm/tag/:tag_id', Tag.updateTag);
routes.put('/adm/tag/:tag_id/:tag_status', Tag.updateTagStatus); 
routes.put('/adm/users/:usu_id/:usu_status', UserController.updateUserStatus);
routes.put('/adm/users/tipo/:usu_id/:tus_id', UserController.updateUsuarioTipo);
//FIM ADM

//MOD
routes.post('/mod/categoria', Categoria.store); 
routes.put('/mod/categoria/:ctg_id', Categoria.updateCtgDescricao); 
routes.put('/mod/podcast/:pod_id', PodcastProcedure.update);
routes.put('/mod/podcastimg/:pod_id',upload.single('file'),PodCast.updatePodcastImg); 
routes.put('/mod/podcast/:pod_id/:pod_status', PodCast.updatePodcastStatus);
routes.get('/mod/podcasts/solicitacao', SolicitacaoCadastro.index); 
routes.put('/mod/podcasts/solicitacao/:pod_id/:pod_permissao',SolicitacaoCadastro.update); 
routes.put('/mod/users/:usu_id/:usu_status', UserController.updateUserStatus);
routes.put('/mod/users/tipo/:usu_id/:tus_id', UserController.updateUsuarioTipo);
//FIM MOD


//TESTES
routes.get('/adm/', authMiddlewareAdm, (req, resp) =>{
	return resp.json({msg: "LOGADO COMO ADM"})
})


routes.get('/getdate', (req, resp) => {
	return resp.json({ data: date(Date.now()).format });
});
//FIM TESTES



module.exports = routes;