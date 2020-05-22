const PodcastCategoria = require('../models/PodcastCategoria');

module.exports = {
	//SELECT
	async indexCtgByPodcastID(req, resp) {
		const { pod_id } = req.params;

		const podcast_ctg = await PodcastCategoria.findCtgByPodcastID(pod_id);

		return resp.json(podcast_ctg);
	},

	async indexPodcastByID(req, resp) {
		const { pod_id } = req.params;
		console.log(pod_id);

		const podcast = await PodcastCategoria.findPodcastsByID(pod_id);

		return resp.json(podcast);
	},

	async indexAllPodcast(req, resp) {
		const podcast_ctg = await PodcastCategoria.findAllPodcast();

		return resp.json(podcast_ctg);
	},

	async readUserPodcasts(req, resp) {
		const {userId} = req;
		console.log('id do usuario',userId)

		const podcast_ctg = await PodcastCategoria.findUserPodcasts(userId);

		return resp.json(podcast_ctg);
	},

	async readUserPodcastsAllow(req, resp) {
		const {userId} = req;
		console.log('id do usuario',userId)

		const podcast_ctg = await PodcastCategoria.findUserPodcastsAllow(userId);

		return resp.json(podcast_ctg);
	},

	async indexPodcastByCtgID(req, resp) {
		const { ctg_id } = req.params;

		const podcast_ctg = await PodcastCategoria.findPodcastsByCtgID(ctg_id);

		//ids pega todos ids de podcast que contenham a categoria escolhida e depois busca por tds suas outras categorias
		const ids = podcast_ctg.map((pod) => pod.pod_id);
		ids.map((pod) => console.log('resp', pod));

		const resultado = await PodcastCategoria.findCtgById([ids]);

		return resp.json(resultado);
	},

	async indexPodcastByCtgNome(req, resp) {
		const { nome, ctg_id } = req.params;

		const podcast_ctg = await PodcastCategoria.findPodcastsByNomeID(ctg_id, nome);

		//ids pega todos ids de podcast que contenham a categoria escolhida e depois busca por tds suas outras categorias
		const ids = podcast_ctg.map((pod) => pod.pod_id);
		ids.map((pod) => console.log('resp', pod));

		const resultado = await PodcastCategoria.findCtgById([ids]);

		return resp.json(resultado);
	},

	async indexPodcastByNome(req, resp) {
		const { nome } = req.params;

		const podcast_ctg = await PodcastCategoria.findPodcastsByNome(nome);

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
