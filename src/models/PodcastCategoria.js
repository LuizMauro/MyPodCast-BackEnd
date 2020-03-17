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
			'select a.pod_id, a.pod_nome, a.pod_anocriacao, a.pod_descricao, a.pod_endereco_img, a.pod_criador, a.pod_duracao, a.pod_status, a.pod_destaque, a.pod_permissao, a.usu_id, group_concat(distinct c.ctg_id) as ctg_id, group_concat(distinct c.ctg_descricao) as ctg_descricao, group_concat(distinct d.end_link) as end_link from pod_podcast a join pct_podcast_categoria b on a.pod_id = b.pod_id join ctg_categoria c on b.ctg_id = c.ctg_id join end_endereco d on a.pod_id = d.pod_id  where a.pod_status = true and a.pod_permissao = 1 group by a.pod_id'
		);

		return results;
	}

	//VERIFICA SE NOME DO PODCAST EXISTE
	static async validaPodcastNome(podnome) {
		const [results] = await this.sequelize.query(
			' select pod_id from pod_podcast where pod_status = true and pod_permissao = 1 and pod_nome = :pod_nome',
			{
				replacements: { pod_nome: podnome },
				type: QueryTypes.SELECT
			}
		);

		return results;
	}

	//VERIFICA SE DESCRIÇÃO DO PODCAST EXISTE
	static async validaPodcastDescricao(poddescricao) {
		const [results] = await this.sequelize.query(
			' select pod_id from pod_podcast where pod_status = true and pod_permissao = 1 and pod_descricao = :pod_descricao',
			{
				replacements: { pod_descricao: poddescricao },
				type: QueryTypes.SELECT
			}
		);

		return results;
	}

	//VERIFICA SE LINKS DO PODCAST EXISTE
	static async validaPodcastLink(endlink, endlink2, endlink3) {
		const [results] = await this.sequelize.query(
			'select a.end_link from end_endereco a join pod_podcast b on a.pod_id = b.pod_id where b.pod_status = 1 and b.pod_permissao = 1 and end_link in (:end_link, :end_link2, :end_link3) and end_link != "https://" ',
			{
				replacements: {
					end_link: endlink,
					end_link2: endlink2,
					end_link3: endlink3
				},
				type: QueryTypes.SELECT
			}
		);

		return results;
	}

	//Podcast pelo ID
	static async findPodcastsByID(podID) {
		const [results] = await this.sequelize.query(
			' select a.pod_id, a.pod_nome, a.pod_anocriacao, a.pod_descricao, a.pod_endereco_img, a.pod_criador, a.pod_duracao, a.pod_status, a.pod_destaque, a.pod_permissao, a.usu_id, c.ctg_id, group_concat(distinct c.ctg_descricao) as ctg_descricao, group_concat(distinct d.end_link) as end_link from pod_podcast a join pct_podcast_categoria b on a.pod_id = b.pod_id join ctg_categoria c on b.ctg_id = c.ctg_id join end_endereco d on a.pod_id = d.pod_id  where a.pod_id = :pod_id and a.pod_status = true and a.pod_permissao = 1 group by a.pod_id;',
			{
				replacements: { pod_id: podID },
				type: QueryTypes.SELECT
			}
		);
		return results;
	}

	// Podcasts pelo ID da categoria
	static async findPodcastsByCtgID(ctgid) {
		const results = await this.sequelize.query(
			'select a.pod_nome, a.pod_id, a.pod_endereco_img,  group_concat(c.ctg_descricao) as ctg_descricao from pod_podcast a join pct_podcast_categoria b on a.pod_id = b.pod_id join ctg_categoria c on b.ctg_id = c.ctg_id where c.ctg_id = :ctg_id and a.pod_status = true and a.pod_permissao = 1 group by pod_id',
			{
				replacements: { ctg_id: ctgid },
				type: QueryTypes.SELECT
			}
		);
		return results;
	}

	// Podcasts pelo ID da categoria e pelo nome
	static async findPodcastsByCtgNome(ctgid, podnome) {
		const results = await this.sequelize.query(
			'select a.pod_nome, a.pod_id, a.pod_endereco_img, group_concat(c.ctg_descricao) as ctg_descricao  from pod_podcast a join pct_podcast_categoria b on a.pod_id = b.pod_id join ctg_categoria c on b.ctg_id = c.ctg_id where c.ctg_id = :ctg_id and a.pod_nome like :pod_nome and a.pod_status = true and a.pod_permissao = 1 group by pod_id',
			{
				replacements: { ctg_id: ctgid, pod_nome: `%${podnome}%` },
				type: QueryTypes.SELECT
			}
		);
		return results;
	}

	//RETORNA CATEGORIAS E INFOS DE PESQUISA DE UM PODCAST PELO ID
	static async findCtgById(podid) {
		const results = await this.sequelize.query(
			'select c.pod_nome, c.pod_id, c.pod_endereco_img, group_concat(a.ctg_descricao) as ctg_descricao from ctg_categoria a join pct_podcast_categoria b on a.ctg_id = b.ctg_id join pod_podcast c on b.pod_id = c.pod_id where c.pod_id in :pod_id group by c.pod_id',
			{
				replacements: { pod_id: podid },
				type: QueryTypes.SELECT
			}
		);
		return results;
	}

	//PODCASTS pelo nome
	static async findPodcastsByNome(ctgid, podnome) {
		const results = await this.sequelize.query(
			'  select a.pod_id, a.pod_nome, a.pod_descricao, a.pod_endereco_img, a.pod_criador, a.pod_duracao, a.pod_status, a.pod_destaque, a.pod_permissao, a.usu_id, c.ctg_id, group_concat(c.ctg_descricao) as ctg_descricao  from pod_podcast a join pct_podcast_categoria b on a.pod_id = b.pod_id join ctg_categoria c on b.ctg_id = c.ctg_id where c.ctg_id = :ctg_id and a.pod_nome like :pod_nome and a.pod_status = true and a.pod_permissao = 1 group by pod_nome;',
			{
				replacements: { ctg_id: ctgid, pod_nome: `%${podnome}%` },
				type: QueryTypes.SELECT
			}
		);
		return results;
	}
}

module.exports = PodcastCategoria;
