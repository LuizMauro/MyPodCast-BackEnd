const PretendoAcompanhar = require('../models/Feedback');
const { date } = require('../utils/Date');

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

		const data = [date(Date.now()).currentDateTime, 2, 0, 0, userId, pod_id, 2];
		const marcar = await PretendoAcompanhar.createFeedback(data);

		if (!marcar) {
			return resp.json({
				mensagem: 'Não foi possível marcar Podcast!',
				_id: marcar
			});
		}
		return resp.json({
			mensagem: 'Podcast marcado como PretendoAcompanhar!',
			_id: marcar
		});
	}
};
