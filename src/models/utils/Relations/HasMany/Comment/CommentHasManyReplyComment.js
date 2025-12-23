const as = 'reply_comments';
const foreignKey = 'commentId';

class CommentHasManyReplyComment {
	#CommentModel;
	#ReplyCommentModel;

	/**
	 * @param CommentModel {Sequelize.define<M>}
	 * @param ReplyCommentModel {Sequelize.define<M>}
	 */
	constructor(CommentModel, ReplyCommentModel) {
		this.#CommentModel = CommentModel;
		this.#ReplyCommentModel = ReplyCommentModel;
	}

	put() {
		this.#CommentModel.replyComment = this.#CommentModel.hasMany(
			this.#ReplyCommentModel,
			{
				as,
				foreignKey,
			}
		);
	}
}

module.exports = CommentHasManyReplyComment;
