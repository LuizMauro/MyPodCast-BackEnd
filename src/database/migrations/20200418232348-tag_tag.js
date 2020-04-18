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
			tfb_status: {
				type: Sequelize.BOOLEAN,
				allowNull: false
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
