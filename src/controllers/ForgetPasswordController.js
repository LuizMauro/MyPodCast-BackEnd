const User = require('../models/User');
const mailer = require('../utils/Nodemailer');
const crypto = require('crypto');
const { hash } = require('bcryptjs');

module.exports = {
	async store(req, res) {
		const { usu_email } = req.body;

		try {
			const user = await User.findOneUserEmail(usu_email);

			if (!user) {
				return res.json({ userDoesNotExists: true, error: 'user not found' });
			}

			const token = crypto.randomBytes(10).toString('hex');
			const now = new Date();
			now.setHours(now.getHours() + 1);

			await User.forgotPassword(user.usu_id, token, now);

			mailer.sendMail(
				{
					to: usu_email,
					from: 'mypodcast@contato.com.br',
					template: 'auth/forgot_password',
					context: { token },
				},
				(err) => {
					if (err) {
						console.log(err);
						return res.status(400).send({ error: 'error' });
					}
				}
			);

			return res.json({ enviado: true });
		} catch (err) {
			console.log('erro é',err)
			return res
				.status(400)
				.send({ error: 'Error on Forget Password, try again' });
		}
	},

	async update(req, res) {
		const { usu_email, usu_reset_token, usu_senha } = req.body;

		console.log('teste', usu_email, usu_reset_token, usu_senha);

		try {
			const user = await User.findOneUserEmail(usu_email);

			if (!user) {
				return res.json({ userDoesNotExists: true, error: 'user not found' });
			}

			console.log('usuario',user)
			if (usu_reset_token != user.usu_reset_token)
				return res.json({ tokenInvalid: true });

			const now = new Date();
			now.setHours(now.getHours() - 3);
			console.log('datas',now,Date.now());
			if (Date.now() < user.usu_reset_expires)
				return res.json({ tokenExpired: true });

			const criptSenha = await hash(usu_senha, 8);
			await User.updateUserSenha(user.usu_id, criptSenha);

			await User.forgotPassword(user.usu_id, null, null);

			res.json({ passwordChanged: true });
		} catch (err) {
			return res
				.status(400)
				.send({ error: 'Cannot reset password, try again' });
		}
	},
};
