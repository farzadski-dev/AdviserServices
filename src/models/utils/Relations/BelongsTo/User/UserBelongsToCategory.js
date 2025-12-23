const as = 'belongs_category';
const foreignKey = 'categoryId';

class UserBelongsToCategory {
	#UserModel;
	#CategoryModel;

	/**
	 * @param UserModel {Sequelize.define<M>}
	 * @param CategoryModel {Sequelize.define<M>}
	 */
	constructor(UserModel, CategoryModel) {
		this.#UserModel = UserModel;
		this.#CategoryModel = CategoryModel;
	}

	put() {
		this.#UserModel.category = this.#UserModel.belongsTo(
			this.#CategoryModel,
			{
				as,
				foreignKey,
			}
		);
	}
}

module.exports = UserBelongsToCategory;
