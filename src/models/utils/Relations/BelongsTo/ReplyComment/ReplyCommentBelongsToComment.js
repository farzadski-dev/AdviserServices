const as = 'belongs_comment';
const foreignKey = 'commentId';

class ReplyCommentBelongsToComment {
	#ReplyCommentModel;

	/**
	 * @param ReplyCommentModel {Sequelize.define<M>}
	 */
	constructor(ReplyCommentModel) {
		this.#ReplyCommentModel = ReplyCommentModel;
	}

	put() {
		this.#ReplyCommentModel.comment = this.#ReplyCommentModel.belongsTo(
			this.#ReplyCommentModel,
			{
				as,
				foreignKey,
			}
		);
	}
}

module.exports = ReplyCommentBelongsToComment;
