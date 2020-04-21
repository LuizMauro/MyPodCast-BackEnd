const Comentario = require('../models/Comentario');

module.exports = {
	//SELECT
	async index(req, resp) {
		const { pod_id } = req.params;

		const comments = await Comentario.findComentariosByPodcast(pod_id);

		return resp.json(comments);
	},

	async indexTag(req, resp) {
		const { pod_id, tag_id } = req.params;

		const comments = await Comentario.findComentariosByPodcastTag(
			pod_id,
			tag_id
		);

		return resp.json(comments);
	},

	async read(req, resp) {
		const { pod_id } = req.params;
		const { userId } = req;

		const comments = await Comentario.findComentariosByPodcastUser(
			pod_id,
			userId
		);

		return resp.json(comments);
	},

	//UPDATE
	async updateTag(req, res) {
		const { tag_id } = req.params;
		const { tag_descricao } = req.body;

		const tagUpdate = await Tag.updateTag(tag_id, tag_descricao);

		if (!tagUpdate) {
			return res.json({
				mensagem: 'Erro ao editar tag!',
				_id: tagUpdate,
			});
		}
		return res.json({
			mensagem: 'tag editada!',
			_id: tagUpdate,
		});
	},

	async updateTagStatus(req, res) {
		const { tag_id, tag_status } = req.params;

		const tagUpdate = await Tag.updateTagStatus(tag_id, tag_status);

		if (!tagUpdate) {
			return res.json({
				mensagem: 'Erro ao mudar status da tag!',
				_id: tagUpdate,
			});
		}
		return res.json({
			mensagem: 'status da tag alterado!',
			_id: tagUpdate,
		});
	},

	//CREATE
	async store(req, resp) {
		const { cmt_conteudo } = req.body;
		const { pod_id, tag_id } = req.params;
		const { userId } = req;

		console.log('conteudo', cmt_conteudo);

		const data = [
			cmt_conteudo,
			'2019-11-24 21:36:48',
			1,
			0,
			userId,
			pod_id,
			tag_id,
			null,
		];

		//regras de negocio

		//final regras de negocio
		const id = await Comentario.createComentario(data);

		if (!id) {
			return resp.json({ mensagem: 'Erro ao criar comentário!', _id: id });
		}
		return resp.json({ mensagem: 'Comentário criado com sucesso!', _id: id });
	},
};
