const PodcastCategoria = require('../models/PodcastCategoria');

module.exports = {
	async index(req, resp) {
		const podcast_ctg = await PodcastCategoria.findAllPodcastCategoria();

		return resp.json(podcast_ctg);
	},

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
