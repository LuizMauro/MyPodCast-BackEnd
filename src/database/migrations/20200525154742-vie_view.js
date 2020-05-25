'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('vie_view', {
			vie_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			vie_data: {
				type: Sequelize.DATE,
				allowNull: false,
				unique: false
			},
			vie_ip: {
				type: Sequelize.STRING,
				allowNull: true,
				unique: false
			},
			vie_tipo: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				unique: false
			},
			pod_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				onDelete: 'CASCADE',
				references: { model: 'pod_podcast', key: 'pod_id' }
			},
			usu_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				onDelete: 'CASCADE',
				references: { model: 'usu_usuario', key: 'usu_id' }
			}
		});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
