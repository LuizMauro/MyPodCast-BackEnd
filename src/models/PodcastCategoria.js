const { Model, DataTypes, QueryTypes } = require('sequelize');

class PodcastCategoria extends Model {
	static init(sequelize) {
		super.init({}, { sequelize });
	}

	static associate(models) {}

	static async createPodcastCategoria(data) {
		try {
			const [result] = await this.sequelize.query(
				'INSERT INTO pct_podcast_categoria(pod_id, ctg_id) values (?)',
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

	static async findAllPodcastCategoria() {
		const [results] = await this.sequelize.query(
			'SELECT * FROM pct_podcast_categoria'
		);

		return results;
	}
}

module.exports = PodcastCategoria;
