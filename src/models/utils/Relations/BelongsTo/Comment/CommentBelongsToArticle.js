const as = 'belongs_comment';
const foreignKey = 'articleId';

class CommentBelongsToArticle {
	#CommentModel;

	/**
	 * @param CommentModel {Sequelize.define<M>}
	 */
	constructor(CommentModel) {
		this.#CommentModel = CommentModel;
	}

	put() {
		this.#CommentModel.article = this.#CommentModel.belongsTo(
			this.#CommentModel,
			{
				as,
				foreignKey,
			}
		);
	}
}

module.exports = CommentBelongsToArticle;
