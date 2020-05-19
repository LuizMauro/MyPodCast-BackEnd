const View = require('../models/View');

module.exports = {
	async read(req, resp) {
		const { pod_id } = req.params;

		const views = await View.count(pod_id);

		return resp.json(views);
	},

	async store(req, resp) {
		const { pod_id } = req.params;
        const { userId } = req;
        //console.log('ip do usuario',ipCliente)

		const datenow = new Date();
		//regras de negocio
		//final regras de negocio

		const data = [datenow, pod_id, userId];
		const id = await View.create(data);

		if (!id) {
			return resp.json({ mensagem: 'View não contabilizada', _id: id });
		}
		return resp.json({ mensagem: 'View contabilizada!', _id: id });
	},
};
