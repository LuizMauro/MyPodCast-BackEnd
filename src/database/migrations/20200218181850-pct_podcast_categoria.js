'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('pct_podcast_categoria', {
			pct_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			pod_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: 'CASCADE',
				references: { model: 'pod_podcast', key: 'pod_id' }
			},
			ctg_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: 'CASCADE',
				references: { model: 'ctg_categoria', key: 'ctg_id' }
			}
		});
	},

	down: (queryInterface, Sequelize) => {}
};
