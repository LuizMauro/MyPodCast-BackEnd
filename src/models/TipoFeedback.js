const { Model, DataTypes, QueryTypes } = require('sequelize');

class TipoFeedback extends Model {
	static init(sequelize) {
		super.init(
			{
				tfb_descricao: DataTypes.STRING,
				tfb_status: DataTypes.BOOLEAN,
				tfb_datacriacao: DataTypes.DATE,
				tfb_valor_min: DataTypes.INTEGER,
				tfb_valor_max: DataTypes.INTEGER
			},
			{ sequelize }
		);
	}

	static associate(models) {}

	static async createTipoFeedback(data) {
		try {
			const [result] = await this.sequelize.query(
				'INSERT INTO tfb_tipo_feedback (tfb_descricao, tfb_status, tfb_datacriacao, tfb_valor_min, tfb_valor_max) values (?)',
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

	static async findAllTipoFeedback() {
		const [results] = await this.sequelize.query(
			'SELECT * FROM tfb_tipo_feedback'
		);

		return results;
	}
}

module.exports = TipoFeedback;
