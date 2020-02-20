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

	static async createUser(data) {
		try {
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
			return false;
		}
	}

	//Select para verificação informações para cadastro de novo usuario
	static async findAllUser() {
		const [results] = await this.sequelize.query('SELECT * FROM usu_usuario');

		return results;
	}

	// Select para exibir informações de Perfil
	static async findOneUser(data) {
		const [results] = await this.sequelize.query(
			'SELECT * FROM usu_usuario where usu_id = ?',
			{
				replacements: [data],
				type: QueryTypes.SELECT,
				nest: true
			}
		);

		return results;
	}

	// Select para verificação na edição de perfil
	static async findOneUser(data) {
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

	//Seleciona todos usuários (ouvinte e podcaster) por ordem alfabética - Geral
	static async findAllAlfabetico() {
		const [results] = await this.sequelize.query(
			'select distinct a.usu_nome, a.usu_id, a.usu_status, b.tus_id, b.tus_descricao from usu_usuario a join tus_tipo_usuario b on a.tus_id = b.tus_id  where a.tus_id <= 2 order by a.usu_nome;'
		);

		return results;
	}

	//Seleciona todos usuários (ouvinte e podcaster) por ordem alfabética - Ativados
	static async findAllAlfabeticoAtivado() {
		const [results] = await this.sequelize.query(
			'select distinct a.usu_nome, a.usu_id, a.usu_status, b.tus_descricao from usu_usuario a join tus_tipo_usuario b on a.tus_id = b.tus_id  where a.tus_id <= 2 and a.usu_status = true order by a.usu_id'
		);

		return results;
	}

	//Seleciona todos usuários (ouvinte e podcaster) por ordem alfabética - Desativados
	static async findAllAlfabeticoDesativado() {
		const [results] = await this.sequelize.query(
			'select distinct a.usu_nome, a.usu_id, a.usu_status, b.tus_descricao from usu_usuario a join tus_tipo_usuario b on a.tus_id = b.tus_id  where a.tus_id <= 2 and a.usu_status = false order by a.usu_id'
		);

		return results;
	}

	//Seleciona todos usuários (ouvinte e podcaster) por Nome
	static async findAllAlfabeticoDesativado() {
		const [results] = await this.sequelize.query(
			'select distinct a.usu_nome, a.usu_id, a.usu_status, b.tus_id, b.tus_descricao from usu_usuario a join tus_tipo_usuario b on a.tus_id = b.tus_id  where a.tus_id <= 2 and a.usu_nome like %?% order by a.usu_nome'
		);

		return results;
	}

	// Exibe todos Usuarios (ouvinte e Podcaster) por ordem alfabética com seu tipo de usuario
	static async findUsuarioNome(data) {
		const [results] = await this.sequelize.query(
			'select distinct a.usu_nome, a.usu_id, a.usu_status, b.tus_id, b.tus_descricao from usu_usuario a join tus_tipo_usuario b on a.tus_id = b.tus_id  where a.tus_id <= 2 and a.usu_nome like ?usu_nome order by a.usu_nome',
			{
				replacements: [data],
				type: QueryTypes.SELECT,
				nest: true
			}
		);

		return results;
	}

	// Seleciona Ouvinte
	static async findAllOuvinte() {
		const [results] = await this.sequelize.query(
			'SELECT * FROM usu_usuario where tus_id = 1 ORDER BY usu_id'
		);

		return results;
	}

	// Exibe todos OUVINTES
	static async findOuvinte(data) {
		const [results] = await this.sequelize.query(
			'select distinct a.usu_nome, a.usu_id, a.usu_status, b.tus_id, b.tus_descricao from usu_usuario a join tus_tipo_usuario b on a.tus_id = b.tus_id  where a.tus_id = 1 order by a.usu_id',
			{
				replacements: [data],
				type: QueryTypes.SELECT,
				nest: true
			}
		);

		return results;
	}

	// Exibe todos OUVINTES por ordem alfabética com seu tipo de usuario
	static async findOuvinte(data) {
		const [results] = await this.sequelize.query(
			'select distinct a.usu_nome, a.usu_id, a.usu_status, b.tus_id, b.tus_descricao from usu_usuario a join tus_tipo_usuario b on a.tus_id = b.tus_id  where a.tus_id = 1 order by a.usu_id',
			{
				replacements: [data],
				type: QueryTypes.SELECT,
				nest: true
			}
		);

		return results;
	}

	// Exibe todos PODCASTERS
	static async findPodcasters(data) {
		const [results] = await this.sequelize.query(
			'SELECT * FROM usu_usuario where tus_id = 2 ORDER BY usu_id'
		);

		return results;
	}
}

module.exports = User;
