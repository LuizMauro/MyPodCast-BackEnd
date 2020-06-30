const PodCast = require('../models/PodCast');

module.exports = {
	//SELECTS
	async index(req, resp) {
		const podcasts = await PodCast.findAll();

		return resp.json(podcasts);
	},

	async ultimosPods(req, resp){
		const podcasts = await PodCast.findAll({limit:10 , order:[ ['pod_id', 'ASC'] ]});

		return resp.json(podcasts);

	},

	//UPDATE
	async updatePodcastStatus(req, res) {
		const { pod_id, pod_status } = req.params;

		const podcastUpdate = await PodCast.updatePodcastStatus(pod_id, pod_status);

		if (!podcastUpdate) {
			return res.json({
				mensagem: 'Erro ao mudar status!',
				_id: podcastUpdate
			});
		}
		return res.json({
			mensagem: 'status alterado!',
			_id: podcastUpdate
		});
	},

	async updatePodcastImg(req, res) {
		const { pod_id } = req.params;

		if (req.file.length == 0) {
			return resp.json({ mensagem: 'Por favor escolha uma imagem' });
		}

		const { originalname, filename, path } = req.file;

		const podcastUpdate = await PodCast.updatePodcastImg(pod_id, filename);

		if (!podcastUpdate) {
			return res.json({
				mensagem: 'Erro ao mudar imagem!',
				_id: podcastUpdate
			});
		}
		return res.json({
			mensagem: 'imagem alterada!',
			_id: podcastUpdate
		});
	},

	//CADASTRO
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

		if (req.file.length == 0) {
			return resp.json({ mensagem: 'Por favor escolha uma imagem' });
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
			filename,
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
