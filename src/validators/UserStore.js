const Yup = require('yup');


module.exports.validation = async function(req, res, next){
    try{
        const schema = Yup.object().shape({
            email: Yup.string().email('Insira um email valido').required('O email é obrigario'),
            senha: Yup.string().required('Senha é obrigadoria').min(6)
        });

        await schema.validate(req.body,{ abortEarly: false})

       return next();
        
    }catch(err){
        return res.status(400).json({error: 'Validation fails', messages: err.inner})
    }
}



