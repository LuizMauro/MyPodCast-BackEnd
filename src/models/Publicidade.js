const { Model, DataTypes, QueryTypes } = require('sequelize');

class Publicidade extends Model {
	static init(sequelize) {
		super.init(
			{
				pub_descricao: DataTypes.STRING,
				pub_data_inicio: DataTypes.DATETIME,
				pub_data_fim: DataTypes.DATETIME,
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
				'INSERT INTO pub_publicidade (pub_descricao,pub_data_inicio,pub_data_fim,pub_endereco_img,pub_status,usu_id) values (?)',
				{
					replacements: [data],
					type: QueryTypes.INSERT,
					nest: true,
				}
			);
			return result;
		} catch (err) {
			return false;
		}
	}

	static async findAll() {
		const [results] = await this.sequelize.query(
			'Select * from pub_publicidade where pub_status = 1'
		);

		return results;
    }
    
    static async update(pubid) {
		try {
			const [result] = await this.sequelize.query(
				'update pub_publicade set pub_descricao = :pub_descricao, pub_data_fim = :pub_data_fim, pub_endereco_img = :pub_endereco_img where pub_id = :pub_id',
				{
					replacements: { pub_id: pubid },
					type: QueryTypes.UPDATE,
					nest: true
				}
			);
			return true;
		} catch (err) {
			return false;
		}
	}

	static async delete(pubid) {
		try {
			const [result] = await this.sequelize.query(
				'update pub_publicidade set pub_status = 0 where pub_id = :pub_id',
				{
					replacements: { pub_id : pubid },
					type: QueryTypes.UPDATE,
					nest: true
				}
			);
			return true;
		} catch (err) {
			return false;
		}
	}
}

module.exports = Publicidade;
