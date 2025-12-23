const as = 'belongs_user';
const foreignKey = 'userId';

class ReplyCommentBelongsToUser {
	#ReplyCommentModel;
	#UserModel;

	/**
	 * @param ReplyCommentModel {Sequelize.define<M>}
	 * @param UserModel {Sequelize.define<M>}
	 */
	constructor(ReplyCommentModel, UserModel) {
		this.#ReplyCommentModel = ReplyCommentModel;
		this.#UserModel = UserModel;
	}

	put() {
		this.#ReplyCommentModel.user = this.#ReplyCommentModel.belongsTo(
			this.#UserModel,
			{
				as,
				foreignKey,
			}
		);
	}
}

module.exports = ReplyCommentBelongsToUser;
