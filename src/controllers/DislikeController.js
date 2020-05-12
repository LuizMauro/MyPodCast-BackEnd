const Dislike = require('../models/Like');
const { date } = require('../utils/Date');

module.exports = {
	//CREATE
	async store(req, resp) {
		const { cmt_id } = req.params;
		const { userId } = req;

		const data = [0, date(Date.now()).currentDateTime, 1, userId, cmt_id];

		const id = await Dislike.create(data);

		if (!id) {
			return resp.json({ mensagem: 'Erro ao dar like', _id: id });
		}
		return resp.json({ mensagem: 'Deu like', _id: id });
	},
};
