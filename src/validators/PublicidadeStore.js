const Yup = require("yup");
module.exports.validation = async function (req, res, next) {
  try {
    const schema = Yup.object().shape({
      pub_descricao: Yup.string()
        .required("Campo obrigatório!")
        .max(256)
        .trim(),
      pub_link: Yup.string().required("Campo obrigatório!").max(256).trim(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: "Validation fails", messages: err.inner });
  }
};
