const { Model, DataTypes, QueryTypes } = require('sequelize');

class TipoUsuario extends Model {
	static init(sequelize) {
		super.init(
			{
				tus_descricao: DataTypes.STRING
			},
			{ sequelize }
		);
	}

	static associate(models) {}

	static async createTipoUsuario(data) {
		try {
			const [result] = await this.sequelize.query(
				'INSERT INTO tus_tipo_usuario (tus_descricao) values (?)',
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

	//Selecionando Usuário Comum e Podcaster para opção de cadastro
	static async selectAll() {
		const [results] = await this.sequelize.query(
			'SELECT * FROM tus_tipo_usuario where tus_id between 1 and 2'
		);
		return results;
	}
}

module.exports = TipoUsuario;
