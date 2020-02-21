const Categoria = require('../models/Categoria');
const { date } = require('../utils/Date');

module.exports = {
	//SELECT
	async index(req, resp) {
		const categorias = await Categoria.buscaTodos();

		return resp.json(categorias);
	},

	//CREATE
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
	},

	//UPDATE
	async updateCtgDescricao(req, res) {
		const { ctg_id } = req.params;
		const { ctg_descricao } = req.body;

		const ctgUpdate = await Categoria.updateCtgDescricao(
			ctg_descricao,
			ctg_id
		);

		if (!ctgUpdate) {
			return res.json({
				mensagem: 'não foi possivel alterar descricao!',
				_id: ctgUpdate
			});
		}
		return res.json({
			mensagem: 'descrição da categoria alterada!',
			_id: ctgUpdate
		});
	},

	async updateCtgStatus(req, res) {
		const { ctg_id, ctg_status } = req.params;

		const ctgUpdate = await Categoria.updateCtgStatus(ctg_id, ctg_status);

		if (!ctgUpdate) {
			return res.json({
				mensagem: 'não foi possivel alterar status!',
				_id: ctgUpdate
			});
		}
		return res.json({
			mensagem: 'status da ctg alterada!',
			_id: ctgUpdate
		});
	}
};
