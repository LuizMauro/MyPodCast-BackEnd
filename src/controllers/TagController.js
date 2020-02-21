const Tag = require('../models/Tag');

module.exports = {
	//SELECT
	async index(req, resp) {
		const tags = await Tag.findAllTag();

		return resp.json(tags);
	},

	//UPDATE
	async updateTag(req, res) {
		const { tag_id } = req.params;
		const { tag_descricao } = req.body;

		const tagUpdate = await Tag.updateTag(tag_id, tag_descricao);

		if (!tagUpdate) {
			return res.json({
				mensagem: 'Erro ao editar tag!',
				_id: tagUpdate
			});
		}
		return res.json({
			mensagem: 'tag editada!',
			_id: tagUpdate
		});
	},

	async updateTagStatus(req, res) {
		const { tag_id, tag_status } = req.params;

		const tagUpdate = await Tag.updateTagStatus(tag_id, tag_status);

		if (!tagUpdate) {
			return res.json({
				mensagem: 'Erro ao mudar status da tag!',
				_id: tagUpdate
			});
		}
		return res.json({
			mensagem: 'status da tag alterado!',
			_id: tagUpdate
		});
	},

	//CREATE
	async store(req, resp) {
		const { tag_descricao } = req.body;

		//regras de negocio

		//final regras de negocio

		const data = [tag_descricao, 1];
		const id = await Tag.createTag(data);

		if (!id) {
			return resp.json({ mensagem: 'Erro ao criar tag!', _id: id });
		}
		return resp.json({ mensagem: 'Tag criado com sucesso!', _id: id });
	}
};
