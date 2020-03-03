const PretendoAcompanhar = require('../models/Feedback');

module.exports = {
	//SELECT
	async index(req, resp) {
		const fav = await PretendoAcompanhar.findAllFeedback();

		return resp.json(fav);
	},

	async read(req, resp) {
		const { userId } = req;
		const fav = await PretendoAcompanhar.findFeedbackUser(userId);

		return resp.json(fav);
	},

	//CREATE
	async store(req, resp) {
		const { pod_id } = req.params;
		const { userId } = req;

		//regras de negocio

		//final regras de negocio

		const data = ['2019-11-24 21:36:48', 2, 0, 0, userId, pod_id, 3];
		const marcar = await PretendoAcompanhar.createFeedback(data);

		if (!marcar) {
			return resp.json({
				mensagem: 'Não foi possível marcar Podcast!',
				_id: marcar
			});
		}
		return resp.json({ mensagem: 'Podcast marcado como PretendoAcompanhar!', _id: marcar });
	},
};
