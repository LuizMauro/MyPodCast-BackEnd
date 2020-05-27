'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('fpg_forma_pagamento', {
			fpg_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			fpg_descricao: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			fpg_datacriacao: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			fpg_taxa: {
				type: Sequelize.DOUBLE,
				allowNull:false,
			},
			fpg_status: {
				type: Sequelize.BOOLEAN,
				allowNull:false,
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
