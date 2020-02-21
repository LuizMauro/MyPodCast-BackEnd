const { Model, DataTypes, QueryTypes } = require('sequelize');

class Tag extends Model {
	static init(sequelize) {
		super.init(
			{
                tag_descricao: DataTypes.STRING,
                tag_status: DataTypes.BOOLEAN,
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
			console.log(err)
			return false;
		}
	}

	static async buscaTodos() {
		const [results] = await this.sequelize.query('SELECT * FROM tag_tag');

		return results;
	}
}

module.exports = Tag;
