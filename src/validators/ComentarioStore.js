const Yup = require("yup");
module.exports.validation = async function (req, res, next) {
  try {
    const schema = Yup.object().shape({
      cmt_conteudo: Yup.string()
        .required("Campo obrigatório!")
        .min(1)
        .max(2000)
        .trim(),
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
