const User = require('../models/User');

module.exports = {
	async update(req, res) {
        const { userId } = req;

		const userUpdate = await User.updateUsuarioTipo(2, userId);

		if (!userUpdate) {
			return res.json({ mensagem: 'Erro ao virar podcaster!', _id: userUpdate });
		}
		return res.json({
			tus_descricao: "Podcaster",
			tus_id: 2
		});
	},

	async updatePremium(req, res) {
        const { userId } = req;

		const userUpdate = await User.updatePremium(1, userId);

		if (!userUpdate) {
			return res.json({ mensagem: 'Erro ao virar premium!', _id: userUpdate });
		}
		return res.json({
			tus_descricao: "Podcaster",
			tus_id: 2,
			usu_premium: 1
		});
	},
};
