const as = 'belongs_category';
const foreignKey = 'categoryId';

class ArticleStepBelongsToCategory {
	#ArticleStepModel;
	#CategoryModel;

	/**
	 * @param ArticleStepModel {Sequelize.define<M>}
	 * @param CategoryModel {Sequelize.define<M>}
	 */
	constructor(ArticleStepModel, CategoryModel) {
		this.#ArticleStepModel = ArticleStepModel;
		this.#CategoryModel = CategoryModel;
	}

	put() {
		this.#ArticleStepModel.category = this.#ArticleStepModel.belongsTo(
			this.#CategoryModel,
			{
				as,
				foreignKey,
			}
		);
	}
}

module.exports = ArticleStepBelongsToCategory;
