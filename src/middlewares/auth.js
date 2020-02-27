const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/secretSession');


module.exports = async (req, resp, next) =>{
    const authHeader =  req.headers.authorization;

    if(!authHeader){
        return resp.status(401).json({message: 'Token not provided'});
    }

    const [ , token] = authHeader.split(' ');

    try{
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        req.userId = decoded.usu_id; 
        // quando o usuario loga automaticamente todas as rotas que contem esse middleware recebe o userId como parametro e nao precisa passar pela URL mais
       
        return next();
       
    }catch(err){
        return resp.status(401).json({error: 'Token invalid'});
    }
}