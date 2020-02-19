const { Model, DataTypes, QueryTypes } = require('sequelize');

class Categoria extends Model {
	static init(sequelize) {
		super.init(
			{
				ctg_descricao: DataTypes.STRING,
				ctg_status: DataTypes.BOOLEAN,
				ctg_datacriacao: DataTypes.DATE
			},
			{ sequelize }
		);
	}

	static associate(models) {
		/*this.belongsToMany(models.PodCast, {
			through: 'pct_podcast_categoria',
			as: 'podcasts',
			foreignKey: 'pod_id'
		});*/
	}

	static async createCategoria(data) {
		try {
			const [result] = await this.sequelize.query(
				'INSERT INTO ctg_categoria (ctg_descricao, ctg_status, ctg_datacriacao) values (?)',
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

	static async buscaTodos() {
		const [results] = await this.sequelize.query('SELECT * FROM ctg_categoria');

		return results;
	}
}

module.exports = Categoria;
