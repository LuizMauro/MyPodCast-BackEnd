const Endereco = require('../models/Endereco');

module.exports = {
	async index(req, resp) {
		const {pod_id} = req.params;

		const endereco = await Endereco.findEndereco(pod_id);

		return resp.json(endereco);
	},

	async store(req, resp) {
		const { link, pod_id } = req.body;

		//regras de negocio

		//final regras de negocio

		const data = [link, pod_id];
		const id = await Endereco.createEndereco(data);

		if (!id) {
			return resp.json({ mensagem: 'Erro ao criar endereco', _id: id });
		}
		return resp.json({ mensagem: 'Endereco criado com sucesso!', _id: id });
	}
};
