const PodcastCategoria = require('../models/PodcastCategoria');

module.exports = {
	//SELECT
	async indexCtgByPodcastID(req, resp) {
		const { pod_id } = req.params;

		const podcast_ctg = await PodcastCategoria.findCtgByPodcastID(pod_id);

		return resp.json(podcast_ctg);
	},

	async indexPodcastByID(req, resp){

		const { pod_id } = req.params;
		console.log(pod_id);

		const podcast = await PodcastCategoria.findPodcastsByID(pod_id);

		return resp.json(podcast);

	},

	async indexAllPodcast(req, resp) {

		const podcast_ctg = await PodcastCategoria.findAllPodcast();

		return resp.json(podcast_ctg);
	},

	async indexPodcastByCtgID(req, resp) {
		const { ctg_id } = req.params;

		const podcast_ctg = await PodcastCategoria.findPodcastsByCtgID(ctg_id);

		return resp.json(podcast_ctg);
	},

	async indexPodcastByCtgNome(req, resp) {
		const { nome, ctg_id } = req.params;
	
		const podcast_ctg = await PodcastCategoria.findPodcastsByCtgNome(
			ctg_id,
			nome
		);
		
		return resp.json(podcast_ctg);
	},

	async indexPodcastByNome(req, resp) {
		const { nome } = req.params;

		const podcast_ctg = await PodcastCategoria.findPodcastsByNome(
			nome
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
