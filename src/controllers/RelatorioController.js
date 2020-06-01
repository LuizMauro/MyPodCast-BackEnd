const PodcastCategoria = require('../models/PodcastCategoria');
const Usuario = require('../models/User');
const Comentario = require('../models/Comentario');
const Categoria = require('../models/Categoria');
const View = require('../models/View');
const Assinatura = require('../models/Assinatura');

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

	async read(req, resp) {
		const { userId } = req;

		const qtd_podcast = await PodcastCategoria.findAllPodcast();
		const qtd_usuario = await Usuario.findAllUsers();
		const qtd_moderador = await Usuario.findAllMod();
		const qtd_categoria = await Categoria.buscaTodos();
		const qtd_comentario = await Comentario.findAllComments();
		const qtd_podcaster = await Usuario.findAllPodcaster();
		const qtd_premium = await Usuario.findAllPodcasterPremium();
		const total_view = await View.countViewAll(1);
		const week_view = await View.countViewLastWeek(1);
		const month_view = await View.countViewLastMonth(1);
		const ass_total = await Assinatura.countAll();
		const ass_mensal = await Assinatura.countMensal();
		const ass_anual = await Assinatura.countAnual();

		return resp.json({
			qtd_podcast: qtd_podcast.length,
			qtd_usuario: qtd_usuario.length,
			qtd_moderador: qtd_moderador.length,
			qtd_categoria: qtd_categoria.length,
			qtd_podcaster: qtd_podcaster.length,
			qtd_comentario: qtd_comentario.length,
			qtd_premium: qtd_premium.length,
			totalview: total_view.qtd_viewtotal,
			viewweek: week_view.qtd_viewweek,
			viewmonth: month_view.qtd_viewmonth,
			ass_total: ass_total.qtd_total,
			ass_valor_total: ass_total.valor_total,
			ass_mensal: ass_mensal.qtd_mensal,
			ass_valor_mensal: ass_mensal.valor_mensal,
			ass_anual: ass_anual.qtd_anual,
			ass_valor_anual: ass_anual.valor_anual,
		});
	},
};
