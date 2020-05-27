const Publicidade = require("../models/Publicidade");
const { date } = require("../utils/Date");

module.exports = {
  async index(req, resp) {
    const publicidade = await Publicidade.findAll();

    return resp.json(publicidade);
  },

  async store(req, res) {
    const { pub_descricao, pub_data_fim, pub_link } = req.body;

    const { userId } = req;

    //regras de negocio

    if (req.file.length == 0) {
      return resp.json({ mensagem: "Por favor escolha uma imagem" });
    }

    const { filename } = req.file;
    //final regras de negocio

    const data = [
      pub_descricao,
      date(Date.now()).currentDateTime,
      pub_data_fim,
      filename,
      pub_link,
      1,
      userId,
    ];

    const id = await Publicidade.create(data);

    if (!id) {
      return res.json({ mensagem: "Erro ao criar publicidade", _id: id });
    }
    return res.json({ mensagem: "publicidade cadastrada!", _id: id });
  },

  async update(req, res) {
    const { pub_descricao, pub_data_fim, pub_link } = req.body;

    const { pub_id } = req.params;
    const { userId } = req;

    const atual = Publicidade.findOne(pub_id)

    let imgfilename = null;
    
    //regras de negocio
    if (req.file) {
			if (req.file.length == 0) {
				return resp.json({ mensagem: 'Por favor escolha uma imagem' });
			}
			const { originalname, filename } = req.file;
			imgfilename = filename
		}

    //final regras de negocio

    const id = await Publicidade.update(
      pub_id,
      pub_descricao,
      pub_data_fim,
      req.file ? imgfilename : atual.pub_endereco_img,
      pub_link
    );

    if (!id) {
      return res.json({ mensagem: "Erro ao editar publicidade", _id: id });
    }
    return res.json({ mensagem: "publicidade editada!", _id: id });
  },

  async delete(req, res) {
    const { userId } = req;
    const { pub_id } = req.params;

    const id = await Publicidade.delete(pub_id);

    if (!id) {
      return res.json({ mensagem: "Erro ao remover publicidade", _id: id });
    }
    return res.json({ mensagem: "Publicidade removida!", _id: id });
  },
};
