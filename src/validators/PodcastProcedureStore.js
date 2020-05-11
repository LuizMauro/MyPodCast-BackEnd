const Yup = require("yup");
const { date } = require("../utils/Date");
module.exports.validation = async function(req, res, next) {  
  try {
    const schema = Yup.object().shape({
      pod_nome: Yup.string().required("Campo obrigatório!").max(45).trim(),
      pod_descricao: Yup.string()
        .required("Campo obrigatório!")
        .max(600)
        .trim(),
      pod_criador: Yup.string().required("Campo obrigatório!").max(45).trim(),
      pod_anocriacao: Yup.number()
        .required("Campo obrigatório!")
        .min(1980)
        .max(date(Date.now()).year),
      pod_duracao: Yup.number().required("Campo obrigatório!"),
      end_link1: Yup.string().required("Campo obrigatório!").max(256).trim(),
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
