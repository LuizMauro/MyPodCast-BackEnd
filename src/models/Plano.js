const { Model, DataTypes, QueryTypes } = require('sequelize');

class Plano extends Model {
	static init(sequelize) {
		super.init(
			{
				pln_status: DataTypes.BOOLEAN,
				pln_preco: DataTypes.DOUBLE,
				pln_descricao: DataTypes.STRING,
			},
			{ sequelize }
		);
	}

	static associate(models) {}

	static async findAll() {
		const [results] = await this.sequelize.query('SELECT * FROM pln_plano');

		return results;
	}

	static async findOne(plnid) {
		const [results] = await this.sequelize.query(
			'SELECT * FROM pln_plano where pln_id = :pln_id',
			{
				replacements: { pln_id: plnid },
				type: QueryTypes.SELECT,
				nest: true,
			}
		);

		return results;
	}

	static async create(data) {
		try {
			const [result] = await this.sequelize.query(
				'INSERT INTO pln_plano (pln_status,pln_preco,pln_descricao) values (?)',
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
	static async edit(plnid, plnpreco) {
		try {
			const [result] = await this.sequelize.query(
				'update pln_plano set pln_preco = :pln_preco where pln_id = :pln_id',
				{
					replacements: { pln_id: plnid, pln_preco: plnpreco },
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

module.exports = Plano;
