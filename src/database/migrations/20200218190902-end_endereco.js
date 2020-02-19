'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('end_endereco', {
			end_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			end_link: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: false
			},
			pod_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: 'CASCADE',
				references: { model: 'pod_podcast', key: 'pod_id' }
			}
		});
	},

	down: (queryInterface, Sequelize) => {}
};
