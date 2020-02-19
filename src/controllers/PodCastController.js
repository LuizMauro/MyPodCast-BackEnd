const PodCast = require('../models/PodCast');

module.exports = {
	async index(req, resp) {
		const podcasts = await PodCast.buscaTodos();

		return resp.json(podcasts);
	},

	async store(req, resp) {
		const {
			nome,
			descricao,
			criador,
			anocriacao,
			duracao,
			status,
			permissao,
			destaque,
			usu_id
		} = req.body;

		//regras de negocio

		//final regras de negocio

		const data = [
			nome,
			descricao,
			criador,
			anocriacao,
			duracao,
			'./imgs/exemplo1',
			status,
			permissao,
			destaque,
			usu_id
		];
		const id = await PodCast.createPodCast(data);

		if (!id) {
			return resp.json({ mensagem: 'Erro ao criar podcast!', _id: id });
		}
		return resp.json({ mensagem: 'Podcast criado com sucesso!', _id: id });
	}
};
