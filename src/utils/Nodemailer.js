const path = require('path');
const mailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const transport = mailer.createTransport({
	host: 'smtp.mailtrap.io',
	port: 2525,
	auth: {
		user: 'bd7fa96954dfdd',
		pass: '3074b1b25085a4',
	},
});

transport.use(
	'compile',
	hbs({
		viewEngine: 'handlebars',
		viewPath: path.resolve('./src/resources/mail/'),
		extName: '.html',
	})
);

module.exports = transport;
