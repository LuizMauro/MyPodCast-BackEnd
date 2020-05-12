const PodcastCategoria = require('../models/PodcastCategoria');
const Usuario = require('../models/User');
const Comentario = require('../models/Comentario');
const Categoria = require('../models/Categoria');

module.exports = {
	async index(req, resp) {
		const { userId } = req;

		const qtd_podcast = await PodcastCategoria.findAllPodcast();
		const qtd_usuario = await Usuario.findAllUsers();
		const qtd_moderador = await Usuario.findAllMod();
		const qtd_categoria = await Categoria.buscaTodos();
		const qtd_comentario = await Comentario.findAllComments();
		const qtd_podcaster = await Usuario.findAllPodcaster();
		const qtd_premium = await Usuario.findAllPodcasterPremium();

		return resp.json({
			qtd_podcast: qtd_podcast.length,
			qtd_usuario: qtd_usuario.length,
			qtd_moderador: qtd_moderador.length,
			qtd_categoria: qtd_categoria.length,
			qtd_podcaster: qtd_podcaster.length,
			qtd_comentario: qtd_comentario.length,
			qtd_premium: qtd_premium.length,
		});
	},
};
