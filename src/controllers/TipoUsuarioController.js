const TipoUsuario = require('../models/TipoUsuario');


module.exports = {

    async index(req, resp){

       const teste = await TipoUsuario.buscaTodos();
       
       console.log(teste);

        if(!teste){
            return resp.json(teste)
        }
        return resp.json(teste)
    },

    async store(req, resp){

        const { descricao } = req.body;

        const data = [ descricao ]

        const id = TipoUsuario.createTipoUsuario(data);

       
        if(!id){
            return resp.json({ "mensagem": "Erro ao criar tipo de usuario!" , "_id": id})
        }
        return resp.json({ "mensagem": "Tipo de usuario criado com sucesso!" , "_id": id})

    }

    
}