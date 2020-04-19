const { Model, DataTypes, QueryTypes } = require('sequelize');

class Comentario extends Model {
	static init(sequelize) {
		super.init(
			{
				cmt_conteudo: DataTypes.TEXT,
				pod_datacriacao: DataTypes.DATE,
				pod_status: DataTypes.BOOLEAN,
			},
			{ sequelize }
		);
	}

	static associate(models) {
		this.belongsTo(models.Tag, { foreignKey: 'tag_id' });
	}

	static async createComentario(data) {
		try {
			const [result] = await this.sequelize.query(
				'INSERT INTO cmt_comentario(cmt_conteudo,cmt_datacriacao,cmt_status,usu_id,pod_id,tag_id) values (?)',
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

	static async findComentariosByPodcast(podid) {
		const results = await this.sequelize.query(
			'select a.cmt_conteudo, a.cmt_id, b.usu_id, b.usu_nome, c.pod_id, c.pod_nome, d.tag_descricao from usu_usuario b join cmt_comentario a on a.usu_id = b.usu_id join pod_podcast c on a.pod_id = c.pod_id join tag_tag d on a.tag_id = d.tag_id where c.pod_id = :pod_id',
			{
				replacements: { pod_id: podid },
				type: QueryTypes.SELECT,
			}
		);
		return results;
	}

	static async findComentariosByPodcastUser(podid, usuid) {
		const results = await this.sequelize.query(
			'select a.cmt_conteudo, a.cmt_id, b.usu_id, b.usu_nome, c.pod_id, c.pod_nome, d.tag_descricao from usu_usuario b join cmt_comentario a on a.usu_id = b.usu_id join pod_podcast c on a.pod_id = c.pod_id join tag_tag d on a.tag_id = d.tag_id where c.pod_id = :pod_id and b.usu_id = :usu_id',
			{
				replacements: { pod_id: podid, usu_id: usuid },
				type: QueryTypes.SELECT,
			}
		);
		return results;
	}
}

module.exports = Comentario;
