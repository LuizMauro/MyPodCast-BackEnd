'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
      return queryInterface.bulkInsert('tus_tipo_usuario', 
      [
        {
          tus_descricao:"Ouvinte"
        },
        {
          tus_descricao:"Podcaster"
        },
        {
          tus_descricao:"Moderador"
        },
        {
          tus_descricao:"Administrador"
        },
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
