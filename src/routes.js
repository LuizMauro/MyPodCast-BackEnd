const express = require('express');

//middleware
const upload = require('./utils/multer');
const authMiddleware = require('./middlewares/auth');
const authMiddlewareAdm = require('./middlewares/authAdm');
const authMiddlewareMod = require('./middlewares/authMod');
const authMiddlewareStaff = require('./middlewares/authStaff');
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
const TipoFeedbackController = require('./controllers/TipoFeedbackController');
const FavoritarController = require('./controllers/FavoritarController');
const AcompanhandoController = require('./controllers/AcompanhandoController');
const AcompanharController = require('./controllers/AcompanharController');
const AvaliarController = require('./controllers/AvaliarController');
const SessionController = require('./controllers/SessionController');
const ComentarioController = require('./controllers/ComentarioController');
const LikeController = require('./controllers/LikeController');
//final chamando os controllers

//chamndo os validators
const UserStoreValidate = require('./validators/UserStore').validation;
const PodcastProcedureStoreValidate = require('./validators/PodcastProcedureStore')
	.validation;
const TagStoreValidate = require('./validators/TagStore').validation;
const CategoriaStoreValidate = require('./validators/CategoriaStore')
	.validation;
const ComentarioStoreValidate = require('./validators/ComentarioStore')
	.validation;
//final validators

const { date } = require('./utils/Date');

const routes = express.Router();

//GERAL
routes.post('/sessions', SessionController.store);
routes.get('/categoria', Categoria.index);
routes.get('/podcasts', PodCast.index);
routes.get('/allpodcasts', PodcastCategoria.indexAllPodcast);
routes.get('/podcastctg/:pod_id', PodcastCategoria.indexCtgByPodcastID);

routes.get('/podcast/:pod_id', PodcastCategoria.indexPodcastByID);

routes.get('/podcasts', PodCast.index);

routes.get('/pesquisar/:ctg_id', PodcastCategoria.indexPodcastByCtgID);
routes.get(
	'/pesquisar/nome/:ctg_id/:nome',
	PodcastCategoria.indexPodcastByCtgNome
);

routes.get('/pesquisarnome/:nome', PodcastCategoria.indexPodcastByNome);
//routes.post('/podcastctg', PodcastCategoria.store);
routes.get('/endereco', Endereco.index);
//routes.post('/endereco', Endereco.store);
routes.get('/tag', Tag.index);
routes.post('/users', UserStoreValidate, UserController.store);
//FIM GERAL

//USUÁRIO LOGADO
routes.put('/edituser/', authMiddleware, UserController.updateUserPerfil);
routes.put('/usersenha/', authMiddleware, UserController.updateUserSenha);
routes.get('/user', authMiddleware, UserController.read);

//FAVORITO
routes.post('/:pod_id/favoritar', authMiddleware, FavoritarController.store);
routes.get(
	'/findfavorito/:pod_id',
	authMiddleware,
	FavoritarController.indexFindFavorito
);
routes.put(
	'/profile/favoritar/:pod_id',
	authMiddleware,
	FavoritarController.update
);

//CHECA FAVORITO/PODCASTS MARCADOS
routes.get('/feedbacks', authMiddleware, FavoritarController.index);
routes.get('/profile', authMiddleware, FavoritarController.read);

//ACOMPANHANDO
routes.post(
	'/:pod_id/acompanhando',
	authMiddleware,
	AcompanhandoController.store
);
routes.post(
	'/:pod_id/acompanhar',
	authMiddleware,
	AcompanhandoController.store
);
routes.put(
	'/acompanhando/:pod_id/:fbk_status',
	authMiddleware,
	AcompanhandoController.update
);
routes.get(
	'/acompanhando/:pod_id',
	authMiddleware,
	AcompanhandoController.indexFindAcompanhando
);

//AVALIAR
routes.post(
	'/:pod_id/avaliar/:fbk_valor',
	authMiddleware,
	AvaliarController.store
);
routes.put(
	'/:pod_id/avaliar/:fbk_valor/:fbk_status',
	authMiddleware,
	AvaliarController.update
);
routes.get('/:pod_id/medianota', AvaliarController.read);
routes.get('/:pod_id/avaliar', authMiddleware, AvaliarController.index);

//COMENTARIOS
routes.post(
	'/comentar/:pod_id/:tag_id',
	authMiddleware,
	ComentarioStoreValidate,
	ComentarioController.store
);
routes.post(
	'/comentar/:pod_id/:tag_id/:id_comentario_pai',
	authMiddleware,
	ComentarioStoreValidate,
	ComentarioController.store
);
routes.put(
	'/editarcomentario/:pod_id/:cmt_id',
	authMiddleware,
	ComentarioStoreValidate,
	ComentarioController.updateComentario
);
routes.put(
	'/deletarcomentario/:pod_id/:cmt_id',
	authMiddleware,
	ComentarioController.delete
);
routes.get('/allcomentarios/:pod_id', ComentarioController.index);
routes.get('/comentario/:pod_id', authMiddleware, ComentarioController.index);
routes.get('/allcomentarios/:pod_id/:tag_id', ComentarioController.indexTag);

//LIKE DISLIKE EM COMENTÁRIO
routes.post('/like/:cmt_id', authMiddleware, LikeController.store);
routes.put(
	'/tirarlike/:lik_id/:lik_status',
	authMiddleware,
	LikeController.updateStatus
);
routes.put(
	'/mudarlike/:lik_id/:lik_tipo',
	authMiddleware,
	LikeController.updateTipo
);

//FIM USUARIO LOGADO

//PODCASTER
routes.post(
	'/podcaster/criarpodcast',
	authMiddlewarePodcaster,
	//PodcastStoreValidate,
	upload.single('file'),
	PodcastProcedure.store
);
routes.put(
	'/podcast/editarpodcast/:pod_id',
	authMiddlewarePodcaster,
	PodcastProcedureStoreValidate,
	PodcastProcedure.update
);
routes.put(
	'/podcaster/podcastimg/:pod_id',
	authMiddlewarePodcaster,
	upload.single('file'),
	PodCast.updatePodcastImg
);
//FIM PODCASTER

//ADM E MODERADOR (STAFF)

routes.post(
	'/categoria',
	authMiddlewareStaff,
	CategoriaStoreValidate,
	Categoria.store
);
routes.put(
	'/categoria/:ctg_id',
	authMiddlewareStaff,
	CategoriaStoreValidate,
	Categoria.updateCtgDescricao
);
routes.put('/podcast/:pod_id/:pod_status', PodCast.updatePodcastStatus);
routes.get(
	'/podcasts/solicitacao',
	authMiddlewareStaff,
	SolicitacaoCadastro.index
);
routes.put(
	'/podcasts/solicitacao/:pod_id/:pod_permissao',
	authMiddlewareStaff,
	SolicitacaoCadastro.update
);

routes.put(
	'/users/:usu_id/:usu_status',
	authMiddlewareStaff,
	UserController.updateUserStatus
);

routes.get('/users', authMiddlewareStaff, UserController.indexAllUsers);

//APENAS ADM
routes.post(
	'/adm/criarpodcast',
	authMiddlewareAdm,
	upload.single('file'),
	PodcastProcedureStoreValidate,
	PodcastProcedure.store
);
routes.put(
	'/adm/editarpodcast/:pod_id',
	authMiddlewareAdm,
	upload.single('file'),
	PodcastProcedureStoreValidate,
	PodcastProcedure.update
);
routes.put(
	'/adm/podcastimg/:pod_id',
	authMiddlewareAdm,
	upload.single('file'),
	PodCast.updatePodcastImg
);

routes.post('/adm/tag', authMiddlewareAdm, TagStoreValidate, Tag.store);

routes.put(
	'/adm/tag/:tag_id',
	authMiddlewareAdm,
	TagStoreValidate,
	Tag.updateTag
);
routes.put(
	'/adm/tag/:tag_id/:tag_status',
	authMiddlewareAdm,
	Tag.updateTagStatus
);

routes.put(
	'/adm/users/tipo/:usu_id/:tus_id',
	authMiddlewareAdm,
	UserController.updateUsuarioTipo
);
routes.get('/adm/modusers', authMiddlewareAdm, UserController.indexAllModUser);
routes.get('/adm/user', authMiddlewareAdm, UserController.read);
//FIM APENAS ADM

// APENAS MOD
routes.put('/mod/podcast/:pod_id', authMiddlewareMod, PodcastProcedure.update);
routes.put(
	'/mod/podcastimg/:pod_id',
	authMiddlewareMod,
	upload.single('file'),
	PodCast.updatePodcastImg
);
// FIM APENAS MOD

//TESTES
routes.get('/adm/', authMiddlewareAdm, (req, resp) => {
	return resp.json({ msg: 'LOGADO COMO ADM' });
});

routes.get('/getdate', (req, resp) => {
	return resp.json({ data: date(Date.now()).format });
});
//FIM TESTES

module.exports = routes;
