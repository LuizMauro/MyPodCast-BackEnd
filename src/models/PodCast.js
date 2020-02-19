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
		this.belongsToMany(models.Categoria, {
			through: 'pct_podcast_categoria',
			as: 'categorias',
			foreignKey: 'ctg_id'
		});
	}

	static async createPodCast(data) {
		try {
			const [result] = await this.sequelize.query(
				'INSERT INTO pod_podcast (pod_nome, pod_descricao, pod_criador, pod_anocriacao, pod_duracao, pod_endereco_img, pod_status, pod_permissao, pod_destaque, usu_id ) values (?)',
				{
					replacements: [data],
					type: QueryTypes.INSERT,
					nest: true
				}
			);
			return result;
		} catch (err) {
			console.log(err);
			return false;
		}
	}

	static async callInsertProcedure(
		nome,
		descricao,
		criador,
		anocriacao,
		duracao,
		endereco_img,
		status,
		permissao,
		destaque,
		usuid,
		link1,
		link2,
		link3,
		categoria_array
	) {
		try {
			const [result] = await this.sequelize.query(
				'call CriarPodcast(:pod_nome, :pod_descricao, :pod_criador, :pod_anocriacao, :pod_duracao, :pod_endereco_img, :pod_status, :pod_permissao, :pod_destaque, :usu_id, :end_link1, :end_link2, :end_link3, :list_of_categoria)',
				{
					replacements: {pod_nome:nome, pod_descricao:descricao, pod_criador:criador, pod_anocriacao:anocriacao, pod_duracao:duracao, pod_endereco_img:endereco_img, pod_status:status, pod_permissao:permissao, pod_destaque:destaque, usu_id:usuid, end_link1:link1, end_link2:link2, end_link3:link3, list_of_categoria:categoria_array},
					type: QueryTypes.INSERT,
					nest: true
				}
			);
			return result;
		} catch (err) {
			console.log(err);
			return false;
		}
	}

	static async buscaTodos() {
		const [results] = await this.sequelize.query('SELECT * FROM pod_podcast');

		return results;
	}
}

module.exports = PodCast;
