const { Model, DataTypes, QueryTypes } = require('sequelize');

class User extends Model {
	static init(sequelize) {
		super.init(
			{
				usu_nome: DataTypes.STRING,
				usu_senha: DataTypes.STRING,
				usu_email: DataTypes.STRING,
				usu_cpf: DataTypes.STRING
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
					nest: true
				}
			);

			return result;
		} catch (err) {
			console.log(err);
			return false;
		}
	}

	// Exibe todos OUVINTES por ordem alfabética com seu tipo de usuario
	static async findAllUsers() {
		const [results] = await this.sequelize.query(
			'select distinct a.usu_nome, a.usu_id, a.usu_email, a.usu_cpf, a.usu_status, a.usu_premium, b.tus_id, b.tus_descricao from usu_usuario a join tus_tipo_usuario b on a.tus_id = b.tus_id order by a.usu_id'
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
				nest: true
			}
		);

		return results;
	}

	// Select para exibir informações de por email
	static async findOneUserEmail(email) {
		const [results] = await this.sequelize.query(
			'select distinct a.usu_nome, a.usu_id, a.usu_email, a.usu_senha, a.usu_cpf, a.usu_status, a.usu_premium, b.tus_id, b.tus_descricao from usu_usuario a join tus_tipo_usuario b on a.tus_id = b.tus_id where a.usu_email = ?',
			{
				replacements: [email],
				type: QueryTypes.SELECT,
				nest: true
			}
		);

		return results;
	}

	// Select para verificação na edição de perfil
	static async findEditValidation(data) {
		const [results] = await this.sequelize.query(
			'SELECT * FROM usu_usuario where usu_id != ?',
			{
				replacements: [data],
				type: QueryTypes.SELECT,
				nest: true
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
				nest: true
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
					nest: true
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
						usu_senha: ususenha
					},
					type: QueryTypes.UPDATE,
					nest: true
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
					nest: true
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
					nest: true
				}
			);
			return true;
		} catch (err) {
			return false;
		}
	}
}

module.exports = User;
