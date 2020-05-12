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
		const { ctg_descricao } = req.body;

		console.log(ctg_descricao);

		//regras de negocio
		const verifica = await Categoria.validaCategoria(ctg_descricao);

		if (verifica) {
			return resp.json({ ctgExists: true });
		}
		//final regras de negocio
		
		const data = [ctg_descricao, 1, date(Date.now()).currentDateTime];
		const id = await Categoria.createCategoria(data);

		if (!id) {
			return resp.json({ _id: id });
		}
		return resp.json({ ctgCreated: true, _id: id });
	},

	//UPDATE
	async updateCtgDescricao(req, res) {
		const { ctg_id } = req.params;
		const { ctg_descricao } = req.body;

		console.log(ctg_id, ctg_descricao);

		const ctgUpdate = await Categoria.updateCtgDescricao(ctg_descricao, ctg_id);

		if (!ctgUpdate) {
			return res.json({
				mensagem: 'não foi possivel alterar descricao!',
				_id: ctgUpdate,
			});
		}
		return res.json({
			mensagem: 'descrição da categoria alterada!',
			_id: ctgUpdate,
		});
	},

	async updateCtgStatus(req, res) {
		const { ctg_id, ctg_status } = req.params;

		const ctgUpdate = await Categoria.updateCtgStatus(ctg_id, ctg_status);

		if (!ctgUpdate) {
			return res.json({
				mensagem: 'não foi possivel alterar status!',
				_id: ctgUpdate,
			});
		}
		return res.json({
			mensagem: 'status da ctg alterada!',
			_id: ctgUpdate,
		});
	},
};
