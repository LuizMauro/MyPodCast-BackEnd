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

		const vie_data = new Date();
		const datenow = new Date();
		datenow.setHours(datenow.getHours() - 24);
		console.log('a nova data', datenow);

		const viewatual = await View.findPodUser(pod_id, userId);
		console.log('data registrada', viewatual.vie_data);

		if (datenow <= viewatual.vie_data) {
			console.log('não faz 1 dia ');
			return resp.json({ mensagem: 'nao faz 1 dia' });
		} else {
			console.log('faz 1 dia');
			const data = [vie_data, pod_id, userId];
			const id = await View.create(data);

			if (!id) {
				return resp.json({ mensagem: 'View não contabilizada', _id: id });
			}
			return resp.json({ mensagem: 'View contabilizada!', _id: id });
		}
	},
};
