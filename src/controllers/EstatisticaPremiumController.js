const Feedback = require('../models/Feedback');
const View = require('../models/View');
const { getMonth } = require('date-fns');

module.exports = {
	async read(req, resp) {
		const { pod_id } = req.params;

		const favs = await Feedback.findCountFav(pod_id);
		const acompanhando = await Feedback.findCountAcompanhando(pod_id);
		const acompanhar = await Feedback.findCountAcompanhar(pod_id);
		const media = await Feedback.findNotaMedia(pod_id);
		const total_view = await View.countAll(pod_id, 0);
		const week_view = await View.countLastWeek(pod_id, 0);
		const month_view = await View.countLastMonth(pod_id, 0);
		const topweek = await View.countTopWeek();

		return resp.json({
			qtd_fav: favs.qtd_fav,
			qtd_acompanhando: acompanhando.qtd_acompanhando,
			qtd_acompanhar: acompanhar.qtd_acompanhar,
			media: media.pod_media,
			totalview: total_view.qtd_viewtotal,
			totalweek: week_view.qtd_viewweek,
			totalmonth: month_view.qtd_viewmonth,
			topweek: topweek,
		});
	},

	async getTopWeek(req, resp){
		const topWeek = await View.countTopWeek();

		return resp.json(topWeek)

	},

	async showView(req, res) {
		const { pod_id } = req.params;

		const teste = await View.find(pod_id);

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
