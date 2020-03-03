const { Model, DataTypes, QueryTypes } = require('sequelize');

class Feedback extends Model {
	static init(sequelize) {
		super.init(
			{
				fbk_datacriacao: DataTypes.DATE,
				fbk_status: DataTypes.BOOLEAN,
				fbk_valor: DataTypes.INTEGER,
				tag_valor_boolean: DataTypes.BOOLEAN
			},
			{ sequelize }
		);
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'usu_id' });
		this.belongsTo(models.PodCast, { foreignKey: 'pod_id' });
		this.belongsTo(models.TipoFeedback, { foreignKey: 'tfb_id' });
	}

	//Cadastra os tipos de Feedback - Favoritar/Marcar como Pretendo Acompanhar/Acompanhando/Nota
	static async createFeedback(data) {
		try {
			const [result] = await this.sequelize.query(
				'INSERT INTO fbk_feedback (fbk_datacriacao, fbk_status, fbk_valor, fbk_valor_status, usu_id, pod_id, tfb_id) values (?)',
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

	//Muda status do Feedback (Desfavorita, Desmarca)
	static async updateFeedback(fbkid, fbkstatus, usuid) {
		try {
			const [result] = await this.sequelize.query(
				'update fbk_feedback set fbk_status = :fbk_status where fbk_id = :fbk_id and usu_id = :usu_id',
				{
					replacements: { fbk_id: fbkid, fbk_status: fbkstatus, usu_id: usuid },
					type: QueryTypes.UPDATE,
					nest: true
				}
			);
			return true;
		} catch (err) {
			return false;
		}
	}

	//Visualiza todos os feedbacks feitos
	static async findAllFeedback() {
		const results = await this.sequelize.query(
			' select a.usu_nome, b.pod_nome, b.pod_id, c.tfb_descricao, d.fbk_status from usu_usuario a join fbk_feedback d on a.usu_id  = d.usu_id join pod_podcast b on b.pod_id = d.pod_id join tfb_tipo_feedback c on c.tfb_id = d.tfb_id'
		);

		return results;
	}

	//Visualiza todos os Favoritos feitos para um podcast
	static async findFavorito(podid) {
		const [results] = await this.sequelize.query(
			'select a.usu_nome, b.pod_nome, c.tfb_descricao, d.fbk_id, d.fbk_status from usu_usuario a join fbk_feedback d on a.usu_id  = d.usu_id join pod_podcast b on b.pod_id = d.pod_id join tfb_tipo_feedback c on c.tfb_id = d.tfb_id where b.pod_id = ? and d.fbk_id = 1',
			{
				replacements: [podid],
				type: QueryTypes.SELECT,
				nest: true
			}
		);

		return results;
	}

	//Visualiza todos os Acompanhando feitos para um podcast
	static async findAcompanhando(podid) {
		const [results] = await this.sequelize.query(
			'select a.usu_nome, b.pod_nome, c.tfb_descricao, d.fbk_id, d.fbk_status from usu_usuario a join fbk_feedback d on a.usu_id  = d.usu_id join pod_podcast b on b.pod_id = d.pod_id join tfb_tipo_feedback c on c.tfb_id = d.tfb_id where b.pod_id = ? and d.fbk_id = 3',
			{
				replacements: [podid],
				type: QueryTypes.SELECT,
				nest: true
			}
		);

		return results;
	}

	//Visualiza todos os feedbacks feitos por um usuario
	static async findFeedbackUser(usuid) {
		const results = await this.sequelize.query(
			' select a.usu_nome, b.pod_nome, c.tfb_descricao, d.fbk_status from usu_usuario a join fbk_feedback d on a.usu_id  = d.usu_id join pod_podcast b on b.pod_id = d.pod_id join tfb_tipo_feedback c on c.tfb_id = d.tfb_id where a.usu_id = ?',
			{
				replacements: [usuid],
				type: QueryTypes.SELECT,
				nest: true
			}
		);

		return results;
	}
}

module.exports = Feedback;
