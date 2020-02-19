'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('ctg_categoria', {
			ctg_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			ctg_descricao: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			ctg_status: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			},
			ctg_datacriacao: {
				type: Sequelize.DATE,
				allowNull: false
			}
		});
	},

	down: (queryInterface, Sequelize) => {}
};
