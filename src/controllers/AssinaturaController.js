const Assinatura = require('../models/Assinatura');
const Plano = require('../models/Plano');
const { date } = require('../utils/Date');

module.exports = {
	async index(req, resp) {
		const ass = await Assinatura.findAll();

		return resp.json(ass);
	},

	async read(req, resp) {
		const { userId } = req;

		const ass = await Assinatura.findOne(userId);

		return resp.json(ass);
	},

	async create(req, resp) {
		const { pln_id, fpg_id } = req.params;
		const { userId } = req;

		const plano = await Plano.findOne(pln_id);
		const ass_preco = plano.pln_preco;

		const datainicio = date(Date.now()).currentDateTime;
		const datafim = new Date();
		datafim.setMonth(datafim.getMonth() + 1);

		const data = [1,datainicio, datafim, ass_preco, userId, pln_id, fpg_id];

		const id = await Assinatura.create(data);

		if (!id) {
			return resp.json({ mensagem: 'Erro ao criar assinatura!', _id: id });
		}
		return resp.json({
			mensagem: 'Assinatura criada!',
			_id: id,
		});
	},

	async edit(req, resp) {
		const { pln_id, fpg_id, ass_id } = req.params;
		const { userId } = req;

		const plano = await Plano.findOne(pln_id);
		const ass_preco = plano.pln_preco;

		const datafim = new Date();
		datafim.setMonth(datafim.getMonth() + 1);

		const atual = Assinatura.findOne(userId);

		const id = await Assinatura.edit(
			ass_id,
			userId,
			pln_id ? pln_id : atual.pln_id,
			datafim ? datafim : atual.ass_datafim,
			ass_preco ? ass_preco : atual.ass_preco,
			fpg_id ? fpg_id : atual.fpg_id
		);

		if (!id) {
			return resp.json({ mensagem: 'Erro ao editar assinatura', _id: id });
		}
		return resp.json({
			mensagem: 'Assinatura editada!',
			_id: id,
		});
	},
};
