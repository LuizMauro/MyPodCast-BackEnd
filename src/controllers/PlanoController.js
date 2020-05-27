const Plano = require('../models/Plano');

module.exports = {
	async index(req, resp) {
		const planos = await Plano.findAll();

		return resp.json(planos);
	},

	async edit(req, resp) {
		const { pln_preco } = req.body;
		const { pln_id } = req.params;

		const id = await Plano.edit(pln_id, pln_preco);

		if (!id) {
			return resp.json({ mensagem: 'Erro ao edit plano!', _id: id });
		}
		return resp.json({
			mensagem: 'Plano editado!',
			_id: id,
		});
	},
};
