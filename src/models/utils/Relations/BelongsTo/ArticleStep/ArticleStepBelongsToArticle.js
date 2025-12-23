const as = 'belongs_article';
const foreignKey = 'articleId';

class ArticleStepBelongsToArticle {
	#ArticleStepModel;
	#ArticleModel;

	/**
	 * @param ArticleStepModel {Sequelize.define<M>}
	 * @param ArticleModel {Sequelize.define<M>}
	 */
	constructor(ArticleStepModel, ArticleModel) {
		this.#ArticleStepModel = ArticleStepModel;
		this.#ArticleModel = ArticleModel;
	}

	put() {
		this.#ArticleStepModel.article = this.#ArticleStepModel.belongsTo(
			this.#ArticleModel,
			{
				as,
				foreignKey,
			}
		);
	}
}

module.exports = ArticleStepBelongsToArticle;
