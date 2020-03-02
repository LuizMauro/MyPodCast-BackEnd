const User = require('../models/User');
const { hash } = require('bcryptjs');

module.exports = {
	//SELECTS
	async index(req, resp) {
		const users = await User.findAllUsers();

		return resp.json(users);
	},

	async read(req, resp) {
		const { usu_id } = req.params;
		const user = await User.findOneUser(usu_id);
		return resp.json(user);
	},
	
	//CADASTROS
	async store(req, resp) {
		const { nome, senha, email, cpf, tus_id } = req.body;
		
		if(senha){
			const criptSenha = await hash(senha, 8);
			const data = [nome, criptSenha, email, cpf, 1, 0, tus_id];
			const id = await User.createUser(data);
			
			if (!id) {
				return resp.json({ mensagem: 'Erro ao criar usuario!', _id: id });
			}
			return resp.json({ mensagem: 'Usuario criado com sucesso!', _id: id });
		}else{
			return resp.json({ mensagem: 'Erro ao criar usuario!', _id: id });
		}

	},

	//UPDATES
	async updateUserStatus(req, res) {
		const { usu_id, usu_status } = req.params;

		const userUpdate = await User.updateUserStatus(usu_id, usu_status);

		if (!userUpdate) {
			return res.json({
				mensagem: 'Erro ao atualizar status',
				_id: userUpdate
			});
		}
		return res.json({
			mensagem: 'status atualizado com sucesso!',
			_id: userUpdate
		});
	},

	async updateUserPerfil(req, res) {
		const { usu_id } = req.params;
		const { usu_nome, usu_email } = req.body;

		const userUpdate = await User.updateUserPerfil(usu_id, usu_nome, usu_email);

		if (!userUpdate) {
			return res.json({ mensagem: 'Erro ao editar perfil!', _id: userUpdate });
		}
		return res.json({
			mensagem: 'perfil editado com sucesso!',
			_id: userUpdate
		});
	},

	async updateUserSenha(req, res) {
		const { usu_senha } = req.body;
		const { userId } = req;


		if(usu_senha){
			const criptSenha = await hash(usu_senha, 8);

			const userUpdate = await User.updateUserSenha(userId, criptSenha);

			if (!userUpdate) {
				return res.json({ mensagem: 'Erro ao mudar senha!', _id: userUpdate });
			}
			return res.json({
				mensagem: 'senha alterada!',
				_id: userUpdate
			});
		}else{
			return res.json({ mensagem: 'Erro ao mudar senha!', _id: userUpdate });
		}


		
	},

	async updateUsuarioTipo(req, res) {
		const { tus_id, usu_id } = req.params;

		const userUpdate = await User.updateUsuarioTipo(tus_id, usu_id);

		if (!userUpdate) {
			return res.json({ mensagem: 'Erro ao mudar status!', _id: userUpdate });
		}
		return res.json({
			mensagem: 'status alterado!',
			_id: userUpdate
		});
	}
};
