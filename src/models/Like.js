const { Model, DataTypes, QueryTypes } = require('sequelize');

class Like extends Model {
	static init(sequelize) {
		super.init(
			{
				lik_tipo: DataTypes.BOOLEAN,
				tag_descricao: DataTypes.STRING,
				tag_status: DataTypes.BOOLEAN,
			},
			{ sequelize }
		);
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'usu_id' });
		this.belongsTo(models.Comentario, { foreignKey: 'cmt_id' });
	}

	static async create(data) {
		try {
			const [result] = await this.sequelize.query(
				'INSERT INTO lik_like (lik_tipo, lik_datacriacao, lik_status, usu_id, cmt_id) values (?)',
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

	static async findLike(cmtid) {
		const [results] = await this.sequelize.query(
			'select b.cmt_id, count(b.cmt_id) as qtd_likes from lik_like a join cmt_comentario b on a.cmt_id = b.cmt_id where b.cmt_status = 1 and a.lik_tipo = 1 and b.cmt_id = :cmt_id',
			{
				replacements: { cmt_id: cmtid },
				type: QueryTypes.SELECT,
			}
		);
		return [results];
	}

	static async findDislike(cmtid) {
		const [results] = await this.sequelize.query(
			'select b.cmt_id, count(b.cmt_id) as qtd_likes from lik_like a join cmt_comentario b on a.cmt_id = b.cmt_id where b.cmt_status = 1 and a.lik_tipo = 0 and b.cmt_id = :cmt_id',
			{
				replacements: { cmt_id: cmtid },
				type: QueryTypes.SELECT,
			}
		);
		return [results];
	}

	//Tirar Like/dislike
	static async updateLikeStatus(likid, likstatus, usuid) {
		try {
			const [result] = await this.sequelize.query(
				'update lik_like set lik_status = :lik_status where lik_id = :lik_id and usu_id = :usu_id',
				{
					replacements: {
						lik_id: likid,
						lik_status: likstatus,
						usu_id: usuid,
					},
					type: QueryTypes.UPDATE,
					nest: true,
				}
			);
			return true;
		} catch (err) {
			return false;
		}
	}

	//Mudar para like/dislike
	static async updateLikeTipo(likid, liktipo, usuid) {
		try {
			const [result] = await this.sequelize.query(
				'update lik_like set lik_tipo = :lik_tipo where lik_id = :lik_id and usu_id = :usu_id',
				{
					replacements: {
						lik_id: likid,
						lik_tipo: liktipo,
						usu_id: usuid,
					},
					type: QueryTypes.UPDATE,
					nest: true,
				}
			);
			return true;
		} catch (err) {
			return false;
		}
	}
}

module.exports = Like;
