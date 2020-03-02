const Yup = require('yup');

module.exports.validation = async function(req, res, next){
    try{
        const schema = Yup.object().shape({

            nome: Yup.string().required('Seu nome é obrigatório').min(3).trim(),
            senha: Yup.string().required('A Senha é obrigadoria').min(6).trim(),
            email: Yup.string().email('Insira um email valido').required('O email é obrigario').trim(),
            cpf: Yup.string().required().trim().matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),

        });

        await schema.validate(req.body,{ abortEarly: false})

       return next();
    }catch(err){
        console.log(err);
        return res.status(400).json({error: 'Validation fails', messages: err.inner})
    }
}



