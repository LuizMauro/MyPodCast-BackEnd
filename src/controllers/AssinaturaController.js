const Assinatura = require('../models/Assinatura');
const Plano = require('../models/Plano');
const { date } = require('../utils/Date');
const mailer = require('../utils/Nodemailer');

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
		const { usu_email, usu_nome, price, plano } = req.body;
		const { pln_id, fpg_id } = req.params;
		const { userId } = req;

		console.log(
			'dados',
			usu_email,
			usu_nome,
			price,
			plano,
			pln_id,
			fpg_id,
			userId
		);

		const oplano = await Plano.findOne(pln_id);
		const ass_preco = oplano.pln_preco;

		if (pln_id === 1) {
			const datainicio = date(Date.now()).currentDateTime;
			const datafim = new Date();
			datafim.setMonth(datafim.getMonth() + 1);
		}
		
		const datainicio = date(Date.now()).currentDateTime;
		const datafim = new Date();
		datafim.setMonth(datafim.getMonth() + 12);

		const data = [1, datainicio, datafim, ass_preco, userId, pln_id, fpg_id];

		try {
			const id = await Assinatura.create(data);

			if (!id) {
				console.log('erro');
				return resp.json({ mensagem: 'Erro ao criar assinatura!', _id: id });
			}

			console.log('email é', usu_email);

			mailer.sendMail(
				{
					to: usu_email,
					from: 'mypodcast@contato.com.br',
					template: 'payment/confirm',
					context: { usu_nome, price, plano },
				},
				(err) => {
					console.log(err);
					return resp.status(400).send({ error: 'error' });
				}
			);

			return resp.json({ ok: 'ok' });
		} catch (err) {
			console.log('erro inesperado');
			return resp.status(400).send({ error: 'error unknown' });
		}
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
