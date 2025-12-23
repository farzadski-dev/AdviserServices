const as = 'belongs_category';
const foreignKey = 'categoryId';

class RoomBelongsToCategory {
	#RoomModel;
	#CategoryModel;

	/**
	 * @param RoomModel {Sequelize.define<M>}
	 * @param CategoryModel {Sequelize.define<M>}
	 */
	constructor(RoomModel, CategoryModel) {
		this.#RoomModel = RoomModel;
		this.#CategoryModel = CategoryModel;
	}

	put() {
		this.#RoomModel.category = this.#RoomModel.belongsTo(
			this.#CategoryModel,
			{
				as,
				foreignKey,
			}
		);
	}
}

module.exports = RoomBelongsToCategory;
