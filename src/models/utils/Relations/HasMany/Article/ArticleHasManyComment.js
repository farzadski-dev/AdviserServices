const as = 'article_comments';
const foreignKey = 'articleId';

class ArticleHasManyComment {
	#ArticleModel;
	#CommentModel;

	/**
	 * @param ArticleModel {Sequelize.define<M>}
	 * @param CommentModel {Sequelize.define<M>}
	 */
	constructor(ArticleModel, CommentModel) {
		this.#ArticleModel = ArticleModel;
		this.#CommentModel = CommentModel;
	}

	put() {
		this.#ArticleModel.comment = this.#ArticleModel.hasMany(
			this.#CommentModel,
			{
				as,
				foreignKey,
			}
		);
	}
}

module.exports = ArticleHasManyComment;
