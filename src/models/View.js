const { Model, DataTypes, QueryTypes } = require('sequelize');

class View extends Model {
	static init(sequelize) {
		super.init(
			{
				vie_data: DataTypes.DATE,
				vie_ip: DataTypes.INTEGER,
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
			//	console.log(err);
			return false;
		}
	}

	static async createIP(data) {
		try {
			const [result] = await this.sequelize.query(
				'INSERT INTO vie_view (vie_data,vie_ip, pod_id) values (?)',
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

	static async findPodUser(podid, usuid) {
		const [results] = await this.sequelize.query(
			'select * from vie_view where pod_id = :pod_id and usu_id = :usu_id order by vie_id desc limit 1',
			{
				replacements: { pod_id: podid, usu_id: usuid },
				type: QueryTypes.SELECT,
				nest: true,
			}
		);

		return results;
	}

	static async findPodIp(podid, vieip) {
		const [results] = await this.sequelize.query(
			'select * from vie_view where pod_id = :pod_id and vie_ip = :vie_ip order by vie_id desc limit 1',
			{
				replacements: { pod_id: podid, vie_ip: vieip },
				type: QueryTypes.SELECT,
				nest: true,
			}
		);

		return results;
	}

	static async findPodUserCheck(podid, usuid) {
		try {
			const [results] = await this.sequelize.query(
				'select * from vie_view where pod_id = :pod_id and usu_id = :usu_id order by vie_id desc limit 1',
				{
					replacements: { pod_id: podid, usu_id: usuid },
					type: QueryTypes.SELECT,
					nest: true,
				}
			);

			return results;
		} catch (err) {
			return false;
		}
	}

	static async findPodIPCheck(podid, vieip) {
		try {
			const [results] = await this.sequelize.query(
				'select * from vie_view where pod_id = :pod_id and vie_ip = :vie_ip order by vie_id desc limit 1',
				{
					replacements: { pod_id: podid, vie_ip: vieip },
					type: QueryTypes.SELECT,
					nest: true,
				}
			);

			return results;
		} catch (err) {
			return false;
		}
	}

	static async countAll(podid) {
		const [results] = await this.sequelize.query(
			'Select count(vie_id) as qtd_viewtotal from vie_view where pod_id = :pod_id',
			{
				replacements: { pod_id: podid },
				type: QueryTypes.SELECT,
				nest: true,
			}
		);
		return results;
	}

	static async countLastWeek(podid) {
		const [results] = await this.sequelize.query(
			'Select count(vie_id) as qtd_viewweek from vie_view where pod_id = :pod_id and vie_data between date_sub(now(),INTERVAL 1 WEEK) and now();',
			{
				replacements: { pod_id: podid },
				type: QueryTypes.SELECT,
				nest: true,
			}
		);
		return results;
	}

	static async countLastMonth(podid) {
		const [results] = await this.sequelize.query(
			'Select count(vie_id) as qtd_viewmonth from vie_view where pod_id = :pod_id and vie_data between date_sub(now(),INTERVAL 1 MONTH) and now();',
			{
				replacements: { pod_id: podid },
				type: QueryTypes.SELECT,
				nest: true,
			}
		);
		return results;
	}

	static async countTopWeek() {
		const [results] = await this.sequelize.query(
			'Select pod_id as id, (select count(vie_id) from vie_view where pod_id = id) as qtd_viewtotal from vie_view where vie_data between date_sub(now(),INTERVAL 1 MONTH) and now() group by pod_id order by qtd_viewtotal desc limit 5'
		);
		return results;
	}
}

module.exports = View;
