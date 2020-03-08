const PodcastCategoria = require('../models/PodcastCategoria');

module.exports = {
	//SELECT
	async indexCtgByPodcastID(req, resp) {
		const { pod_id } = req.params;

		const podcast_ctg = await PodcastCategoria.findCtgByPodcastID(pod_id);

		return resp.json(podcast_ctg);
	},

	async indexPodcastByCtgID(req, resp) {
		const { ctg_id } = req.params;

		const podcast_ctg = await PodcastCategoria.findPodcastsByCtgID(ctg_id);

		return resp.json(podcast_ctg);
	},

	async indexPodcastByCtgNome(req, resp) {
		const { ctg_id } = req.params;
		const { pod_nome } = req.body;

		const podcast_ctg = await PodcastCategoria.findPodcastsByCtgNome(
			ctg_id,
			pod_nome
		);

		return resp.json(podcast_ctg);
	},

	async indexPodcastByNome(req, resp) {
		const { pod_nome } = req.body;

		const podcast_ctg = await PodcastCategoria.findPodcastsByNome(
			pod_nome
		);

		return resp.json(podcast_ctg);
	},

	//CREATE
	async store(req, resp) {
		const { pod_id, ctg_id } = req.body;

		//regras de negocio

		//final regras de negocio

		const data = [pod_id, ctg_id];
		const id = await PodcastCategoria.createPodcastCategoria(data);

		if (!id) {
			return resp.json({ mensagem: 'Erro!', _id: id });
		}
		return resp.json({ mensagem: 'criado com sucesso!', _id: id });
	}
};
