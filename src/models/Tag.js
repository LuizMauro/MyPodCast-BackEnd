const { Model, DataTypes, QueryTypes } = require('sequelize');

class Tag extends Model {
	static init(sequelize) {
		super.init(
			{
				tag_descricao: DataTypes.STRING,
				tag_status: DataTypes.BOOLEAN
			},
			{ sequelize }
		);
	}

	static associate(models) {
		
	}

	static async createTag(data) {
		try {
			const [result] = await this.sequelize.query(
				'INSERT INTO tag_tag (tag_descricao, tag_status) values (?)',
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

	static async findAllTag() {
		const [results] = await this.sequelize.query('SELECT * FROM tag_tag');

		return results;
	}

	//Editar Tag
	static async updateTag(tagid, tagdescricao) {
		try {
			const [result] = await this.sequelize.query(
				'update tag_tag set tag_descricao = :tag_descricao where tag_id = :tag_id',
				{
					replacements: { tag_id: tagid, tag_descricao: tagdescricao },
					type: QueryTypes.UPDATE,
					nest: true
				}
			);
			return true;
		} catch (err) {
			return false;
		}
	}

	//Mudar status da tag
	static async updateTagStatus(tagid, tagstatus) {
		try {
			const [result] = await this.sequelize.query(
				'update tag_tag set tag_status = :tag_status where tag_id = :tag_id',
				{
					replacements: { tag_id: tagid, tag_status: tagstatus },
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

module.exports = Tag;
