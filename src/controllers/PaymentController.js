const stripe = require('stripe')('sk_test_zjtujK8ml6cMsdAYpO4Xrb4k00TVzzxmHH');
const mailer = require('../utils/Nodemailer');

const calculateOrderAmount = (items) => {
	const amount = items.price;
	console.log(amount);
	return amount;
};

module.exports = {
	async index(req, res) {
		const { id } = req.params;
		console.log(req.params);

		await stripe.paymentIntents.capture(id, function (err, paymentIntent) {
			console.log('ERRO ->', err);
			console.log('SUCCS ->', paymentIntent);
		});

		res.json({ ok: 'ok' });
	},

	async create(req, res) {
		const { items } = req.body;
		//console.log("Item -> ", items[0]);

		console.log(items);

		const paymentIntent = await stripe.paymentIntents.create({
			amount: calculateOrderAmount(items),
			description: items.id,
			currency: 'brl',
		});

		console.log('PAYMENT->', paymentIntent);

		res.send({
			clientSecret: paymentIntent.client_secret,
			confirmation_method: 'automatic',
		});
	},

	async sendEmail(req, res) {
		const { usu_email, usu_nome, price, plano  } = req.body;
		console.log('email é', usu_email);

		mailer.sendMail(
			{
				to: usu_email,
				from: 'mypodcast@contato.com.br',
				template: 'payment/confirm',
				context: { usu_nome, price, plano  },
			},
			(err) => {
                console.log(err);
				return res.status(400).send({ error: 'error' });
			}
		);
	},
};
