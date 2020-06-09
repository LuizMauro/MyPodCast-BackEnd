const PodcastCategoria = require('../models/PodcastCategoria');
const Usuario = require('../models/User');
const Comentario = require('../models/Comentario');
const Categoria = require('../models/Categoria');
const Publicidade = require('../models/Publicidade');
const View = require('../models/View');
const Assinatura = require('../models/Assinatura');
const PodCast = require('../models/PodCast');
const path = require('path');
const pdf = require('html-pdf');
const ejs = require('ejs');

module.exports = {
	async index(req, res) {
		const {
			qtd_podcast,
			qtd_solicitacao,
			qtd_usuario,
			qtd_moderador,
			qtd_ouvinte,
			qtd_categoria,
			qtd_podcaster,
			qtd_comentario,
			qtd_premium,
			qtd_publicidade,
			totalview,
			viewweek,
			viewmonth,
			ass_qtd_total_total,
			ass_qtd_total_mensal,
			ass_qtd_total_anual,
			ass_qtd_mensal_total,
			ass_qtd_mensal_mensal,
			ass_qtd_mensal_anual,
			ass_qtd_anual_total,
			ass_qtd_anual_mensal,
			ass_qtd_anual_anual,
			ass_valor_total_total,
			ass_valor_total_anual,
			ass_valor_total_mensal,
			ass_valor_mensal_total,
			ass_valor_mensal_mensal,
			ass_valor_mensal_anual,
			ass_valor_anual_total,
			ass_valor_anual_mensal,
			ass_valor_anual_anual,
		} = req.body;

		const data = {
			qtd_podcast: qtd_podcast,
			qtd_solicitacao: qtd_solicitacao,
			qtd_usuario: qtd_usuario,
			qtd_moderador: qtd_moderador,
			qtd_ouvinte: qtd_ouvinte,
			qtd_categoria: qtd_categoria,
			qtd_podcaster: qtd_podcaster,
			qtd_comentario: qtd_comentario,
			qtd_premium: qtd_premium,
			qtd_publicidade: qtd_publicidade,
			totalview: totalview,
			viewweek: viewweek,
			viewmonth: viewmonth,
			ass_qtd_total_total: ass_qtd_total_total,
			ass_qtd_total_mensal: ass_qtd_total_mensal,
			ass_qtd_total_anual: ass_qtd_total_anual,
			ass_qtd_mensal_total: ass_qtd_mensal_total,
			ass_qtd_mensal_mensal: ass_qtd_mensal_mensal,
			ass_qtd_mensal_anual: ass_qtd_mensal_anual,
			ass_qtd_anual_total: ass_qtd_anual_total,
			ass_qtd_anual_mensal: ass_qtd_anual_mensal,
			ass_qtd_anual_anual: ass_qtd_anual_anual,
			ass_valor_total_total: ass_valor_total_total,
			ass_valor_total_anual: ass_valor_total_anual,
			ass_valor_total_mensal: ass_valor_total_mensal,
			ass_valor_mensal_total: ass_valor_mensal_total,
			ass_valor_mensal_mensal: ass_valor_mensal_mensal,
			ass_valor_mensal_anual: ass_valor_mensal_anual,
			ass_valor_anual_total: ass_valor_anual_total,
			ass_valor_anual_mensal: ass_valor_anual_mensal,
			ass_valor_anual_anual: ass_valor_anual_anual,
		};

		console.log('os dados sao',data);

		const filename = `relatorio-${Date.now()}.pdf`;

		ejs.renderFile(
			path.resolve(__dirname, '../', 'resources', 'pdf', 'relatorio.ejs'),
			{ data },
			(err, html) => {
				if (err) {
					console.log(err);
				} else {
					pdf
						.create(html, { data })
						.toFile(
							path.resolve(__dirname, '../', '../', 'tmp', 'pdfs', filename),
							(err, resp) => {
								if (err) {
									console.log('Erro');
								} else {
									console.log(resp);
								}
							}
						);
					return res.json(`/filepdf/${filename}`);
				}
			}
		);
	},
};
