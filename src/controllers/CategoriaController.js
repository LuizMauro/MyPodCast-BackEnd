const Categoria = require('../models/Categoria');

module.exports = {
	async index(req, resp) {
		const categorias = await Categoria.buscaTodos();

		return resp.json(categorias);
	},

	async store(req, resp) {
		const { descricao } = req.body;

		//regras de negocio

		//final regras de negocio

		const data = [descricao, 1, '2019-11-24 21:36:48'];
		const id = await Categoria.createCategoria(data);

		if (!id) {
			return resp.json({ mensagem: 'Erro ao criar categoria!', _id: id });
		}
		return resp.json({ mensagem: 'Categoria criado com sucesso!', _id: id });
	}
};
