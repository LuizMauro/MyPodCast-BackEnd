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

		const { nome, descricao, criador, anocriacao, duracao ,status, permissao, destaque, usu_id } = req.body;
	
		if(req.file.length == 0){
			return resp.json({mensagem: 'Por favor escolha uma imagem'});
		}

		const { originalname, filename, path } = req.file;
		


		//regras de negocio

		//final regras de negocio


		const data = [
			nome,
			descricao,
			criador,
			anocriacao,
			duracao,
			'./imgs/exemplo',
			status,
			permissao,
			destaque,
			usu_id
		];

		const data = [ nome, descricao, criador, anocriacao, duracao,  filename, status, permissao, destaque, usu_id];

		const id = await PodCast.createPodCast(data);

		if (!id) {
			return resp.json({ mensagem: 'Erro ao criar podcast!', _id: id });
		}
		return resp.json({ mensagem: 'Podcast criado com sucesso!', _id: id });
	}
};
