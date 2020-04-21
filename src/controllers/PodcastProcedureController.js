const PodCast = require('../models/PodCast');
const Pod = require('../models/PodcastCategoria');

module.exports = {
	//Procedure de Cadastro
	async store(req, resp) {
		const {
			pod_nome,
			pod_descricao,
			pod_criador,
			pod_anocriacao,
			pod_duracao,
			pod_permissao,
			end_link1,
			end_link2,
			end_link3,
			list_of_categoria
		} = req.body;

		const { userId } = req;

		if (req.file.length == 0) {
			return resp.json({ mensagem: 'Por favor escolha uma imagem' });
		}

		let link1 = null;
		let link2 = null;
		let link3 = null;

		if (!end_link1.includes('https://')) {
			link1 = `https://${end_link1}`;
		}
		if (!end_link2.includes('https://')) {
			link2 = `https://${end_link2}`;
		}
		if (!end_link3.includes('https://')) {
			link3 = `https://${end_link3}`;
		}

		const { originalname, filename, path } = req.file;

		//regras de negocio
		const verificaNome = await Pod.validaPodcastNome(pod_nome);

		if (verificaNome) {
			return resp.json({ nomeExists: true });
		}

		const verificaDescricao = await Pod.validaPodcastDescricao(pod_descricao);

		if (verificaDescricao) {
			return resp.json({ descricaoExists: true });
		}

		const verificaLink = await Pod.validaPodcastLink(link1, link2, link3);

		if (verificaLink) {
			return resp.json({ linkExists: true });
		}
		//final regras de negocio

		console.log("LISTA DE CATEGORIAS -> ", list_of_categoria);
		const id = await PodCast.callInsertProcedure(
			pod_nome,
			pod_descricao,
			pod_criador,
			pod_anocriacao,
			pod_duracao,
			filename,
			1,
			pod_permissao,
			0,
			userId,
			link1 ? link1 : end_link1,
			link2 ? link2 : end_link2,
			link3 ? link3 : end_link3,
			list_of_categoria
		);

		if (!id) {
			return resp.json({
				_id: id
			});
		}
		return resp.json({
			podCreated: true,
			_id: id
		});
	},

	//Procedure de Update
	async update(req, resp) {
		const {
			pod_nome,
			pod_descricao,
			pod_criador,
			pod_anocriacao,
			pod_duracao,
			pod_status,
			pod_permissao,
			pod_destaque,
			end_link1,
			end_link2,
			end_link3,
			list_of_categoria
		} = req.body;

		const { pod_id } = req.params;

		let imgfilename = null;

		if (req.file) {
			if (req.file.length == 0) {
				return resp.json({ mensagem: 'Por favor escolha uma imagem' });
			}
			const { originalname, filename } = req.file;
			imgfilename = filename
		}

		const atual = await Pod.findPodcastsByID(pod_id);
		//regras de negocio

		//final regras de negocio

		const id = await PodCast.callEditProcedure(
			pod_id,
			pod_nome,
			pod_descricao,
			pod_criador,
			pod_anocriacao,
			pod_duracao,
			req.file ? imgfilename : atual.pod_endereco_img,
			pod_status,
			pod_permissao,
			pod_destaque,
			end_link1,
			end_link2,
			end_link3,
			list_of_categoria
		);

		if (!id) {
			return resp.json({
				mensagem: 'Podcast NÃO FOI Editado!',
				_id: id
			});
		}
		return resp.json({
			mensagem: 'Podcast editado',
			_id: id
		});
	}
};
