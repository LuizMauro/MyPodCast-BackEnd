const { Model, DataTypes, QueryTypes } = require('sequelize');

class User extends Model {
	static init(sequelize) {
		super.init(
			{
				usu_nome: DataTypes.STRING,
				usu_senha: DataTypes.STRING,
				usu_email: DataTypes.STRING,
				usu_cpf: DataTypes.STRING,
			},
			{ sequelize }
		);
	}

	static associate(models) {
		this.belongsTo(models.TipoUsuario, { foreignKey: 'tus_id' });
	}

	//Criar usuário
	static async createUser(data) {
		try {
			console.log('Terceiro', data);

			const [result] = await this.sequelize.query(
				'INSERT INTO usu_usuario (usu_nome, usu_senha, usu_email, usu_cpf, usu_status, usu_premium , tus_id) values (?)',
				{
					replacements: [data],
					type: QueryTypes.INSERT,
					nest: true,
				}
			);

			return result;
		} catch (err) {
			console.log(err);
			return false;
		}
	}

	// Exibe todos usuarios por ordem alfabética com seu tipo de usuario
	static async findAll() {
		const [results] = await this.sequelize.query(
			'select distinct a.usu_nome, a.usu_id, a.usu_email, a.usu_cpf, a.usu_status, a.usu_premium, b.tus_id, b.tus_descricao from usu_usuario a join tus_tipo_usuario b on a.tus_id = b.tus_id order by a.usu_id'
		);

		return results;
	}

	// Exibe todos usuarios por ordem alfabética com seu tipo de usuario
	static async findAllPodcaster() {
		const [results] = await this.sequelize.query(
			'select distinct a.usu_nome, a.usu_id, a.usu_email, a.usu_cpf, a.usu_status, a.usu_premium, b.tus_id, b.tus_descricao from usu_usuario a join tus_tipo_usuario b on a.tus_id = b.tus_id where b.tus_id = 2 order by a.usu_id'
		);

		return results;
	}

	// Exibe todos usuarios por ordem alfabética com seu tipo de usuario
	static async findAllPodcasterPremium() {
		const [results] = await this.sequelize.query(
			'select distinct a.usu_nome, a.usu_id, a.usu_email, a.usu_cpf, a.usu_status, a.usu_premium, b.tus_id, b.tus_descricao from usu_usuario a join tus_tipo_usuario b on a.tus_id = b.tus_id where b.tus_id = 2 and a.usu_premium = 1 order by a.usu_id'
		);

		return results;
	}

	// Exibe todos OUVINTES E PODCASTERS por ordem alfabética com seu tipo de usuario
	static async findAllUsers() {
		const [results] = await this.sequelize.query(
			'select distinct a.usu_nome, a.usu_id, a.usu_email, a.usu_cpf, a.usu_status, a.usu_premium, b.tus_id, b.tus_descricao from usu_usuario a join tus_tipo_usuario b on a.tus_id = b.tus_id where b.tus_id between 1 and 2 order by a.usu_nome;'
		);

		return results;
	}

	static async findCountAllUsers() {
		const [results] = await this.sequelize.query(
			'select distinct a.usu_nome, a.usu_id, a.usu_email, a.usu_cpf, a.usu_status, a.usu_premium, b.tus_id, b.tus_descricao from usu_usuario a join tus_tipo_usuario b on a.tus_id = b.tus_id where b.tus_id between 1 and 3 order by a.usu_nome;'
		);

		return results;
	}

	// Exibe todos OUVINTES E Moderadores por ordem alfabética com seu tipo de usuario
	static async findAllModUser() {
		const [results] = await this.sequelize.query(
			'select distinct a.usu_nome, a.usu_id, a.usu_email, a.usu_cpf, a.usu_status, a.usu_premium, b.tus_id, b.tus_descricao from usu_usuario a join tus_tipo_usuario b on a.tus_id = b.tus_id where b.tus_id = 1 || b.tus_id = 3 order by a.usu_nome;'
		);

		return results;
	}

	// Exibe todos OUVINTES E Moderadores por ordem alfabética com seu tipo de usuario
	static async findAllMod() {
		const [results] = await this.sequelize.query(
			'select distinct a.usu_nome, a.usu_id, a.usu_email, a.usu_cpf, a.usu_status, a.usu_premium, b.tus_id, b.tus_descricao from usu_usuario a join tus_tipo_usuario b on a.tus_id = b.tus_id where b.tus_id = 3 order by a.usu_nome;'
		);

		return results;
	}

	// Exibe todos OUVINTES 
	static async findAllOuvinte() {
		const [results] = await this.sequelize.query(
			'select distinct a.usu_nome, a.usu_id, a.usu_email, a.usu_cpf, a.usu_status, a.usu_premium, b.tus_id, b.tus_descricao from usu_usuario a join tus_tipo_usuario b on a.tus_id = b.tus_id where b.tus_id = 1 order by a.usu_nome;'
		);

		return results;
	}

	// Select para exibir informações de Perfil
	static async findOneUser(data) {
		const [results] = await this.sequelize.query(
			'select distinct a.usu_nome, a.usu_id, a.usu_email, a.usu_cpf, a.usu_status, a.usu_premium, b.tus_id, b.tus_descricao from usu_usuario a join tus_tipo_usuario b on a.tus_id = b.tus_id where a.usu_id = ?',
			{
				replacements: [data],
				type: QueryTypes.SELECT,
				nest: true,
			}
		);

		return results;
	}

	//PARA VERIFICAÇÃO DE USUARIO - NAO VAI PRO FRONT
	// Select para exibir informações de Perfil
	static async findUser(data) {
		const [results] = await this.sequelize.query(
			'select distinct a.usu_nome, a.usu_id, a.usu_senha, a.usu_email, a.usu_cpf, a.usu_status, a.usu_premium, b.tus_id, b.tus_descricao from usu_usuario a join tus_tipo_usuario b on a.tus_id = b.tus_id where a.usu_id = ?',
			{
				replacements: [data],
				type: QueryTypes.SELECT,
				nest: true,
			}
		);

		return results;
	}

	// Select para exibir informações de por email
	static async findOneUserEmail(email) {
		const [results] = await this.sequelize.query(
			'select distinct a.usu_nome, a.usu_id, a.usu_email, a.usu_senha, a.usu_cpf, a.usu_status, a.usu_premium, a.usu_reset_token, a.usu_reset_expires, b.tus_id, b.tus_descricao from usu_usuario a join tus_tipo_usuario b on a.tus_id = b.tus_id where a.usu_email = ?',
			{
				replacements: [email],
				type: QueryTypes.SELECT,
				nest: true,
			}
		);

		return results;
	}

	// Select para verificação na edição de perfil
	static async findEditValidation(data) {
		const results = await this.sequelize.query(
			'SELECT * FROM usu_usuario where usu_id != ?',
			{
				replacements: [data],
				type: QueryTypes.SELECT,
				nest: true,
			}
		);

		return results;
	}

	// Select para verificação de Login
	static async findLoginValidation(email, senha) {
		const [results] = await this.sequelize.query(
			'Select * from usu_usuario where usu_email = :email and usu_senha = :senha and usu_status = true',
			{
				replacements: { email: email, senha: senha },
				type: QueryTypes.SELECT,
				nest: true,
			}
		);

		return results;
	}

	// Select para validação de cadastro - EMAIL
	static async verifyNome(nome) {
		const [results] = await this.sequelize.query(
			'SELECT usu_id, usu_nome, usu_email FROM usu_usuario where usu_nome = :usu_nome',
			{
				replacements: { usu_nome: nome },
				type: QueryTypes.SELECT,
				nest: true,
			}
		);
		return results;
	}

	// Select para validação de cadastro - EMAIL
	static async verifyEmail(email) {
		const [results] = await this.sequelize.query(
			'SELECT usu_id, usu_nome, usu_email FROM usu_usuario where usu_email = :usu_email',
			{
				replacements: { usu_email: email },
				type: QueryTypes.SELECT,
				nest: true,
			}
		);
		return results;
	}

	// Select para validação de cadastro - CPF
	static async verifyCpf(cpf) {
		const [results] = await this.sequelize.query(
			'SELECT usu_id, usu_nome, usu_email FROM usu_usuario where usu_cpf = :usu_cpf',
			{
				replacements: { usu_cpf: cpf },
				type: QueryTypes.SELECT,
				nest: true,
			}
		);
		return results;
	}

	//Mudar status do usuário
	static async updateUserStatus(usuid, usustatus) {
		try {
			const [result] = await this.sequelize.query(
				'update usu_usuario set usu_status = :usu_status where usu_id = :usu_id',
				{
					replacements: { usu_status: usustatus, usu_id: usuid },
					type: QueryTypes.UPDATE,
					nest: true,
				}
			);
			return true;
		} catch (err) {
			return false;
		}
	}

	//Mudar token de esqueceu a senha
	static async forgotPassword(usuid, usutokenreset, usutokenexpires) {
		try {
			const [result] = await this.sequelize.query(
				'update usu_usuario set usu_reset_token = :usu_reset_token, usu_reset_expires = :usu_reset_expires where usu_id = :usu_id',
				{
					replacements: {
						usu_id: usuid,
						usu_reset_token: usutokenreset,
						usu_reset_expires: usutokenexpires,
					},
					type: QueryTypes.UPDATE,
					nest: true,
				}
			);
			return true;
		} catch (err) {
			return false;
		}
	}

	//Update Perfil
	static async updateUserPerfil(usuid, usunome, usuemail, ususenha) {
		try {
			const [result] = await this.sequelize.query(
				'update usu_usuario set usu_nome = :usu_nome, usu_email = :usu_email, usu_senha = :usu_senha where usu_id = :usu_id',
				{
					replacements: {
						usu_nome: usunome,
						usu_email: usuemail,
						usu_id: usuid,
						usu_senha: ususenha,
					},
					type: QueryTypes.UPDATE,
					nest: true,
				}
			);
			return true;
		} catch (err) {
			console.log(err);
			return false;
		}
	}

	//Atualizar Senha
	static async updateUserSenha(usuid, ususenha) {
		try {
			const [result] = await this.sequelize.query(
				'update usu_usuario set usu_senha = :usu_senha where usu_id = :usu_id',
				{
					replacements: { usu_senha: ususenha, usu_id: usuid },
					type: QueryTypes.UPDATE,
					nest: true,
				}
			);
			return true;
		} catch (err) {
			return false;
		}
	}

	//Transformar usuário em Moderador/Podcaster e vice versa
	static async updateUsuarioTipo(tusid, usuid) {
		try {
			const [result] = await this.sequelize.query(
				'update usu_usuario set tus_id = :tus_id where usu_id = :usu_id',
				{
					replacements: { tus_id: tusid, usu_id: usuid },
					type: QueryTypes.UPDATE,
					nest: true,
				}
			);
			return true;
		} catch (err) {
			return false;
		}
	}

	//Transformar em Premium
	static async updatePremium(usupremium, usuid) {
		try {
			const [result] = await this.sequelize.query(
				'update usu_usuario set usu_premium = :usu_premium where usu_id = :usu_id',
				{
					replacements: { usu_premium: usupremium, usu_id: usuid },
					type: QueryTypes.UPDATE,
					nest: true,
				}
			);
			return true;
		} catch (err) {
			return false;
		}
	}
}

module.exports = User;
