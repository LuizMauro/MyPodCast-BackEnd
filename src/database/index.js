const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

//models import
const User = require('../models/User');
const TipoUser = require('../models/TipoUsuario');
const Categoria = require('../models/Categoria');
const PodCast = require('../models/PodCast');
const Endereco = require('../models/Endereco');
const PodcastCategoria = require('../models/PodcastCategoria');
const Tag = require('../models/Tag');
const TipoFeedback = require('../models/TipoFeedback');
// final models import

const connection = new Sequelize(dbConfig);

// inicialização dos models
User.init(connection);
TipoUser.init(connection);
Categoria.init(connection);
PodCast.init(connection);
Endereco.init(connection);
PodcastCategoria.init(connection);
Tag.init(connection);
TipoFeedback.init(connection);
//final inicialização dos models

//associate dos models
User.associate(connection.models);
PodCast.associate(connection.models);
Endereco.associate(connection.models);
PodcastCategoria.associate(connection.models);
//final associate dos models

module.exports = connection;
