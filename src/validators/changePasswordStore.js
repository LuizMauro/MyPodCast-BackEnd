const Yup = require('yup');

module.exports.validation = async function (req, res, next) {
	try {
		const schema = Yup.object().shape({
			usu_senha: Yup.string()
				.required('Campo obrigatório!')
				.trim()
				.matches(
					/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&!@#%])[0-9a-zA-Z$*&!@#%]{6,45}$/
				),
		});
		await schema.validate(req.body, { abortEarly: false });

		return next();
	} catch (err) {
		console.log(err);
		return res
			.status(400)
			.json({ error: 'Validation fails', messages: err.inner });
	}
};
