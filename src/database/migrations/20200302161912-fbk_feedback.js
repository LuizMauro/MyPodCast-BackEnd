'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('fbk_feedback', {
			fbk_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			fbk_datacriacao: {
				type: Sequelize.DATE,
				allowNull: false,
				unique: false
			},
			fbk_status: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			},
			fbk_valor: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			fbk_valor_status: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			},
			usu_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'usu_usuario', key: 'usu_id' }
			},
			pod_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'pod_podcast', key: 'pod_id' }
			},
			tfb_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'tfb_tipo_feedback', key: 'tfb_id' }
			}
		});
	},

	down: (queryInterface, Sequelize) => {}
};
