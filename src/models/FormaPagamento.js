const { Model, DataTypes, QueryTypes } = require('sequelize');

class FormaPagamento extends Model {
	static init(sequelize) {
		super.init(
			{
				fpg_datacriacao: DataTypes.DATE,
				ass_taxa: DataTypes.DOUBLE,
				fpg_status: DataTypes.BOOLEAN,
			},
			{ sequelize }
		);
	}

    static associate(models) {
    }
  
}

module.exports = FormaPagamento;
