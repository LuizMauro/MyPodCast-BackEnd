const PodCast = require('../models/PodCast');

module.exports = {
	async store(req, resp) {
		const {
			pod_nome,
			pod_descricao,
			pod_criador,
			pod_anocriacao,
			pod_duracao,
			pod_endereco_img,
			pod_status,
			pod_permissao,
			pod_destaque,
			usu_id,
			end_link1,
			end_link2,
			end_link3,
			list_of_categoria
		} = req.body;

		//regras de negocio

		//final regras de negocio

		const id = await PodCast.callInsertProcedure(
			pod_nome,
			pod_descricao,
			pod_criador,
			pod_anocriacao,
			pod_duracao,
			pod_endereco_img,
			pod_status,
			pod_permissao,
			pod_destaque,
			usu_id,
			end_link1,
			end_link2,
			end_link3,
			list_of_categoria
		);

		if (!id) {
			return resp.json({
				mensagem: 'Procedure criar podcast NÃO funcinou!',
				_id: id
			});
		}
		return resp.json({
			mensagem: 'Procedure criar podcast funcinou',
			_id: id
		});
	}
};
