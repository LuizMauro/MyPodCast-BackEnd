'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cmt_comentario', {
			cmt_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			cmt_conteudo: {
				type: Sequelize.STRING(2000),
				allowNull: false,
			},
			cmt_datacriacao: {
				type: Sequelize.DATE,
				allowNull: false,
				unique: false,
			},
			cmt_status: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			usu_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'usu_usuario', key: 'usu_id' },
			},
			pod_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'pod_podcast', key: 'pod_id' },
			},
			tag_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'tag_tag', key: 'tag_id' },
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
