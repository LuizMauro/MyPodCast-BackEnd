const Favoritar = require('../models/Feedback');

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
	},

	//UPDATE
	async update(req, res) {
        const { pod_id } = req.params;
        const { userId } = req;

		const favorito = await Favoritar.findFeedback(pod_id);

		if (favorito) {
			const { fbk_id, fbk_status } = favorito;

			const update = await Favoritar.updateFeedback(fbk_id, fbk_status ? 0 : 1, userId);
			console.log(fbk_id, fbk_status);

			if (!update) {
				return res.json({
					mensagem: 'Não foi possível desfavoritar!',
					_id: update
				});
			}
			return res.json({
				mensagem: 'Podcast desfavoritado!',
				_id: update
			});
		}
	}
};
