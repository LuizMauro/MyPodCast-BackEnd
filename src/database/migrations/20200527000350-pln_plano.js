'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pln_plano', {
			pln_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			pln_status: {
				type: Sequelize.BOOLEAN,
				allowNull: false
      },
			pln_preco: {
				type: Sequelize.DOUBLE,
				allowNull: false
      },
			pln_descricao: {
				type: Sequelize.STRING,
				allowNull: false
      },
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
