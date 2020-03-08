const { Model, DataTypes, QueryTypes } = require('sequelize');

class PodcastCategoria extends Model {
	static init(sequelize) {
		super.init({}, { sequelize });
	}

	static associate(models) {}

	static async createPodcastCategoria(data) {
		try {
			const [result] = await this.sequelize.query(
				'INSERT INTO pct_podcast_categoria(pod_id, ctg_id) values (?)',
				{
					replacements: [data],
					type: QueryTypes.INSERT,
					nest: true
				}
			);
			return result;
		} catch (err) {
			return false;
		}
	}

	static async findCtgByPodcastID(podid) {
		const results = await this.sequelize.query(
			'select c.pod_nome, a.ctg_id, a.ctg_descricao from ctg_categoria a join pct_podcast_categoria b on a.ctg_id = b.ctg_id join pod_podcast c on b.pod_id = c.pod_id where c.pod_id = :pod_id',
			{
				replacements: { pod_id: podid },
				type: QueryTypes.SELECT
			}
		);

		return results;
	}

	//Seleciona todos podcasts - INNER JOIN
	static async findAllPodcast() {
		const [results] = await this.sequelize.query(
			' select a.pod_id, a.pod_nome, a.pod_descricao, a.pod_endereco_img, a.pod_criador, a.pod_duracao, a.pod_status, a.pod_destaque, a.pod_permissao, a.usu_id, c.ctg_id, group_concat(c.ctg_descricao) as ctg_descricao from pod_podcast a join pct_podcast_categoria b on a.pod_id = b.pod_id join ctg_categoria c on b.ctg_id = c.ctg_id where a.pod_status = true and a.pod_permissao = 1 group by a.pod_id;'
		);

		return results;
	}

	static async findPodcastsByCtgID(ctgid) {
		const results = await this.sequelize.query(
			'select a.pod_nome, a.pod_id, a.pod_endereco_img, c.ctg_descricao from pod_podcast a join pct_podcast_categoria b on a.pod_id = b.pod_id join ctg_categoria c on b.ctg_id = c.ctg_id where c.ctg_id = :ctg_id and a.pod_status = true and a.pod_permissao = 1 order by pod_nome',
			{
				replacements: { ctg_id: ctgid },
				type: QueryTypes.SELECT
			}
		);
		return results;
	}

	static async findPodcastsByCtgNome(ctgid, podnome) {
		const [results] = await this.sequelize.query(
			' select a.pod_id, a.pod_nome, a.pod_descricao, a.pod_endereco_img, a.pod_criador, a.pod_duracao, a.pod_status, a.pod_destaque, a.pod_permissao, a.usu_id, c.ctg_id, group_concat(c.ctg_descricao) as ctg_descricao  from pod_podcast a join pct_podcast_categoria b on a.pod_id = b.pod_id join ctg_categoria c on b.ctg_id = c.ctg_id where c.ctg_id = :ctg_id and a.pod_nome like :pod_nome and a.pod_status = true and a.pod_permissao = 1 order by pod_nome',
			{
				replacements: { ctg_id: ctgid, pod_nome: `%${podnome}%` },
				type: QueryTypes.SELECT
			}
		);
		return results;
	}

	static async findPodcastsByNome(podnome) {
		const results = await this.sequelize.query(
			'select a.pod_endereco_img, a.pod_id, a.pod_nome, c.ctg_descricao from pod_podcast a join pct_podcast_categoria b on a.pod_id = b.pod_id join ctg_categoria c on b.ctg_id = c.ctg_id where a.pod_nome like :pod_nome and a.pod_status = true and a.pod_permissao = 1 order by pod_nome',
			{
				replacements: { pod_nome: `%${podnome}%` },
				type: QueryTypes.SELECT
			}
		);
		return results;
	}
}

module.exports = PodcastCategoria;
