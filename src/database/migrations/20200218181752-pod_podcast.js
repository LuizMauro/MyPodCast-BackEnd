'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('pod_podcast', {
			pod_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			pod_nome: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: false
			},
			pod_descricao: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			pod_criador: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: false
			},
			pod_anocriacao: {
				type: Sequelize.INTEGER,
				allowNull: false,
				unique: false
			},
			pod_duracao: {
				type: Sequelize.INTEGER,
				allowNull: false,
				unique: false
			},
			pod_endereco_img: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			pod_status: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				unique: false
			},
			pod_permissao: {
				type: Sequelize.INTEGER,
				allowNull: false,
				unique: false
			},
			pod_destaque: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				unique: false
			},
			usu_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'usu_usuario', key: 'usu_id' }
			}
		});
	},

	down: (queryInterface, Sequelize) => {}
};
