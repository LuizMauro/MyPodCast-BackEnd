'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      Example:
      return queryInterface.bulkInsert('usu_usuario', [
        {
          usu_nome: "Matheus Souza",
          usu_senha:'123456',
          usu_email:'matheussouza@hotmail.com',
          usu_cpf:'111.111.111.-11',
          usu_status:1,
          usu_premium:0,
          tus_id:1
        },
        {
          usu_nome: "João Silva",
          usu_senha:'123456',
          usu_email:'joaosilva@hotmail.com',
          usu_cpf:'222.222.222.-22',
          usu_status:1,
          usu_premium:0,
          tus_id:2
        },
        {
          usu_nome: "Maria Eduarda",
          usu_senha:'123456',
          usu_email:'maeduarda@hotmail.com',
          usu_cpf:'333.333.333.-33',
          usu_status:1,
          usu_premium:0,
          tus_id:3
        },
        {
          usu_nome: "Henrique Oliveira",
          usu_senha:'123456',
          usu_email:'henriqueoliveira@hotmail.com',
          usu_cpf:'444.444.444.-44',
          usu_status:1,
          usu_premium:0,
          tus_id:4
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
