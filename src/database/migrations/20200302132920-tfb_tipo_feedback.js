'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('tfb_tipo_feedback', {
			tfb_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			tfb_descricao: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			tfb_status: {
				type: Sequelize.BOOLEAN,
				allowNull: false
      },
      tfb_datacriacao: {
				type: Sequelize.DATE,
				allowNull: false
      },
      tfb_valor_min: {
				type: Sequelize.INTEGER,
				allowNull: true
      },
      tfb_valor_max: {
				type: Sequelize.INTEGER,
				allowNull: true
			}
		});
	},

	down: (queryInterface, Sequelize) => {}
};
