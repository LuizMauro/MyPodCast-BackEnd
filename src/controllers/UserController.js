const User = require('../models/User');

module.exports = {
	async index(req, resp) {
		const users = await User.findAllUser();

		return resp.json(users);
	},

	async read(req,resp){
		const { usu_id } = req.params;
		const user = await User.findOneUser(usu_id);
		return resp.json(user);	
	},

	async store(req, resp) {
		const { nome, senha, email, cpf, tus_id } = req.body;
		const data = [nome, senha, email, cpf, 1, 0, tus_id];

		//regras de negocio

		//final regras de negocio

		const id = await User.createUser(data);

		if (!id) {
			return resp.json({ mensagem: 'Erro ao criar usuario!', _id: id });
		}
		return resp.json({ mensagem: 'Usuario criado com sucesso!', _id: id });
	}
};
