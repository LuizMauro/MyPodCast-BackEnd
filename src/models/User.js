const { Model, DataTypes, QueryTypes } = require('sequelize');


class User extends Model{
    static init(sequelize){
        super.init({
            usu_nome: DataTypes.STRING,
            usu_senha:  DataTypes.STRING,
            usu_email: DataTypes.STRING,
            usu_cpf : DataTypes.STRING,
        }, {sequelize}) 
    }

    static associate(models){

    }

    static async createUser(data){
        try{
            const [result, metadata] =  await this.sequelize.query('INSERT INTO usu_usuario (usu_nome, usu_senha, usu_email, usu_cpf) values (?)',
            {
            replacements: [data],
            type: QueryTypes.INSERT,
            nest:true
            
            });
            return result;

        }catch(err){
          
            return false;
        }
       

       

      
    }

    static async findAllUser(){
        const [results, metadata] =  await this.sequelize.query('SELECT * FROM usu_usuario')
    
        return results;
      }
}

module.exports = User;