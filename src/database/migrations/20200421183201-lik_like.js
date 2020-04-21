'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lik_like', {
			lik_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			lik_tipo: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				unique: false,
			},
			lik_datacriacao: {
				type: Sequelize.DATE,
				allowNull: false,
				unique: false,
			},
			lik_status: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			usu_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'usu_usuario', key: 'usu_id' },
			},
			cmt_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'cmt_comentario', key: 'cmt_id' },
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
