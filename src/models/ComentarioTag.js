const { Model, DataTypes, QueryTypes } = require('sequelize');

class ComentarioTag extends Model {
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

	static async findCtgByPodcastID(podid) {
		const results = await this.sequelize.query(
			'select c.pod_nome, a.ctg_id, a.ctg_descricao from ctg_categoria a join pct_podcast_categoria b on a.ctg_id = b.ctg_id join pod_podcast c on b.pod_id = c.pod_id where c.pod_id = :pod_id',
			{
				replacements: { pod_id: podid },
				type: QueryTypes.SELECT
			}
		);

		return results;
	}

}

module.exports = ComentarioTag;
