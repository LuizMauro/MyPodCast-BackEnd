const { Model, DataTypes, QueryTypes } = require('sequelize');

class Endereco extends Model {
	static init(sequelize) {
		super.init(
			{
				end_link: DataTypes.STRING
			},
			{ sequelize }
		);
	}

	static associate(models) {
		this.belongsTo(models.PodCast, { foreignKey: 'pod_id' });
	}

	static async createEndereco(data) {
		try {
			const [result] = await this.sequelize.query(
				'INSERT INTO end_endereco (end_link, pod_id) values (?)',
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

	static async findEndereco(podid) {
		const [results] = await this.sequelize.query(
			'Select * from end_endereco where pod_id = :pod_id',
			{
				replalcements: { pod_id: podid },
				type: QueryTypes.SELECT,
				nest: true
			}
		);

		return results;
	}
}

module.exports = Endereco;
