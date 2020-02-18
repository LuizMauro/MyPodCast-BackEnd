const { Model, DataTypes, QueryTypes } = require('sequelize');

class PodCast extends Model {
	static init(sequelize) {
		super.init(
			{
                pod_nome: DataTypes.STRING,
                pod_descricao: DataTypes.STRING,
                pod_criador: DataTypes.STRING,
                pod_anocriacao: DataTypes.INTEGER,
                pod_duracao: DataTypes.INTEGER,
                pod_endereco_img: DataTypes.STRING,
                pod_status: DataTypes.BOOLEAN,
                pod_permissao: DataTypes.INTEGER,
                pod_destaque: DataTypes.BOOLEAN
			},
			{ sequelize }
		);
    }

	static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'usu_id' });
    }

	static async createPodCast(data) {
		try {
			const [result] = await this.sequelize.query(
				'INSERT INTO pod_podcast (pod_nome, pod_descricao,pod_criador,pod_anocriacao,pod_duracao,pod_endereco_img,pod_status,pod_permissao,pod_destaque, usu_id ) values (?)',
				{
					replacements: [data],
					type: QueryTypes.INSERT,
					nest: true
				}
			);
			return result;
		} catch (err) {
			console.log(err)
			return false;
		}
	}

	static async buscaTodos() {
		const [results] = await this.sequelize.query('SELECT * FROM pod_podcast');

		return results;
	}
}

module.exports = PodCast;
