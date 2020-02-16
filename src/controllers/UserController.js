const User = require('../models/User');


module.exports = {

    async index(req, resp){
        const users = await User.findAllUser();

        return resp.json(users);
    },

    async store(req, resp){

        const { nome, senha, email, cpf } = req.body;
        const data = [nome, senha, email, cpf];

        //regras de negocio

        //final regras de negocio

        const id = await User.createUser(data);

        if(!id){
            return resp.json({ "mensagem": "Erro ao criar usuario!" , "_id": id})
        }
        return resp.json({ "mensagem": "Usuario criado com sucesso!" , "_id": id})
     

    }

    
}