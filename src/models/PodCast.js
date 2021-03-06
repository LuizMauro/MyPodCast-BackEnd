const { Model, DataTypes, QueryTypes } = require("sequelize");

class PodCast extends Model {
  static init(sequelize) {
    super.init(
      {
        pod_nome: DataTypes.STRING,
        pod_descricao: DataTypes.TEXT,
        pod_criador: DataTypes.STRING,
        pod_anocriacao: DataTypes.INTEGER,
        pod_duracao: DataTypes.INTEGER,
        pod_endereco_img: DataTypes.STRING,
        pod_status: DataTypes.BOOLEAN,
        pod_permissao: DataTypes.INTEGER,
        pod_destaque: DataTypes.BOOLEAN,
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "usu_id" });
    this.belongsToMany(models.Categoria, {
      through: "pct_podcast_categoria",
      as: "categorias",
      foreignKey: "ctg_id",
    });
  }

  static async createPodCast(data) {
    try {
      const [result] = await this.sequelize.query(
        "INSERT INTO pod_podcast (pod_nome, pod_descricao, pod_criador, pod_anocriacao, pod_duracao, pod_endereco_img, pod_status, pod_permissao, pod_destaque, usu_id ) values (?)",
        {
          replacements: [data],
          type: QueryTypes.INSERT,
          nest: true,
        }
      );
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  static async callInsertProcedure(
    nome,
    descricao,
    criador,
    anocriacao,
    duracao,
    endereco_img,
    status,
    permissao,
    destaque,
    usuid,
    link1,
    link2,
    link3,
    categoria_array
  ) {
    try {
      const [result] = await this.sequelize.query(
        "call CriarPodcast(:pod_nome, :pod_descricao, :pod_criador, :pod_anocriacao, :pod_duracao, :pod_endereco_img, :pod_status, :pod_permissao, :pod_destaque, :usu_id, :end_link1, :end_link2, :end_link3, :list_of_categoria)",
        {
          replacements: {
            pod_nome: nome,
            pod_descricao: descricao,
            pod_criador: criador,
            pod_anocriacao: anocriacao,
            pod_duracao: duracao,
            pod_endereco_img: endereco_img,
            pod_status: status,
            pod_permissao: permissao,
            pod_destaque: destaque,
            usu_id: usuid,
            end_link1: link1,
            end_link2: link2,
            end_link3: link3,
            list_of_categoria: categoria_array,
          },
          type: QueryTypes.INSERT,
          nest: true,
        }
      );
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  static async callEditProcedure(
    podid,
    nome,
    descricao,
    criador,
    anocriacao,
    duracao,
    podenderecoimg,
    status,
    permissao,
    destaque,
    link1,
    link2,
    link3,
    categoria_array
  ) {
    try {
      const [result] = await this.sequelize.query(
        "call EditarPodcast(:pod_id, :pod_nome, :pod_descricao, :pod_criador, :pod_anocriacao, :pod_duracao, :pod_endereco_img, :pod_status, :pod_permissao, :pod_destaque, :end_link1, :end_link2, :end_link3, :list_of_categoria)",
        {
          replacements: {
            pod_id: podid,
            pod_nome: nome,
            pod_descricao: descricao,
            pod_criador: criador,
            pod_anocriacao: anocriacao,
            pod_duracao: duracao,
            pod_endereco_img: podenderecoimg,
            pod_status: status,
            pod_permissao: permissao,
            pod_destaque: destaque,
            end_link1: link1,
            end_link2: link2,
            end_link3: link3,
            list_of_categoria: categoria_array,
          },
          type: QueryTypes.INSERT,
          nest: true,
        }
      );
      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  //Seleciona todos podcasts ativados/com permissão
  static async findAll() {
    const [results] = await this.sequelize.query(
      "Select * from pod_podcast where pod_status = true and pod_permissao = 1 ORDER by pod_nome"
    );

    return results;
  }

  //Seleciona todos podcasts ativados/com permissão
  static async findLast6() {
    const [results] = await this.sequelize.query(
      "Select * from pod_podcast where pod_status = true and pod_permissao = 1 order by pod_id desc limit 6"
    );

    return results;
  }

  //Update Status (Excluir Podcast)
  static async updatePodcastStatus(podid, podstatus) {
    try {
      const [result] = await this.sequelize.query(
        "update pod_podcast set pod_status = :pod_status where pod_id = :pod_id",
        {
          replacements: { pod_id: podid, pod_status: podstatus },
          type: QueryTypes.UPDATE,
          nest: true,
        }
      );
      return true;
    } catch (err) {
      return false;
    }
  }

  //Exibe Solicitações de Cadastro de Podcast pelo Nome do Podcast
  static async findPodcastSolicitacoes(data) {
    const [results] = await this.sequelize.query(
      "select a.pod_id, e.usu_nome, a.pod_nome, a.pod_anocriacao, a.pod_descricao, a.pod_endereco_img, a.pod_criador, a.pod_duracao, a.pod_status, a.pod_destaque, a.pod_permissao, a.usu_id, group_concat(distinct c.ctg_id) as ctg_id, group_concat(distinct c.ctg_descricao) as ctg_descricao, group_concat(distinct d.end_link) as end_link from pod_podcast a join usu_usuario e on e.usu_id = a.usu_id join pct_podcast_categoria b on a.pod_id = b.pod_id join ctg_categoria c on b.ctg_id = c.ctg_id join end_endereco d on a.pod_id = d.pod_id  where a.pod_status = true and a.pod_permissao = 0 group by a.pod_id"
    );

    return results;
  }

  //Aprovar/Reprovar Solicitação de cadastro do Podcast
  static async updatePodcastAprovar(podpermissao, podid) {
    try {
      const [results] = await this.sequelize.query(
        "update pod_podcast set pod_permissao = :pod_permissao where pod_id = :pod_id",
        {
          replacements: { pod_permissao: podpermissao, pod_id: podid },
          type: QueryTypes.UPDATE,
          nest: true,
        }
      );
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = PodCast;
