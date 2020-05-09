const Like = require('../models/Like');

module.exports = {
	//SELECT
	async index(req, resp) {
		const { cmt_id } = req.params;

		const like = await Like.findLike(cmt_id);
		const dislike = await Like.findDislike(cmt_id)

		return resp.json({like, dislike});
	},

	async read(req, resp) {
		const { cmt_id } = req.params;
		const { userId } = req;

		const response = await Like.findUserLike(userId,cmt_id)

		return resp.json(response);
	},

	//CREATE
	async store(req, resp) {
		const { cmt_id } = req.params;
		const { userId } = req;

		const data = [1, '2019-11-24 21:36:48', 1, userId, cmt_id];

		const id = await Like.create(data);

		if (!id) {
			return resp.json({ mensagem: 'Erro ao dar like', _id: id });
		}
		return resp.json({ mensagem: 'Deu like', _id: id });
	},

	//UPDATE
	async updateStatus(req, res) {
		const { lik_id, lik_status} = req.params;
		const { userId } = req;

		const update = await Like.updateLikeStatus(
			lik_id,
			lik_status,
            userId
		);

		if (!update) {
			return res.json({
				mensagem: 'Erro ao tirar like/dislike',
				_id: update,
			});
		}
		return res.json({
			mensagem: 'tirou like/dislike!',
			_id: update,
		});
    },
    
	async updateTipo(req, res) {
		const { lik_id,  lik_tipo } = req.params;
		const { userId } = req;

		const update = await Like.updateLikeTipo(
			lik_id,
            lik_tipo,
            userId
		);

		if (!update) {
			return res.json({
				mensagem: 'Erro ao mudar like/dislike!',
				_id: update,
			});
		}
		return res.json({
			mensagem: 'Mudou like/dislike!',
			_id: update,
		});
	}
};
