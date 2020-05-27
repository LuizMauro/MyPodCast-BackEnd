'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('ass_assinatura', {
			ass_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			ass_status: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				unique: false,
			},
			ass_datainicio: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			ass_datafim: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			ass_preco: {
				type: Sequelize.DOUBLE,
				allowNull: false,
			},
			usu_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'usu_usuario', key: 'usu_id' },
			},
			pln_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'pln_plano', key: 'pln_id' },
			},
			fpg_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'fpg_forma_pagamento', key: 'fpg_id' },
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
	},
};
