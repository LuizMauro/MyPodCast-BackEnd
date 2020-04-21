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
		this.belongsTo(models.Comentario, { foreignKey: 'id_comentario_pai' });
	}

	static async createComentario(data) {
		try {
			const [result] = await this.sequelize.query(
				'INSERT INTO cmt_comentario(cmt_conteudo,cmt_datacriacao,cmt_status,cmt_filho,usu_id,pod_id,tag_id,id_comentario_pai) values (?)',
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
			'select a.cmt_id, a.cmt_conteudo, a.cmt_filho, a.id_comentario_pai, b.usu_id, b.usu_nome, c.pod_id, c.pod_nome, d.tag_id, d.tag_descricao from usu_usuario b join cmt_comentario a on a.usu_id = b.usu_id join pod_podcast c on a.pod_id = c.pod_id join tag_tag d on a.tag_id = d.tag_id where c.pod_id = :pod_id and a.cmt_status = 1',
			{
				replacements: { pod_id: podid },
				type: QueryTypes.SELECT,
			}
		);
		return results;
	}

	static async findComentariosByPodcastUser(podid, usuid) {
		const results = await this.sequelize.query(
			'select a.cmt_id, a.cmt_conteudo, a.cmt_filho, a.id_comentario_pai, b.usu_id, b.usu_nome, c.pod_id, c.pod_nome, d.tag_id,d.tag_descricao from usu_usuario b join cmt_comentario a on a.usu_id = b.usu_id join pod_podcast c on a.pod_id = c.pod_id join tag_tag d on a.tag_id = d.tag_id where c.pod_id = :pod_id and b.usu_id = :usu_id and a.cmt_status = 1',
			{
				replacements: { pod_id: podid, usu_id: usuid },
				type: QueryTypes.SELECT,
			}
		);
		return results;
	}

	static async findComentariosByPodcastTag(podid, tagid) {
		const results = await this.sequelize.query(
			'select a.cmt_id, a.cmt_conteudo, a.cmt_filho, a.id_comentario_pai, b.usu_id, b.usu_nome, c.pod_id, c.pod_nome, d.tag_id,d.tag_descricao from usu_usuario b join cmt_comentario a on a.usu_id = b.usu_id join pod_podcast c on a.pod_id = c.pod_id join tag_tag d on a.tag_id = d.tag_id where c.pod_id = :pod_id and d.tag_id = :tag_id and a.cmt_status = 1',
			{
				replacements: { pod_id: podid, tag_id: tagid },
				type: QueryTypes.SELECT,
			}
		);
		return results;
	}

	static async updateComentario(cmtconteudo, podid, cmtid, usuid) {
		const results = await this.sequelize.query(
			'update cmt_comentario set cmt_conteudo = :cmt_conteudo where pod_id = :pod_id and usu_id = :usu_id and cmt_id = :cmt_id',
			{
				replacements: { cmt_conteudo: cmtconteudo, pod_id: podid, cmt_id: cmtid, usu_id: usuid },
				type: QueryTypes.UPDATE,
			}
		);
		return results;
	}

	static async updateComentarioStatus(podid, cmtid, usuid) {
		const results = await this.sequelize.query(
			'update cmt_comentario set cmt_status = 0 where pod_id = :pod_id and usu_id = :usu_id and cmt_id = :cmt_id',
			{
				replacements: {pod_id: podid, cmt_id: cmtid, usu_id: usuid },
				type: QueryTypes.UPDATE,
			}
		);
		return results;
	}	
}

module.exports = Comentario;
