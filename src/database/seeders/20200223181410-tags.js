'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
      return queryInterface.bulkInsert('tag_tag', [
        {
          tag_descricao:"Geral",
          tag_status:1
        },
        {
          tag_descricao:"Jogos",
          tag_status:1
        },
        {
          tag_descricao:"Fisica",
          tag_status:1
        },
        {
          tag_descricao:"Ciência",
          tag_status:1
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
