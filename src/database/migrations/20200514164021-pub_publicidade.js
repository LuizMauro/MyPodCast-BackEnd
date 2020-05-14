'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pub_publicidade', {
			pub_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			pub_descricao: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: false
			},
			pub_data_inicio: {
				type: Sequelize.DATE,
				allowNull: false,
				unique: false
			},
			pub_data_fim: {
				type: Sequelize.DATE,
				allowNull: false,
				unique: false
			},
			pub_endereco_img: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			pub_link: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: false
			},
			pub_status: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				unique: false
			},
			usu_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
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
