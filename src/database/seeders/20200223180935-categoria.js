'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      
      return queryInterface.bulkInsert('ctg_categoria', [
        {
          ctg_descricao: "Games",
          ctg_status: 1,
          ctg_datacricao:"21/02/2020"
        },
        {
          ctg_descricao: "RPG",
          ctg_status: 1,
          ctg_datacricao:"23/02/2020"
        },
        {
          ctg_descricao: "Moda",
          ctg_status: 1,
          ctg_datacricao:"23/02/2020"
        },
        {
          ctg_descricao: "Geek",
          ctg_status: 1,
          ctg_datacricao:"23/02/2020"
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
