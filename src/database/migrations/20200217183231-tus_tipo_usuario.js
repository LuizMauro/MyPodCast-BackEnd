'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('tus_tipo_usuario', {
			tus_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			tus_descricao: {
				type: Sequelize.STRING,
				allowNull: true
			}
		});
	},

	down: (queryInterface, Sequelize) => {}
};
