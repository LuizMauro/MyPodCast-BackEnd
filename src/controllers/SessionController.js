const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { compare } = require('bcryptjs');
const authConfig = require('../config/secretSession');

module.exports = {
	async store(req, resp) {
		const { email, senha } = req.body;
		const user = await User.findOneUserEmail(email);

		if (!user) {
			return resp.status(401).json({ error: 'Usuario ou senha invalidos!' });
		}

		const { usu_senha, usu_status } = user;

		if (!(await compare(senha, usu_senha))) {
			return resp.status(401).json({ error: 'Usuario ou senha invalidos!' });
		}

		if (usu_status != 1) {
			return resp.status(401).json({ error: 'Usuario banido!' });
		}
		console.log(user);

		const {
			usu_id,
			usu_nome,
			tus_id,
			tus_descricao,
			usu_email,
			usu_cpf,
		} = user;

		return resp.json({
			user: { usu_id, usu_nome, tus_id, tus_descricao, usu_email, usu_cpf },
			token: jwt.sign({ usu_id, tus_id, tus_descricao }, authConfig.secret, {
				expiresIn: authConfig.expiresIn
			})
		});
	}
};
