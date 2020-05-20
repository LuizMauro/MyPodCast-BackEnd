const View = require('../models/View');

module.exports = {
	async read(req, resp) {

		return resp.json({teste: 'oi'});
	},
};
