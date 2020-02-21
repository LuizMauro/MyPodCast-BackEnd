const Tag = require('../models/Tag');

module.exports = {

	async index(req, resp) {
		const tags = await Tag.buscaTodos();

		return resp.json(tags);
	},

	async store(req, resp) {
		const { descricao } = req.body;	

        //regras de negocio
        
		//final regras de negocio

		const data = [ descricao, 1 ];
		const id = await Tag.createTag(data);

		if (!id) {
			return resp.json({ mensagem: 'Erro ao criar tag!', _id: id });
		}
		return resp.json({ mensagem: 'Tag criado com sucesso!', _id: id });
	}
};



