'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('tag_tag', {
			tag_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			tag_descricao: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			tag_status: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			}
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('users');
	}
};
