const TipoFeedback = require('../models/TipoFeedback');
const { date } = require('../utils/Date');

module.exports = {
	//SELECT
	async index(req, resp) {
		const tfb = await TipoFeedback.findAllTipoFeedback();

		return resp.json(tfb);
	},

	//CREATE
	async store(req, resp) {
		const { tfb_descricao } = req.body;

		//regras de negocio

		//final regras de negocio
		console.log(date(Date.now().format));
		const data = [tfb_descricao, 1, date(Date.now()).currentDateTime, 0, 0];
		const tfb = await TipoFeedback.createTipoFeedback(data);

		if (!tfb) {
			return resp.json({
				mensagem: 'Erro ao criar tipo de feedback!',
				_id: tfb
			});
		}
		return resp.json({
			mensagem: 'Tipo de Feedback criado com sucesso!',
			_id: tfb
		});
	}
};
