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


        if(decoded.tus_id !== 2){
            return resp.status(401).json({erro: 'Voce não é um podcaster'});
        }

        req.userId = decoded.usu_id;
        req.tipoUsuario = decoded.tus_id;
     
        return next();
       
    }catch(err){
        return resp.status(401).json({error: 'Token invalid'});
    }
}