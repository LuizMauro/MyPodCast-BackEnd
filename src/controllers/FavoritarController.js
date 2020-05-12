const Favoritar = require('../models/Feedback');
const { date } = require('../utils/Date');

module.exports = {
	//SELECT
	async index(req, resp) {
		const fav = await Favoritar.findAllFeedback();

		return resp.json(fav);
	},

	async read(req, resp) {
		const { userId } = req;
		const fav = await Favoritar.findFeedbackUser(userId);

		return resp.json(fav);
	},

	async indexFindFavorito(req, resp) {
		const { pod_id } = req.params;
        const { userId } = req;

		const fav = await Favoritar.findFavorito(pod_id, userId);

		return resp.json(fav);
	},

	//CREATE
	async store(req, resp) {
		const { pod_id } = req.params;
		const { userId } = req;

		//regras de negocio

		//final regras de negocio

		const data = [date(Date.now()).currentDateTime, 1, 0, 0, userId, pod_id, 1];
		const fav = await Favoritar.createFeedback(data);

		if (!fav) {
			return resp.json({
				mensagem: 'Não foi possível favoritar Podcast!',
				_id: fav
			});
		}
		return resp.json({ mensagem: 'Podcast favoritado!', _id: fav });
	},

	//UPDATE
	async update(req, res) {
        const { pod_id } = req.params;
        const { userId } = req;

		const favorito = await Favoritar.findFavorito(pod_id, userId);

		if (favorito) {
			const { pod_id, fbk_status } = favorito;

			const update = await Favoritar.updateFavorito(pod_id, fbk_status ? 0 : 1, userId);
			console.log(fbk_status, pod_id);

			if (!update) {
				return res.json({
					mensagem: 'Não foi possível desfavoritar!',
					_id: update
				});
			}
			return res.json({
				mensagem: 'Podcast desfavoritado/favoritado!',
				_id: update
			});
		}
	}
};
