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

		const vie_data = new Date();
		const datenow = new Date();
		datenow.setHours(datenow.getHours() - 4);
		console.log('a nova data', datenow);

		const check = await View.findPodUserCheck(pod_id, userId);

		if (check) {
			const viewatual = await View.findPodUser(pod_id, userId);
			console.log('data registrada', viewatual.vie_data);

			if (datenow <= viewatual.vie_data) {
				console.log('não faz 1 hora ');
				return resp.json({ mensagem: 'nao faz 1 hora' });
			} else {
				console.log('já fez 1 hora');
				const data = [vie_data, pod_id, userId];
				const id = await View.create(data);

				if (!id) {
					return resp.json({ mensagem: 'View não contabilizada', _id: id });
				}
				return resp.json({ mensagem: 'View contabilizada!', _id: id });
			}
		}

		const data = [vie_data, pod_id, userId];
		const id = await View.create(data);

		if (!id) {
			return resp.json({ mensagem: 'View não contabilizada', _id: id });
		}
		return resp.json({ mensagem: 'View contabilizada!', _id: id });
	},

	async create(req, resp) {
		const { pod_id, vie_ip } = req.params;

		const vie_data = new Date();
		const datenow = new Date();
		datenow.setHours(datenow.getHours() - 4);
		console.log('a nova data', datenow);

		const check = await View.findPodIPCheck(pod_id, vie_ip);
		console.log('checa usuario', check);

		if (check) {
			const viewatual = await View.findPodIp(pod_id, vie_ip);
			console.log('data registrada', viewatual.vie_data);

			if (datenow <= viewatual.vie_data) {
				console.log('não faz 1 hora ');
				return resp.json({ mensagem: 'nao faz 1 hora' });
			} else {
				console.log('faz 1 hora');
				const data = [vie_data, vie_ip, pod_id];
				const id = await View.createIP(data);

				if (!id) {
					return resp.json({ mensagem: 'View não contabilizada', _id: id });
				}
				return resp.json({ mensagem: 'View contabilizada!', _id: id });
			}
		}

		const data = [vie_data, vie_ip, pod_id];
		const id = await View.createIP(data);

		if (!id) {
			return resp.json({ mensagem: 'View não contabilizada', _id: id });
		}
		return resp.json({ mensagem: 'View contabilizada!', _id: id });
	},
};
