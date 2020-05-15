'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('usu_usuario', {
			usu_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			usu_nome: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			usu_senha: {
				type: Sequelize.STRING,
				allowNull: false
			},
			usu_email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			usu_cpf: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			usu_status: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			},
			usu_premium: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			},
			usu_reset_token:{
				type:Sequelize.STRING,
				allowNull:true,
			},
			usu_reset_expires:{
				type:Sequelize.DATE,
				allowNull:true
			},
			tus_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'tus_tipo_usuario', key: 'tus_id' }
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
