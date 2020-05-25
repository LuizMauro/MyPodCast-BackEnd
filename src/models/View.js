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
				'INSERT INTO vie_view (vie_data, vie_tipo, pod_id, usu_id) values (?)',
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
				'INSERT INTO vie_view (vie_data,vie_ip,vie_tipo, pod_id) values (?)',
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
			'select * from vie_view where pod_id = :pod_id and vie_tipo = 0 and vie_ip = :vie_ip order by vie_id desc limit 1',
			{
				replacements: { pod_id: podid, vie_ip: vieip },
				type: QueryTypes.SELECT,
				nest: true,
			}
		);

		return results;
	}

	static async findIp(vieip) {
		const [results] = await this.sequelize.query(
			'select * from vie_view where vie_ip = :vie_ip and vie_tipo = 0 order by vie_id desc limit 1',
			{
				replacements: { vie_ip: vieip },
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
				'select * from vie_view where pod_id = :pod_id and vie_tipo = 0 and vie_ip = :vie_ip order by vie_id desc limit 1',
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


	static async findIPCheck( vieip) {
		try {
			const [results] = await this.sequelize.query(
				'select * from vie_view where vie_ip = :vie_ip and vie_tipo = 1 order by vie_id desc limit 1',
				{
					replacements: { vie_ip: vieip },
					type: QueryTypes.SELECT,
					nest: true,
				}
			);

			return results;
		} catch (err) {
			return false;
		}
	}

	static async countAll(podid,vietipo) {
		const [results] = await this.sequelize.query(
			'Select count(vie_id) as qtd_viewtotal from vie_view where pod_id = :pod_id and vie_tipo = :vie_tipo',
			{
				replacements: { pod_id: podid, vie_tipo: vietipo },
				type: QueryTypes.SELECT,
				nest: true,
			}
		);
		return results;
	}

	static async countLastWeek(podid,vietipo) {
		const [results] = await this.sequelize.query(
			'Select count(vie_id) as qtd_viewweek from vie_view where pod_id = :pod_id and vie_tipo = :vie_tipo and vie_data between date_sub(now(),INTERVAL 1 WEEK) and now();',
			{
				replacements: { pod_id: podid, vie_tipo:vietipo },
				type: QueryTypes.SELECT,
				nest: true,
			}
		);
		return results;
	}

	static async countLastMonth(podid,vietipo) {
		const [results] = await this.sequelize.query(
			'Select count(vie_id) as qtd_viewmonth from vie_view where pod_id = :pod_id and vie_tipo = :vie_tipo and vie_data between date_sub(now(),INTERVAL 1 MONTH) and now();',
			{
				replacements: { pod_id: podid, vie_tipo:vietipo },
				type: QueryTypes.SELECT,
				nest: true,
			}
		);
		return results;
	}

	static async countTopWeek() {
		const results = await this.sequelize.query(
			'select a.pod_id as id, b.pod_nome, (select count(vie_id) from vie_view where pod_id = id) as qtd_viewtotal from vie_view a join pod_podcast b on a.pod_id = b.pod_id where vie_tipo = 0 and a.vie_data between date_sub(now(),INTERVAL 1 MONTH) and now() group by a.pod_id order by qtd_viewtotal desc limit 5'
		);
		return results;
	}
}

module.exports = View;
