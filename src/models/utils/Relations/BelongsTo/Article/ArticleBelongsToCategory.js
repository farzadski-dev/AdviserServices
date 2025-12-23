const as = 'belongs_category';
const foreignKey = 'categoryId';

class ArticleBelongsToCategory {
	#ArticleModel;
	#CategoryModel;

	/**
	 * @param ArticleModel {Sequelize.define<M>}
	 * @param CategoryModel {Sequelize.define<M>}
	 */
	constructor(ArticleModel, CategoryModel) {
		this.#ArticleModel = ArticleModel;
		this.#CategoryModel = CategoryModel;
	}

	put() {
		this.#ArticleModel.category = this.#ArticleModel.belongsTo(
			this.#CategoryModel,
			{
				as,
				foreignKey,
			}
		);
	}
}

module.exports = ArticleBelongsToCategory;
