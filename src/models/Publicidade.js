const { Model, DataTypes, QueryTypes } = require('sequelize');

class Publicidade extends Model {
	static init(sequelize) {
		super.init(
			{
				pub_descricao: DataTypes.STRING,
				pub_data_inicio: DataTypes.DATE,
				pub_data_fim: DataTypes.DATE,
				pub_endereco_img: DataTypes.STRING,
				pub_status: DataTypes.BOOLEAN,
			},
			{ sequelize }
		);
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'usu_id' });
	}

	static async create(data) {
		try {
			const [result] = await this.sequelize.query(
				'INSERT INTO pub_publicidade (pub_descricao,pub_data_inicio,pub_data_fim,pub_endereco_img,pub_link,pub_status,usu_id) values (?)',
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

	static async findAll() {
		const [results] = await this.sequelize.query(
			'Select * from pub_publicidade where pub_status = 1'
		);

		return results;
	}

	static async findOne(pubid) {
		const [results] = await this.sequelize.query(
			'Select * from pub_publicidade where pub_status = 1 and pub_id = :pub_id',
			{
				replacements: {
					pub_id: pubid,
				},
				type: QueryTypes.SELECT,
				nest: true,
			}
		);

		return results;
	}

	static async update(pubid, pubdescricao, pubdatafim, pubenderecoimg) {
		try {
			const [result] = await this.sequelize.query(
				'update pub_publicidade set pub_descricao = :pub_descricao, pub_data_fim = :pub_data_fim, pub_endereco_img = :pub_endereco_img where pub_id = :pub_id',
				{
					replacements: {
						pub_id: pubid,
						pub_descricao: pubdescricao,
						pub_data_fim: pubdatafim,
						pub_endereco_img: pubenderecoimg,
					},
					type: QueryTypes.UPDATE,
					nest: true,
				}
			);
			return true;
		} catch (err) {
			console.log(err);
			return false;
		}
	}

	static async delete(pubid) {
		try {
			const [result] = await this.sequelize.query(
				'update pub_publicidade set pub_status = 0 where pub_id = :pub_id',
				{
					replacements: { pub_id: pubid },
					type: QueryTypes.UPDATE,
					nest: true,
				}
			);
			return true;
		} catch (err) {
			console.log(err);
			return false;
		}
	}
}

module.exports = Publicidade;
