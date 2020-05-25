const Feedback = require('../models/Feedback');
const View = require('../models/View')

module.exports = {
	async read(req, resp) {
		const { pod_id } = req.params;

		const favs = await Feedback.findCountFav(pod_id);
        const acompanhando = await Feedback.findCountAcompanhando(pod_id);
        const acompanhar = await Feedback.findCountAcompanhar(pod_id)
		const media = await Feedback.findNotaMedia(pod_id)
		const total_view = await View.countAll(pod_id,0)
		const week_view = await View.countLastWeek(pod_id,0)
		const month_view = await View.countLastMonth(pod_id,0)
		const topweek = await View.countTopWeek();

		return resp.json({
			qtd_fav: favs.qtd_fav,
			qtd_acompanhando: acompanhando.qtd_acompanhando,
			qtd_acompanhar: acompanhar.qtd_acompanhar,
			media: media.pod_media,
			totalview: total_view.qtd_viewtotal,
			totalweek: week_view.qtd_viewweek,
			totalmonth: month_view.qtd_viewmonth,
			topweek: topweek
		});
	},
};
