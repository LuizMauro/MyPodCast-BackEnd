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

	//Editar categoria (descricao)
	static async updateCtgDescricao(ctgdescricao, ctgid) {
		try {
			const [result] = await this.sequelize.query(
				'update ctg_categoria set ctg_descricao = :ctg_descricao where ctg_id = :ctg_id',
				{
					replacements: { ctg_descricao: ctgdescricao, ctg_id: ctgid },
					type: QueryTypes.UPDATE,
					nest: true
				}
			);
			return true;
		} catch (err) {
			return false;
		}
	}

	//Ativar/Desativar Categoria
	static async updateCtgStatus(ctgid, ctgstatus) {
		try {
			const [result] = await this.sequelize.query(
				'update ctg_categoria set ctg_status = :ctg_status where ctg_id = :ctg_id',
				{
					replacements: { ctg_status: ctgstatus, ctg_id: ctgid },
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

module.exports = Categoria;
