const as = 'belongs_user';
const foreignKey = 'userId';

class CommentBelongsToUser {
	#CommentModel;
	#UserModel;

	/**
	 * @param CommentModel {Sequelize.define<M>}
	 * @param UserModel {Sequelize.define<M>}
	 */
	constructor(CommentModel, UserModel) {
		this.#CommentModel = CommentModel;
		this.#UserModel = UserModel;
	}

	put() {
		this.#CommentModel.user = this.#CommentModel.belongsTo(
			this.#UserModel,
			{
				as,
				foreignKey,
			}
		);
	}
}

module.exports = CommentBelongsToUser;
