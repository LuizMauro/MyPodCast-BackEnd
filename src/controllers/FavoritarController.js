const Favoritar = require('../models/Feedback');

module.exports = {
	//SELECT
	async index(req, resp) {
		const fav = await Favoritar.findAllFeedback();

		return resp.json(fav);
	},

	//CREATE
	async store(req, resp) {
		const { pod_id } = req.params;
		const { userId } = req;

		//regras de negocio

		//final regras de negocio

		const data = ['2019-11-24 21:36:48', 1, 0, 0, userId, pod_id, 1];
		const fav = await Favoritar.createFeedback(data);

		if (!fav) {
			return resp.json({
				mensagem: 'Não foi possível favoritar Podcast!',
				_id: fav
			});
		}
		return resp.json({ mensagem: 'Podcast favoritado!', _id: fav });
	}
};
