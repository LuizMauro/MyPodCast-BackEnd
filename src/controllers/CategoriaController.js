const Categoria = require('../models/Categoria');
const { date } = require('../utils/Date'); 

module.exports = {
	async index(req, resp) {
		const categorias = await Categoria.buscaTodos();

		return resp.json(categorias);
	},

	async store(req, resp) {
		const { descricao } = req.body;

		//regras de negocio

		//final regras de negocio

		const data = [descricao, 1, date(Date.now()).format];
		const id = await Categoria.createCategoria(data);

		if (!id) {
			return resp.json({ mensagem: 'Erro ao criar categoria!', _id: id });
		}
		return resp.json({ mensagem: 'Categoria criado com sucesso!', _id: id });
	}
};
