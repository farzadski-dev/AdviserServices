const as = 'belongs_category';
const foreignKey = 'categoryId';

class QuestionBelongsToCategory {
	#QuestionModel;
	#CategoryModel;

	/**
	 * @param QuestionModel {Sequelize.define<M>}
	 * @param CategoryModel {Sequelize.define<M>}
	 */
	constructor(QuestionModel, CategoryModel) {
		this.#QuestionModel = QuestionModel;
		this.#CategoryModel = CategoryModel;
	}

	put() {
		this.#QuestionModel.category = this.#QuestionModel.belongsTo(
			this.#CategoryModel,
			{
				as,
				foreignKey,
			}
		);
	}
}

module.exports = QuestionBelongsToCategory;
