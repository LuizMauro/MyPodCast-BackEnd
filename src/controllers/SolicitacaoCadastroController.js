const PodCast = require('../models/PodCast');

module.exports = {
	async index(req, resp) {
		const podcasts = await PodCast.findPodcastSolicitacoes();

		return resp.json(podcasts);
	},

	async update(req, res) {
		const { pod_permissao, pod_id } = req.params;

		const podcastUpdate = await PodCast.updatePodcastAprovar(
			pod_permissao,
			pod_id
		);

		if (!podcastUpdate) {
			return res.json({
				mensagem: ' não foi possivel aprovar/desaprovar!',
				_id: podcastUpdate
			});
		}
		return res.json({
			mensagem: 'Podcast aprovado/desaprovado!',
			_id: podcastUpdate
		});
	}
};
