const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

//models import
const User = require('../models/User');
const TipoUser = require('../models/TipoUsuario');
const Categoria = require('../models/Categoria');
const PodCast  = require('../models/PodCast');
// final models import

const connection = new Sequelize(dbConfig);

// inicialização dos models
User.init(connection);
TipoUser.init(connection);
Categoria.init(connection);
PodCast.init(connection);
//final inicialização dos models

//associate dos models
User.associate(connection.models);
PodCast.associate(connection.models);
//final associate dos models

module.exports = connection;
