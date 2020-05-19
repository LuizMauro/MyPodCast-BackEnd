const { Model, DataTypes, QueryTypes } = require('sequelize');

class View extends Model {
	static init(sequelize) {
		super.init(
			{
				vie_data: DataTypes.DATE,
			},
			{ sequelize }
		);
	}

	static associate(models) {
		this.belongsTo(models.PodCast, { foreignKey: 'pod_id' });
		this.belongsTo(models.User, { foreignKey: 'usu_id' });
	}

	static async create(data) {
		try {
			const [result] = await this.sequelize.query(
				'INSERT INTO vie_view (vie_data, pod_id, usu_id) values (?)',
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

	static async find(podid) {
		const [results] = await this.sequelize.query(
			'Select * from vie_view where pod_id = :pod_id',
			{
				replalcements: { pod_id: podid },
				type: QueryTypes.SELECT,
				nest: true,
			}
		);

		return results;
    }
    
	static async findPodUser(podid,usuid) {
		const [results] = await this.sequelize.query(
			'Select * from vie_view where pod_id = :pod_id and usu_id = :usu_id ORDER BY vie_data DESC limit 1',
			{
				replalcements: { pod_id: podid, usu_id: usuid },
				type: QueryTypes.SELECT,
				nest: true,
			}
		);

		return results;
	}

	static async count(podid) {
		const [results] = await this.sequelize.query(
			'Select count(pod_id) from vie_view where pod_id = :pod_id',
			{
				replalcements: { pod_id: podid },
				type: QueryTypes.SELECT,
				nest: true,
			}
		);

		return results;
	}
}

module.exports = View;
