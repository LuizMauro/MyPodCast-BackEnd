const PodcastCategoria = require('../models/PodcastCategoria');
const Usuario = require('../models/User');
const Comentario = require('../models/Comentario');
const Categoria = require('../models/Categoria');
const Publicidade = require('../models/Publicidade');
const View = require('../models/View');
const Assinatura = require('../models/Assinatura');
const PodCast = require('../models/PodCast');

const { getMonth } = require('date-fns');

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
		const qtd_publicidade = await Publicidade.findAll();

		return resp.json({
			qtd_podcast: qtd_podcast.length,
			qtd_usuario: qtd_usuario.length,
			qtd_moderador: qtd_moderador.length,
			qtd_categoria: qtd_categoria.length,
			qtd_podcaster: qtd_podcaster.length,
			qtd_comentario: qtd_comentario.length,
			qtd_premium: qtd_premium.length,
			qtd_publicidade: qtd_publicidade.length,
		});
	},

	async read(req, resp) {
		const { userId } = req;

		const qtd_podcast = await PodcastCategoria.findAllPodcast();
		const qtd_solicitacao = await PodCast.findPodcastSolicitacoes();
		const qtd_usuario = await Usuario.findCountAllUsers();
		const qtd_moderador = await Usuario.findAllMod();
		const qtd_ouvinte = await Usuario.findAllOuvinte();
		const qtd_categoria = await Categoria.buscaTodos();
		const qtd_comentario = await Comentario.findAllComments();
		const qtd_podcaster = await Usuario.findAllPodcaster();
		const qtd_publicidade = await Publicidade.findAll();
		const qtd_premium = await Usuario.findAllPodcasterPremium();
		const total_view = await View.countViewAll(1);
		const week_view = await View.countViewLastWeek(1);
		const month_view = await View.countViewLastMonth(1);
		const ass_total_total = await Assinatura.countTotalAll();
		const ass_total_mensal = await Assinatura.countTotalMensal();
		const ass_total_anual = await Assinatura.countTotalAnual();
		const ass_mensal_total = await Assinatura.countMensalAll();
		const ass_mensal_mensal = await Assinatura.countMensalMensal();
		const ass_mensal_anual = await Assinatura.countMensalAnual();
		const ass_anual_total = await Assinatura.countAnualAll();
		const ass_anual_mensal = await Assinatura.countAnualMensal();
		const ass_anual_anual = await Assinatura.countAnualAnual();

		return resp.json({
			qtd_podcast: qtd_podcast.length,
			qtd_solicitacao: qtd_solicitacao.length,
			qtd_usuario: qtd_usuario.length,
			qtd_moderador: qtd_moderador.length,
			qtd_ouvinte: qtd_ouvinte.length,
			qtd_categoria: qtd_categoria.length,
			qtd_podcaster: qtd_podcaster.length,
			qtd_comentario: qtd_comentario.length,
			qtd_premium: qtd_premium.length,
			qtd_publicidade: qtd_publicidade.length,
			totalview: total_view.qtd_viewtotal,
			viewweek: week_view.qtd_viewweek,
			viewmonth: month_view.qtd_viewmonth,
			ass_qtd_total_total: ass_total_total.qtd_total,
			ass_qtd_total_mensal: ass_total_mensal.qtd_mensal,
			ass_qtd_total_anual: ass_total_anual.qtd_anual,
			ass_qtd_mensal_total: ass_mensal_total.qtd,
			ass_qtd_mensal_mensal: ass_mensal_mensal.qtd,
			ass_qtd_mensal_anual: ass_mensal_anual.qtd,
			ass_qtd_anual_total: ass_anual_total.qtd,
			ass_qtd_anual_mensal: ass_anual_mensal.qtd,
			ass_qtd_anual_anual: ass_anual_anual.qtd,
			ass_valor_total_total: ass_total_total.valor_total
				? ass_total_total.valor_total
				: 0,
			ass_valor_total_anual: ass_total_anual.valor_anual
				? ass_total_anual.valor_anual
				: 0,
			ass_valor_total_mensal: ass_total_mensal.valor_mensal
				? ass_total_mensal.valor_mensal
				: 0,
			ass_valor_mensal_total: ass_mensal_total.valor
				? ass_mensal_total.valor
				: 0,
			ass_valor_mensal_mensal: ass_mensal_mensal.valor
				? ass_mensal_mensal.valor
				: 0,
			ass_valor_mensal_anual: ass_mensal_anual.valor
				? ass_mensal_anual.valor
				: 0,
			ass_valor_anual_total: ass_anual_total.valor ? ass_anual_total.valor : 0,
			ass_valor_anual_mensal: ass_anual_mensal.valor
				? ass_anual_mensal.valor
				: 0,
			ass_valor_anual_anual: ass_anual_anual.valor ? ass_anual_anual.valor : 0,
		});
	},

	async show(req, res) {
		const teste = await Assinatura.findAll();

		let Janeiro = [];
		let Fevereiro = [];
		let Marco = [];
		let Abril = [];
		let Maio = [];
		let Junho = [];
		let Julho = [];
		let Agosto = [];
		let Setembro = [];
		let Outubro = [];
		let Novembro = [];
		let Dezembro = [];
		let Soma0 = 0;
		let Soma1 = 0;
		let Soma2 = 0;
		let Soma3 = 0;
		let Soma4 = 0;
		let Soma5 = 0;
		let Soma6 = 0;
		let Soma7 = 0;
		let Soma8 = 0;
		let Soma9 = 0;
		let Soma10 = 0;
		let Soma11 = 0;

		teste.map((item) => {
			console.log();
			const mes = getMonth(item.ass_datainicio);

			if (mes === 0) {
				Janeiro.push(item.ass_id);
				Soma0 += item.ass_preco;
			} else if (mes === 1) {
				Fevereiro.push(item.ass_id);
				Soma1 += item.ass_preco;
			} else if (mes === 2) {
				Marco.push(item.ass_id);
				Soma2 += item.ass_preco;
			} else if (mes === 3) {
				Abril.push(item.ass_id);
				Soma3 += item.ass_preco;
			} else if (mes === 4) {
				Maio.push(item.ass_id);
				Soma4 += item.ass_preco;
			} else if (mes === 5) {
				Junho.push(item.ass_id);
				Soma5 += item.ass_preco;
			} else if (mes === 6) {
				Julho.push(item.ass_id);
				Soma6 += item.ass_preco;
			} else if (mes === 7) {
				Agosto.push(item.ass_id);
				Soma7 += item.ass_preco;
			} else if (mes === 8) {
				Setembro.push(item.ass_id);
				Soma8 += item.ass_preco;
			} else if (mes === 9) {
				Outubro.push(item.ass_id);
				Soma9 += item.ass_preco;
			} else if (mes === 10) {
				Novembro.push(item.ass_id);
				Soma10 += item.ass_preco;
			} else if (mes === 11) {
				Dezembro.push(item.ass_id);
				Soma11 += item.ass_preco;
			}
		});

		Janeiro.push({ valor_total: Soma0 });
		Fevereiro.push({ valor_total: Soma1 });
		Marco.push({ valor_total: Soma2 });
		Abril.push({ valor_total: Soma3 });
		Maio.push({ valor_total: Soma4 });
		Junho.push({ valor_total: Soma5 });
		Julho.push({ valor_total: Soma6 });
		Agosto.push({ valor_total: Soma7 });
		Setembro.push({ valor_total: Soma8 });
		Outubro.push({ valor_total: Soma9 });
		Novembro.push({ valor_total: Soma10 });
		Dezembro.push({ valor_total: Soma11 });

		res.json({
			Janeiro,
			Fevereiro,
			Marco,
			Abril,
			Maio,
			Junho,
			Julho,
			Agosto,
			Setembro,
			Outubro,
			Novembro,
			Dezembro,
		});
	},

	
	async showView(req, res) {
		const teste = await View.findAll();

		let Janeiro = [];
		let Fevereiro = [];
		let Marco = [];
		let Abril = [];
		let Maio = [];
		let Junho = [];
		let Julho = [];
		let Agosto = [];
		let Setembro = [];
		let Outubro = [];
		let Novembro = [];
		let Dezembro = [];

		teste.map((item) => {
			console.log();
			const mes = getMonth(item.vie_data);

			if (mes === 0) {
				Janeiro.push(item.vie_id);
			} else if (mes === 1) {
				Fevereiro.push(item.vie_id);
			} else if (mes === 2) {
				Marco.push(item.vie_id);
			} else if (mes === 3) {
				Abril.push(item.vie_id);
			} else if (mes === 4) {
				Maio.push(item.vie_id);
			} else if (mes === 5) {
				Junho.push(item.vie_id);
			} else if (mes === 6) {
				Julho.push(item.vie_id);
			} else if (mes === 7) {
				Agosto.push(item.vie_id);
			} else if (mes === 8) {
				Setembro.push(item.vie_id);
			} else if (mes === 9) {
				Outubro.push(item.vie_id);
			} else if (mes === 10) {
				Novembro.push(item.vie_id);
			} else if (mes === 11) {
				Dezembro.push(item.vie_id);
			}
		});

		res.json({
			Janeiro,
			Fevereiro,
			Marco,
			Abril,
			Maio,
			Junho,
			Julho,
			Agosto,
			Setembro,
			Outubro,
			Novembro,
			Dezembro,
		});
	},
};
