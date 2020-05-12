const Avaliar = require('../models/Feedback');
const { date } = require('../utils/Date');

module.exports = {
	//SELECT
	async index(req, res) {
		const { pod_id } = req.params;
		const { userId } = req;
		console.log('teste de id', userId);
		const fav = await Avaliar.findAvaliar(pod_id, userId);

		return res.json(fav);
	},

	async read(req, res) {
		const { pod_id } = req.params;
		const fav = await Avaliar.findNotaMedia(pod_id);

		return res.json(fav);
	},

	//CREATE
	async store(req, resp) {
		const { pod_id, fbk_valor } = req.params;
		const { userId } = req;

		//regras de negocio

		//final regras de negocio

		const data = [date(Date.now()).currentDateTime, 1, fbk_valor, 1, userId, pod_id, 3];
		const avaliar = await Avaliar.createFeedback(data);

		if (!avaliar) {
			return resp.json({
				mensagem: 'Não foi possível avaliar Podcast!',
				_id: avaliar,
			});
		}
		return resp.json({ mensagem: 'Podcast avaliado!', _id: avaliar });
	},

	//UPDATE
	async update(req, res) {
		const { pod_id, fbk_valor, fbk_status } = req.params;
		const { userId } = req;

		const avaliacao = await Avaliar.findAvaliar(pod_id, userId);

		if (avaliacao) {
			const { pod_id } = avaliacao;

			const update = await Avaliar.updateAvaliar(
				pod_id,
				fbk_valor,
				fbk_status,
				userId
			);
			console.log(fbk_status, pod_id);

			if (!update) {
				return res.json({
					mensagem: 'Não foi possível tirar a nota!',
					_id: update,
				});
			}
			return res.json({
				mensagem: 'você alterou a sua nota ao podcast!',
				_id: update,
			});
		}
	},
};
