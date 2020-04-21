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

	//UPDATE
	async updateComentario(req, res) {
		const { pod_id, cmt_id } = req.params;
		const { cmt_conteudo } = req.body;
		const { userId } = req;

		const commentUpdate = await Comentario.updateComentario(
			cmt_conteudo,
			pod_id,
			cmt_id,
			userId
		);

		if (!commentUpdate) {
			return res.json({
				mensagem: 'Erro ao editar comentário!',
				_id: commentUpdate,
			});
		}
		return res.json({
			mensagem: 'comentário editado!',
			_id: commentUpdate,
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
};
