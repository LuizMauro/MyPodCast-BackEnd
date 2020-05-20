const Feedback = require('../models/Feedback');

module.exports = {
	async read(req, resp) {
		const { pod_id } = req.params;

		const favs = await Feedback.findCountFav(pod_id);
        const acompanhando = await Feedback.findCountAcompanhando(pod_id);
        const media = await Feedback.findNotaMedia(pod_id)

		return resp.json({
			qtd_fav: favs.qtd_fav,
            qtd_acompanhando: acompanhando.qtd_acompanhando,
            media: media.pod_media
		});
	},
};
