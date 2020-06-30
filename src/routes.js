const express = require('express');

//middleware
const upload = require('./utils/multer');
const authMiddleware = require('./middlewares/auth');
const authMiddlewareAdm = require('./middlewares/authAdm');
const authMiddlewareMod = require('./middlewares/authMod');
const authMiddlewareStaff = require('./middlewares/authStaff');
const authMiddlewarePodcaster = require('./middlewares/authPodcaster');
const authMiddlewarePremium = require('./middlewares/authPremium');
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
const DislikeController = require('./controllers/DislikeController');
const PodcasterController = require('./controllers/PodcasterController');
const RelatorioController = require('./controllers/RelatorioController');
const PublicidadeController = require('./controllers/PublicidadeController');
const ForgetPasswordController = require('./controllers/ForgetPasswordController');
const PodViewController = require('./controllers/PodViewController');
const ViewController = require('./controllers/ViewController');
const EstatisticaPremiumController = require('./controllers/EstatisticaPremiumController');
const PlanoController = require('./controllers/PlanoController');
const AssinaturaController = require('./controllers/AssinaturaController');
const PaymentController = require('./controllers/PaymentController');
const GeneratePDF = require('./controllers/GeneratePDF')
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
const changePasswordValidate = require('./validators/changePasswordStore')
	.validation;
const PublicidadeStoreValidate = require('./validators/PublicidadeStore')
	.validation;
//final validators

const { date } = require('./utils/Date');

const routes = express.Router();
//ROTA TESTES
routes.get('/getdate', (req, resp) => {
	return resp.json({ data: date(Date.now()).currentDateTime });
});

routes.post('/pdf', GeneratePDF.index);

routes.get('/hoursbetween', (req, resp) => {
	// ano, mes, dia, hora, minuto

	//data atual, data passa
	const hours = dateFNS.differenceInHours(
		new Date(2020, 5, 12, 20, 41),
		new Date(2020, 5, 10, 20, 41)
	);
	return resp.json({ hours: hours });
});
//ROTA TESTES

//ROTA EM TESTE
const calculateOrderAmount = items =>{
	const amount = items.price;
	console.log(amount);
	 return amount;
}	

routes.post("/create-payment-intent",PaymentController.create);
routes.get("/getpay/:id",PaymentController.index)
routes.post("/sendmail",PaymentController.sendEmail)

//GERAL
routes.post('/sessions', SessionController.store);
routes.get('/categoria', Categoria.index);
routes.get('/podcasts', PodCast.index);
routes.get('/ultimospods', PodCast.ultimosPods);
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
//routes.post('/podcastctg', PodcastCategoria.store);
routes.get('/endereco', Endereco.index);
//routes.post('/endereco', Endereco.store);
routes.get('/tag', Tag.index);
routes.post('/users', UserStoreValidate, UserController.store);
routes.post('/forgot_password', ForgetPasswordController.store);
routes.post(
	'/reset_password',
	changePasswordValidate,
	ForgetPasswordController.update
);

routes.post('/podview/:pod_id/:vie_ip', PodViewController.create);
routes.post('/view/:vie_ip/', ViewController.create);

routes.get('/topweek', EstatisticaPremiumController.getTopWeek);
//FIM GERAL

//USUÁRIO LOGADO
routes.put('/edituser/', authMiddleware, UserController.updateUserPerfil);
routes.put('/usersenha/', authMiddleware, UserController.updateUserSenha);
routes.get('/user', authMiddleware, UserController.read);

routes.post('/podview/:pod_id', authMiddleware, PodViewController.store);

routes.put('/virarpodcaster', authMiddleware, PodcasterController.update);
routes.put('/refreshtoken', authMiddleware, SessionController.refreshToken);

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
routes.post('/dislike/:cmt_id', authMiddleware, DislikeController.store);
routes.put(
	'/likestatus/:lik_id/:lik_status',
	authMiddleware,
	LikeController.updateStatus
);
routes.put(
	'/mudarlike/:lik_id/:lik_tipo',
	authMiddleware,
	LikeController.updateTipo
);
routes.get('/likeuser/:cmt_id', authMiddleware, LikeController.read);
routes.get('/qtdlikes/:cmt_id', LikeController.index);

//FIM USUARIO LOGADO

//PODCASTER
routes.get(
	'/userpodcasts',
	authMiddlewarePodcaster,
	PodcastCategoria.readUserPodcasts
);
routes.get(
	'/userpodcastsAllow',
	authMiddlewarePodcaster,
	PodcastCategoria.readUserPodcastsAllow
);
routes.put(
	'/podcaster/podcast/:pod_id/:pod_status',
	authMiddlewarePodcaster,
	PodCast.updatePodcastStatus
);
routes.post(
	'/podcaster/criarpodcast',
	authMiddlewarePodcaster,
	upload.single('file'),
	PodcastProcedure.store
);
routes.put(
	'/podcaster/editarpodcast/:pod_id',
	authMiddlewarePodcaster,
	upload.single('file'),
	PodcastProcedureStoreValidate,
	PodcastProcedure.update
);
routes.put(
	'/podcaster/podcastimg/:pod_id',
	authMiddlewarePodcaster,
	upload.single('file'),
	PodCast.updatePodcastImg
);

//ASSINATURA
routes.post(
	'/assinar/:pln_id/:fpg_id',
	authMiddlewarePodcaster,
	AssinaturaController.create
);

routes.put('/virarpremium', authMiddleware, PodcasterController.updatePremium);
//FIM PODCASTER

// PREMIUM
routes.get(
	'/estatisticaspremium/:pod_id',
	authMiddlewarePremium,
	EstatisticaPremiumController.read
);
routes.get(
	'/premiumgrafico/:pod_id',
	authMiddlewarePremium,
	EstatisticaPremiumController.showView
);

routes.get('/assinatura', authMiddlewarePremium, AssinaturaController.read);
routes.put(
	'/editarassinatura/:ass_id/:pln_id/:fpg_id',
	authMiddlewarePremium,
	AssinaturaController.edit
);
routes.put(
	'/assinatura',
	authMiddlewarePremium,
	AssinaturaController.update
);
//FIM PREMIUM

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
routes.put(
	'/podcast/:pod_id/:pod_status',
	authMiddlewareStaff,
	PodCast.updatePodcastStatus
);
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

routes.post(
	'/publicidade',
	authMiddlewareStaff,
	upload.single('file'),
	PublicidadeStoreValidate,
	PublicidadeController.store
);
routes.put(
	'/publicidade/:pub_id',
	authMiddlewareStaff,
	upload.single('file'),
	PublicidadeStoreValidate,
	PublicidadeController.update
);
routes.put(
	'/removerpublicidade/:pub_id',
	authMiddlewareStaff,
	PublicidadeController.delete
);
routes.get('/publicidades', authMiddlewareStaff, PublicidadeController.index);
routes.get('/pubs', PublicidadeController.show);

//APENAS ADM
routes.post(
	'/adm/criarpodcast',
	[authMiddlewareAdm, upload.single('file')],
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
routes.get('/dash/home', authMiddlewareAdm, RelatorioController.index);
routes.get('/relatorio',authMiddlewareAdm, RelatorioController.read);
routes.get('/grafico',authMiddlewareAdm, RelatorioController.show);
routes.get('/graficoview',authMiddlewareAdm, RelatorioController.showView);

routes.put('/plano/:pln_id', authMiddlewareAdm, PlanoController.edit);
routes.get('/planos', authMiddlewareAdm, PlanoController.index);

routes.get('/assinaturas', authMiddlewareAdm, AssinaturaController.index);
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

//FIM TESTES

module.exports = routes;
