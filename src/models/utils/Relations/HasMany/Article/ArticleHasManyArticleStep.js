const as = 'article_steps';
const foreignKey = 'articleId';

class ArticleHasManyArticleStep {
	#ArticleModel;
	#ArticleStepModel;

	/**
	 * @param ArticleModel {Sequelize.define<M>}
	 * @param ArticleStepModel {Sequelize.define<M>}
	 */
	constructor(ArticleModel, ArticleStepModel) {
		this.#ArticleModel = ArticleModel;
		this.#ArticleStepModel = ArticleStepModel;
	}

	put() {
		this.#ArticleModel.articleStep = this.#ArticleModel.hasMany(
			this.#ArticleStepModel,
			{
				as,
				foreignKey,
			}
		);
	}
}

module.exports = ArticleHasManyArticleStep;
