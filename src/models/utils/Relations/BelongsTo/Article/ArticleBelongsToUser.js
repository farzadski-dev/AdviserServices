const as = 'belongs_user';
const foreignKey = 'userId';

class ArticleBelongsToUser {
	#ArticleModel;
	#UserModel;

	/**
	 * @param ArticleModel {Sequelize.define<M>}
	 * @param UserModel {Sequelize.define<M>}
	 */
	constructor(ArticleModel, UserModel) {
		this.#ArticleModel = ArticleModel;
		this.#UserModel = UserModel;
	}

	put() {
		this.#ArticleModel.user = this.#ArticleModel.belongsTo(
			this.#UserModel,
			{
				as,
				foreignKey,
			}
		);
	}
}

module.exports = ArticleBelongsToUser;
