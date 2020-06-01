const { Model, DataTypes, QueryTypes } = require('sequelize');

class Assinatura extends Model {
	static init(sequelize) {
		super.init(
			{
				ass_status: DataTypes.BOOLEAN,
				ass_datainicio: DataTypes.DATE,
				ass_datafim: DataTypes.DATE,
				ass_preco: DataTypes.DOUBLE,
			},
			{ sequelize }
		);
	}

	static associate(models) {
		this.belongsTo(models.Plano, { foreignKey: 'pln_id' });
		this.belongsTo(models.User, { foreignKey: 'usu_id' });
		this.belongsTo(models.FormaPagamento, { foreignKey: 'fpg_id' });
	}

	static async findAll() {
		const [results] = await this.sequelize.query(
			'SELECT a.*, b.*, c.*, d.usu_nome, d.usu_email, d.usu_cpf FROM ass_assinatura a join pln_plano b on a.pln_id = b.pln_id join fpg_forma_pagamento c on a.fpg_id = c.fpg_id join usu_usuario d on d.usu_id = a.usu_id'
		);

		return results;
	}

	static async findOne(usuid) {
		try {
			const [result] = await this.sequelize.query(
				'SELECT a.*, b.*, c.*, d.usu_nome, d.usu_email, d.usu_cpf FROM ass_assinatura a join pln_plano b on a.pln_id = b.pln_id join fpg_forma_pagamento c on a.fpg_id = c.fpg_id join usu_usuario d on d.usu_id = a.usu_id where a.usu_id = :usu_id',
				{
					replacements: { usu_id: usuid },
					type: QueryTypes.SELECT,
					nest: true,
				}
			);
			return result;
		} catch (err) {
			return false;
		}
	}

	static async countAll(usuid) {
		try {
			const [result] = await this.sequelize.query(
				'select count(ass_id) as qtd_total, sum(ass_preco) as valor_total from ass_assinatura where ass_status = 1',
				{
					replacements: { usu_id: usuid },
					type: QueryTypes.SELECT,
					nest: true,
				}
			);
			return result;
		} catch (err) {
			return false;
		}
	}

	static async countMensal(usuid) {
		try {
			const [result] = await this.sequelize.query(
				'select count(ass_id) as qtd_mensal, sum(ass_preco) as valor_mensal from ass_assinatura where ass_status = 1 and pln_id = 1',
				{
					replacements: { usu_id: usuid },
					type: QueryTypes.SELECT,
					nest: true,
				}
			);
			return result;
		} catch (err) {
			return false;
		}
	}

	static async countAnual(usuid) {
		try {
			const [result] = await this.sequelize.query(
				'select count(ass_id) as qtd_anual, sum(ass_preco) as valor_anual from ass_assinatura where ass_status = 1 and pln_id = 2',
				{
					replacements: { usu_id: usuid },
					type: QueryTypes.SELECT,
					nest: true,
				}
			);
			return result;
		} catch (err) {
			return false;
		}
	}

	static async create(data) {
		try {
			const [result] = await this.sequelize.query(
				'INSERT INTO ass_assinatura (ass_status,ass_datainicio,ass_datafim,ass_preco,usu_id,pln_id,fpg_id) values (?)',
				{
					replacements: [data],
					type: QueryTypes.INSERT,
					nest: true,
				}
			);
			return result;
		} catch (err) {
			return false;
		}
	}

	//Selecionando Usuário Comum e Podcaster para opção de cadastro
	static async edit(assid, usuid, plnid, assdatafim, asspreco, fpgid) {
		try {
			const [result] = await this.sequelize.query(
				'update ass_assinatura set ass_datafim = :ass_datafim, pln_id = :pln_id, ass_preco = :ass_preco, fpg_id = :fpg_id  where ass_id = :ass_id and usu_id = :usu_id',
				{
					replacements: {
                        pln_id: plnid,
                        usu_id: usuid,
						ass_id: assid,
                        ass_datafim: assdatafim,
                        ass_preco: asspreco,
                        fpg_id: fpgid
					},
					type: QueryTypes.UPDATE,
					nest: true,
				}
			);
			return true;
		} catch (err) {
			return false;
		}
	}
}

module.exports = Assinatura;
